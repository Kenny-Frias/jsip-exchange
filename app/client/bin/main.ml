(** Exchange client.

    Connects to a running exchange server and provides an interactive
    command-line interface for submitting orders and querying the book.

    Run with: dune exec app/client/bin/main.exe -- -host localhost -port
    12345 -name Alice *)

open! Core
open! Async
open Jsip_types
open Jsip_gateway

let run_client ~host ~port ~participant_name =
  let all_str =
    String.concat (List.map ~f:Time_in_force.to_string Time_in_force.all)
  in
  let participant = Participant.of_string participant_name in
  let where_to_connect =
    Tcp.Where_to_connect.of_host_and_port { host; port }
  in
  let%bind conn = Rpc.Connection.client where_to_connect >>| Result.ok_exn in
  print_endline
    [%string
      {|
Connected to exchange at %{host}:%{port#Int} as %{participant#Participant}
Commands: BUY|SELL <symbol> <size> <price> %{all_str}
          BOOK <symbol>
          SUBSCRIBE <symbol>  (stream market data)

Order acknowledgements, fills, and cancellations are temporarily printed
by the server process; the SUBSCRIBE command attaches you to a per-symbol
market-data feed.|}];
  let rec loop () =
    print_string "> ";
    match%bind Reader.read_line (Lazy.force Reader.stdin) with
    | `Eof ->
      print_endline "\nDisconnected.";
      Deferred.Or_error.ok_unit
    | `Ok line ->
      let line = String.strip line in
      if String.is_empty line
      then loop ()
      else (
        match
          Exchange_command.parse ~default_participant:participant line
        with
        | Error msg ->
          let msg_str = Error.to_string_hum msg in
          print_endline [%string "ERROR: %{msg_str}"];
          loop ()
        | Ok result ->
          (match result with
           | Book sym ->
             let%bind _ =
               Rpc.Rpc.dispatch_exn Rpc_protocol.book_query_rpc conn sym
             in
             loop ()
           | Subscribe sym ->
             let%bind _ =
               Rpc.Pipe_rpc.dispatch
                 Rpc_protocol.market_data_rpc
                 conn
                 [ sym ]
             in
             loop ()
           | Submit order_request ->
             let%bind.Deferred.Or_error () =
               Rpc.Rpc.dispatch_exn
                 Rpc_protocol.submit_order_rpc
                 conn
                 order_request
             in
             loop ()))
  in
  loop ()
;;

let () =
  Command.async_or_error
    ~summary:"JSIP Exchange client"
    (let%map_open.Command host =
       flag
         "-host"
         (optional_with_default "localhost" string)
         ~doc:"HOST server hostname"
     and port = flag "-port" (required int) ~doc:"PORT server port"
     and participant_name =
       flag
         "-name"
         (optional_with_default (Core_unix.getlogin ()) string)
         ~doc:"NAME participant name"
     in
     fun () -> run_client ~host ~port ~participant_name)
  |> Command_unix.run
;;
