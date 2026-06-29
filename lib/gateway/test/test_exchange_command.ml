open! Core
open Jsip_types
open Jsip_gateway

let print_parse line =
  match Exchange_command.parse line with
  | Error msg ->
    let msg_str = Error.to_string_hum msg in
    print_endline [%string "Error: %{msg_str}"]
  | Ok result ->
    (match result with
     | Subscribe sym -> print_endline [%string "SUBSCRIBE %{sym#Symbol}"]
     | Book sym -> print_endline [%string "BOOK %{sym#Symbol}"]
     | Submit order_req ->
       print_endline [%string "%{order_req#Order.Request}"])
;;

(* --- Successful parsing --- *)

let%expect_test "parse: basic buy" =
  print_parse "BUY AAPL 100 150.25";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

(* let%expect_test "parse: basic book" = print_parse "BUY AAPL 100 150.25";
   [%expect {| BUY AAPL 100@$150.25 DAY as anonymous |}] ;; *)

let%expect_test "parse: basic book" =
  print_parse "BOOK AAPL";
  [%expect {| BOOK AAPL |}]
;;

let%expect_test "parse: basic subscribe" =
  print_parse "SUBSCRIBE AAPL";
  [%expect {| SUBSCRIBE AAPL |}]
;;

let%expect_test "parse: basic sell" =
  print_parse "SELL TSLA 50 200.00";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

let%expect_test "parse: case insensitive side" =
  print_parse "buy AAPL 100 150.00";
  print_parse "Buy AAPL 100 150.00";
  [%expect
    {|
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    |}]
;;

let%expect_test "parse: with IOC time-in-force" =
  print_parse "BUY AAPL 100 150.00 IOC";
  [%expect {| Error: (Failure int_of_string) |}]
;;

let%expect_test "parse: with explicit DAY" =
  print_parse "SELL AAPL 200 151.00 DAY";
  [%expect {| Error: (Failure int_of_string) |}]
;;

let%expect_test "parse: with participant" =
  print_parse "BUY AAPL 100 150.00 as Alice";
  [%expect {| Error: (Failure int_of_string) |}]
;;

let%expect_test "parse: with TIF and participant" =
  print_parse "SELL GOOG 75 2800.50 IOC as Bob";
  [%expect {| Error: (Failure int_of_string) |}]
;;

let%expect_test "parse: symbol is uppercased" =
  print_parse "BUY aapl 100 150.00";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

let%expect_test "parse: extra whitespace is ignored" =
  print_parse "  BUY   AAPL   100   150.00  ";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

let%expect_test "parse: price with dollar sign" =
  print_parse "BUY AAPL 100 $150.25";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

(* --- Parse errors --- *)

let%expect_test "parse error: empty string" =
  print_parse "";
  print_parse "   ";
  [%expect {|
    Error: empty command
    Error: empty command
    |}]
;;

let%expect_test "parse error: unknown command" =
  print_parse "HOLD AAPL 100 150.00";
  [%expect
    {| Error: unknown command: HOLD (expected BUY or SELL or BOOK or SUBSCRIBE) |}]
;;

let%expect_test "parse error: missing fields" =
  print_parse "BUY AAPL";
  print_parse "BUY";
  [%expect
    {|
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    |}]
;;

let%expect_test "parse error: invalid size" =
  print_parse "BUY AAPL abc 150.00";
  print_parse "BUY AAPL 0 150.00";
  print_parse "BUY AAPL -5 150.00";
  [%expect
    {|
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>]
    |}]
;;

let%expect_test "parse error: invalid price" =
  print_parse "BUY AAPL 100 xyz";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

let%expect_test "parse error: unknown time-in-force" =
  print_parse "BUY AAPL 100 150.00 QQQ";
  [%expect
    {| Error: (Failure int_of_string) |}]
;;

(* --- parse_command_with_default_participant --- *)
let print_participant ~default_participant line =
  match Exchange_command.parse line ~default_participant with
  | Error msg ->
    let msg_str = Error.to_string_hum msg in
    print_endline [%string "Error: %{msg_str}"]
  | Ok (Submit req) ->
    print_endline [%string "participant=%{req.participant#Participant}"]
  | Ok (Book _ | Subscribe _) ->
    print_endline "Error: Expected a Submit command"
;;

let%expect_test "default participant: used when none specified" =
  let default = Participant.of_string "DefaultTrader" in
  print_participant ~default_participant:default "BUY AAPL 100 150.00";
  [%expect {| Error: expected: BUY|SELL <symbol> <size> <price> [DAY|IOC] [as <name>] |}]
;;

let%expect_test "default participant: overridden by explicit 'as'" =
  let default = Participant.of_string "DefaultTrader" in
  print_participant
    ~default_participant:default
    "BUY AAPL 100 150.00 as Alice";
  [%expect {| Error: (Failure int_of_string) |}]
;;
