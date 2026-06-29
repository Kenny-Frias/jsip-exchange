open! Core

type t =
  | Order_accept of
      { order_id : Order_id.t
      ; request : Order.Request.t
      }
  | Fill of Fill.t
  | Order_cancel of
      { order_id : Order_id.t
      ; participant : Participant.t
      ; symbol : Symbol.t
      ; remaining_size : Size.t
      ; reason : Cancel_reason.t
      ; client_order_id : Client_order_id.t
      }
  | Order_reject of
      { request : Order.Request.t
      ; reason : string
      }
  | Best_bid_offer_update of
      { symbol : Symbol.t
      ; bbo : Bbo.t
      }
  | Trade_report of
      { symbol : Symbol.t
      ; price : Price.t
      ; size : Size.t
      }
[@@deriving sexp, bin_io]

let to_string_hum event =
  match event with
  | Order_accept { order_id; request } ->
    [%string "Order accept: %{order_id#Order_id} %{request#Order.Request}"]
  | Fill fill -> [%string "Fill: %{fill#Fill}"]
  | Order_cancel
      { order_id
      ; participant
      ; symbol
      ; remaining_size
      ; reason
      ; client_order_id
      } ->
    [%string
      "Order cancel: %{order_id#Order_id} %{participant#Participant} \
       %{symbol#Symbol} %{remaining_size#Size} %{reason#Cancel_reason} \
       %{client_order_id#Client_order_id}"]
  | Order_reject { request; reason } ->
    [%string "Order reject: %{request#Order.Request} %{reason#String}"]
  | Best_bid_offer_update { symbol; bbo } ->
    [%string "Best bid/offer update: %{symbol#Symbol} %{bbo#Bbo}"]
  | Trade_report { symbol; price; size } ->
    [%string "Trade report: %{symbol#Symbol} %{price#Price} %{size#Size}"]
;;

let is_market_data = function
  | Best_bid_offer_update _ | Trade_report _ -> true
  | Order_accept _ | Fill _ | Order_cancel _ | Order_reject _ -> false
;;

let symbol_of_market_data = function
  | Best_bid_offer_update { symbol; bbo = _ }
  | Trade_report { symbol; price = _; size = _ } ->
    Some symbol
  | Order_accept _ | Fill _ | Order_cancel _ | Order_reject _ -> None
;;
