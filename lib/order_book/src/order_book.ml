open! Core
open Jsip_types
open Async_log_kernel.Ppx_log_syntax

type t =
  { symbol : Symbol.t
  ; mutable bids : Order.t list
  ; mutable asks : Order.t list
  }
[@@deriving sexp_of]

let create symbol = { symbol; bids = []; asks = [] }
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
  let side = Order.side order in
  set_side_list t side (order :: side_list t side)
;;

let remove' t order_id =
  let remove_from t side order_id =
    let orders = side_list t side in
    match
      List.partition_tf orders ~f:(fun o ->
        Order_id.equal (Order.order_id o) order_id)
    with
    | [], _ -> None
    | [ found ], rest ->
      set_side_list t side rest;
      Some found
    | matches, _ ->
      [%log.info
        "BUG: More than one order matching order_id found when removing"
          (order_id : Order_id.t)
          (matches : Order.t list)
          (t.symbol : Symbol.t)
          (side : Side.t)];
      None
  in
  match remove_from t Buy order_id with
  | Some _ as result -> result
  | None -> remove_from t Sell order_id
;;

let remove t order_id = ignore (remove' t order_id : Order.t option)

let find t order_id =
  let find_in side =
    List.find (side_list t side) ~f:(fun o ->
      Order_id.equal (Order.order_id o) order_id)
  in
  match find_in Buy with Some _ as result -> result | None -> find_in Sell
;;

(* NOTE: This walks the list front-to-back and returns the *first* tradable
   order, not the best-priced one. Orders are in reverse insertion order
   (newest first), so this matches against whatever was most recently added,
   regardless of price. See test_matching_engine.ml for a test that
   demonstrates why this is wrong.

   FIX: Scan list using best_price to find the most aggressive resting order
   on the opposite side. If we compare and they are equal, then we prefer the
   one added most recently, which would be (?)

   We want to filter by marketable resting orders, then fold that to find the
   most aggressive using is_more_aggtessive. For price-time, a lower Order_id
   means it has arrived first.
*)
let find_match t incoming =
  let incoming_side = Order.side incoming in
  let opposite_side = Side.flip incoming_side in
  let resting_orders = side_list t opposite_side in
  let marketable_resting_orders =
    List.filter
      ~f:(fun resting ->
        Price.is_marketable
          (Order.side incoming)
          ~price:(Order.price incoming)
          ~resting_price:(Order.price resting))
      resting_orders
  in
  (* TODO: abstract *)
  List.reduce marketable_resting_orders ~f:(fun order1 order2 ->
    let price1 = Order.price order1 in
    let price2 = Order.price order2 in
    if Price.is_more_aggressive
         (Order.side incoming)
         ~price:price1
         ~than:price2
    then order1 (* if the prices are equal, pick the one that came earlier *)
    else if Price.equal price1 price2
    then
      if Order_id.compare (Order.order_id order1) (Order.order_id order2) < 0
      then order1
      else order2
    else order2)
;;

let orders_on_side t side = side_list t side
let is_empty t = List.is_empty t.bids && List.is_empty t.asks
let count t side = List.length (side_list t side)

(* 1.) generate list of resting orders on a given side 2.) map the list to be
   a list of prices (is a list of orders) 3.) use list.reduce and an anonyous
   function to keep the most aggressive price for each pair in the list
*)
let best_price t side =
  let orders = orders_on_side t side in
  let prices_on_side = List.map orders ~f:Order.price in
  List.reduce prices_on_side ~f:(fun price1 price2 ->
    if Price.is_more_aggressive side ~price:price1 ~than:price2
    then price1
    else price2)
;;

let best_level t side : Level.t option =
  match best_price t side with
  | None -> None
  | Some price ->
    let total_size =
      List.fold (side_list t side) ~init:Size.zero ~f:(fun acc order ->
        if Price.equal (Order.price order) price
        then Size.( + ) acc (Order.remaining_size order)
        else acc)
    in
    Some { price; size = total_size }
;;

let best_bid_offer t : Bbo.t =
  { bid = best_level t Buy; ask = best_level t Sell }
;;

(* NOTE: Needs to reflect real matching order and not just insertion order
   TODO: Update so that the snapshot list levels in the same order that
   matching would visit them: Highest price bids first, lowest price asks
   first, and ties broken by arrival time

   Currently, it maps orders to level.t and sorts them with Level.compare,
   which only knows price and size. Sort the Order.t list first which a
   comparator from Price.IMA and Order_id.compare, then map to level.t orders
   --> sort --> compare

   should wrote cpmpare outside the function *)
let snapshot_side t (side : Side.t) =
  let orders = orders_on_side t side in
  let is_more_aggressive_comparator order1 order2 =
    let price1 = Order.price order1 in
    let price2 = Order.price order2 in
    if Price.equal price1 price2
    then Order_id.compare (Order.order_id order1) (Order.order_id order2)
    else if Price.is_more_aggressive side ~price:price1 ~than:price2
    then 1
    else -1
  in
  orders
  |> List.sort ~compare:is_more_aggressive_comparator
  |> List.map ~f:Level.of_order
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
