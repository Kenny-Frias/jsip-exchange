open! Core
open Jsip_types

module Price_order_id = struct
  module T = struct
    type t = Price.t * Order_id.t [@@deriving compare, sexp]
  end

  include T
  include Comparable.Make (T)
end

type t =
  { symbol : Symbol.t
  ; mutable bids : Order.t Price_order_id.Map.t
  ; mutable asks : Order.t Price_order_id.Map.t
      (* The reverse index, maps Order_id to its Side and Price for O(log N)
         lookups *)
  ; mutable index : (Side.t * Price.t) Order_id.Map.t
  }
[@@deriving sexp_of]

let create symbol =
  { symbol
  ; bids = Price_order_id.Map.empty
  ; asks = Price_order_id.Map.empty
  ; index = Order_id.Map.empty
  }
;;

let symbol t = t.symbol

let side_list t side =
  match (side : Side.t) with Buy -> t.bids | Sell -> t.asks
;;

let set_side_list t side orders =
  match (side : Side.t) with
  | Buy -> t.bids <- orders
  | Sell -> t.asks <- orders
;;

let add t order =
  let order_id = Order.order_id order in
  let price = Order.price order in
  let side = Order.side order in
  let key = price, order_id in
  let orders = side_list t side in
  set_side_list t side (Map.set orders ~key ~data:order);
  t.index <- Map.set t.index ~key:order_id ~data:(side, price)
;;

let remove' t order_id =
  match Map.find t.index order_id with
  | None -> None
  | Some (side, price) ->
    let key = price, order_id in
    let orders = side_list t side in
    let found = Map.find orders key in
    (* Remove from both the main book and the reverse index *)
    set_side_list t side (Map.remove orders key);
    t.index <- Map.remove t.index order_id;
    found
;;

let remove t order_id = ignore (remove' t order_id : Order.t option)

let find t order_id =
  match Map.find t.index order_id with
  | None -> None
  | Some (side, price) -> Map.find (side_list t side) (price, order_id)
;;

let orders_on_side t side =
  let orders_map = side_list t side in
  match (side : Side.t) with
  | Sell -> Map.data orders_map
  | Buy ->
    Map.to_alist orders_map
    |> List.sort ~compare:(fun ((p1, id1), _) ((p2, id2), _) ->
      let c = Price.compare p2 p1 in
      if c <> 0 then c else Order_id.compare id1 id2)
    |> List.map ~f:snd
;;

let is_empty t = Map.is_empty t.bids && Map.is_empty t.asks
let count t side = Map.length (side_list t side)

let best_price t side =
  let orders_map = side_list t side in
  match (side : Side.t) with
  | Buy ->
    Option.map (Map.max_elt orders_map) ~f:(fun ((price, _), _) -> price)
  | Sell ->
    Option.map (Map.min_elt orders_map) ~f:(fun ((price, _), _) -> price)
;;

let best_level t side : Level.t option =
  match best_price t side with
  | None -> None
  | Some best_p ->
    (* Because we have O(1)/O(log N) access to the best price, we can fold
       over the map or the side to sum the size rather than mapping
       everything *)
    let total_size =
      Map.fold
        (side_list t side)
        ~init:Size.zero
        ~f:(fun ~key:(price, _) ~data:order acc ->
          if Price.equal price best_p
          then Size.( + ) acc (Order.remaining_size order)
          else acc)
    in
    Some { price = best_p; size = total_size }
;;

let best_bid_offer t : Bbo.t =
  { bid = best_level t Buy; ask = best_level t Sell }
;;

let find_match t incoming =
  let opposite_side = Side.flip (Order.side incoming) in
  (* Because orders_on_side now strictly enforces Price-Time priority (Best
     Price first, Oldest Order first), we can just grab the very first
     marketable order *)
  let resting_orders = orders_on_side t opposite_side in
  List.find resting_orders ~f:(fun resting ->
    Price.is_marketable
      (Order.side incoming)
      ~price:(Order.price incoming)
      ~resting_price:(Order.price resting))
;;

let snapshot_side t (side : Side.t) =
  orders_on_side t side |> List.map ~f:Level.of_order
;;

let snapshot t =
  { Book.symbol = symbol t
  ; bids = snapshot_side t Buy
  ; asks = snapshot_side t Sell
  ; bbo = best_bid_offer t
  }
;;

module For_testing = struct
  let remove = remove'
end
