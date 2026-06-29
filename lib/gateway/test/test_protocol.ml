open! Core
open Jsip_types
open Jsip_order_book
open Jsip_gateway

(* --- Event formatting --- *)

let%expect_test "format_event: all event types" =
  let generator_1 = Client_order_id.Generator.create () in
  let generator_2 = Client_order_id.Generator.create () in
  let generator_3 = Client_order_id.Generator.create () in
  let aggressor_generator = Client_order_id.Generator.create () in
  let resting_generator = Client_order_id.Generator.create () in
  let events =
    [ Exchange_event.Order_accept
        { order_id = Order_id.of_string "1"
        ; request =
            { symbol = Symbol.of_string "AAPL"
            ; participant = Participant.of_string "Alice"
            ; side = Buy
            ; price = Price.of_int_cents 15000
            ; size = Size.of_int 100
            ; time_in_force = Day
            ; client_order_id = Client_order_id.Generator.next generator_1
            }
        }
    ; Fill
        { fill_id = 1
        ; symbol = Symbol.of_string "AAPL"
        ; price = Price.of_int_cents 15000
        ; size = Size.of_int 100
        ; aggressor_order_id = Order_id.of_string "2"
        ; aggressor_participant = Participant.of_string "Alice"
        ; aggressor_side = Buy
        ; resting_order_id = Order_id.of_string "1"
        ; resting_participant = Participant.of_string "Bob"
        ; resting_client_order_id =
            Client_order_id.Generator.next resting_generator
        ; aggressor_client_order_id =
            Client_order_id.Generator.next aggressor_generator
        }
    ; Order_cancel
        { order_id = Order_id.of_string "3"
        ; participant = Participant.of_string "Charlie"
        ; symbol = Symbol.of_string "TSLA"
        ; remaining_size = Size.of_int 50
        ; reason = Ioc_remainder
        ; client_order_id = Client_order_id.Generator.next generator_2
        }
    ; Order_reject
        { request =
            { symbol = Symbol.of_string "GOOG"
            ; participant = Participant.of_string "Alice"
            ; side = Sell
            ; price = Price.of_int_cents 28000
            ; size = Size.of_int 10
            ; time_in_force = Day
            ; client_order_id = Client_order_id.Generator.next generator_3
            }
        ; reason = "unknown symbol"
        }
    ; Best_bid_offer_update
        { symbol = Symbol.of_string "AAPL"
        ; bbo =
            { bid =
                Some
                  { price = Price.of_int_cents 14990
                  ; size = Size.of_int 200
                  }
            ; ask =
                Some
                  { price = Price.of_int_cents 15010
                  ; size = Size.of_int 100
                  }
            }
        }
    ; Best_bid_offer_update
        { symbol = Symbol.of_string "AAPL"; bbo = Bbo.empty }
    ; Trade_report
        { symbol = Symbol.of_string "AAPL"
        ; price = Price.of_int_cents 15000
        ; size = Size.of_int 100
        }
    ]
  in
  List.iter events ~f:(fun e -> print_endline (Protocol.format_event e));
  [%expect
    {|
    ACCEPTED id=1 AAPL BUY 100@$150.00 DAY
    FILL fill_id=1 AAPL $150.00 x100 aggressor=2(Alice) BUY 1 resting=1(Bob) 1
    CANCELLED id=3 TSLA remaining=50 reason=IOC_REMAINDER
    REJECTED GOOG SELL 10@$280.00 reason=unknown symbol
    BBO AAPL bid=$149.90 x200 ask=$150.10 x100
    BBO AAPL bid=- ask=-
    TRADE AAPL $150.00 x100
    |}]
;;

(* --- Round-trip: parse then format --- *)

let%expect_test "round-trip: parse a command, submit, format result" =
  let open Jsip_test_harness in
  let t = Harness.create () in
  (* Place a resting sell *)
  Harness.submit_
    t
    (Harness.sell ~price_cents:15000 ~participant:Harness.bob ());
  (* Parse a buy command from text and submit it *)
  let request =
    Exchange_command.parse "BUY AAPL 100 150.00 as Alice"
    (* |> Result.map_error ~f:Error.of_string *)
    |> ok_exn
  in
  match request with
  | Book _ -> print_endline "Error"
  | Subscribe _ -> print_endline "Error"
  | Submit order_request ->
    let events = Matching_engine.submit (Harness.engine t) order_request in
    print_endline (Protocol.format_events events);
    [%expect.unreachable]
[@@expect.uncaught_exn {|
  (* CR expect_test_collector: This test expectation appears to contain a backtrace.
     This is strongly discouraged as backtraces are fragile.
     Please change this test to not include a backtrace. *)
  (Failure int_of_string)
  Raised by primitive operation at Jsip_types__Client_order_id.of_string.(partial) in file "lib/types/src/client_order_id.ml", line 4, characters 9-12
  Called from Jsip_gateway__Exchange_command.parse.(fun) in file "lib/gateway/src/exchange_command.ml" (inlined), line 50, characters 16-57
  Called from Base__Or_error.try_with in file "src/or_error.ml" (inlined), line 88, characters 9-15
  Called from Jsip_gateway__Exchange_command.parse in file "lib/gateway/src/exchange_command.ml", lines 49-50, characters 14-101
  Re-raised at Base__Error.raise in file "src/error.ml", line 17, characters 38-66
  Called from Base__Error.raise in file "src/error.ml" (inlined), line 25, characters 47-66
  Called from Base__Or_error.ok_exn in file "src/or_error.ml" (inlined), line 100, characters 17-44
  Called from Jsip_gateway_test__Test_protocol.(fun) in file "lib/gateway/test/test_protocol.ml", lines 110-112, characters 4-120
  Called from Ppx_expect_runtime__Test_block.Configured.dump_backtrace in file "runtime/test_block.ml", line 359, characters 10-25

  Trailing output
  ---------------
  ACCEPTED id=1 AAPL SELL 100@$150.00 DAY
  BBO AAPL bid=- ask=$150.00 x100
  |}]
;;
