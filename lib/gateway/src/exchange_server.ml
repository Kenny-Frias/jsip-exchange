open! Core
open! Async
open Jsip_types
open Jsip_order_book

module Connection_state = struct
  type t = { mutable session : Session.t option }

  (* let participant t = Option.map t.session ~f:Session.participant *)
end

type t =
  { engine : Matching_engine.t
  ; dispatcher : Dispatcher.t
  ; request_writer : Order.Request.t Pipe.Writer.t
  ; tcp_server : (Socket.Address.Inet.t, int) Tcp.Server.t
  ; port : int
  }

(* Bound how many client requests can sit in the queue waiting for the
   matching engine. Once the queue is full, [Pipe.write] returns a pending
   deferred and the [submit_order_rpc] handler blocks until the engine has
   processed enough requests to free up space — clients get backpressure
   without the server's memory growing unboundedly. *)
let request_queue_size_budget = 1024

let handle_submit ~request_writer (request : Order.Request.t) =
  let%map () = Pipe.write_if_open request_writer request in
  Ok ()
;;

let start_matching_loop ~engine ~dispatcher request_reader =
  don't_wait_for
    (Pipe.iter_without_pushback request_reader ~f:(fun request ->
       let events = Matching_engine.submit engine request in
       Dispatcher.dispatch dispatcher events))
;;

(* Currently, each connection state is just unit. TODO: need the state to
   hold something mutable (the connections Session.t) *)

let is_participant_logged_in (state : Connection_state.t) =
  match state.session with None -> false | Some _ -> true
;;

let start ~symbols ~port () =
  let engine = Matching_engine.create symbols in
  let dispatcher = Dispatcher.create () in
  let request_reader, request_writer = Pipe.create () in
  Pipe.set_size_budget request_writer request_queue_size_budget;
  start_matching_loop ~engine ~dispatcher request_reader;
  let implementations =
    Rpc.Implementations.create_exn
      ~implementations:
        [ Rpc.Rpc.implement
            Rpc_protocol.submit_order_rpc
            (* we need to check that the connection state participant matches
               the participant in the request. If they don't match, we create
               a new request with the actual sessions participant name *)
            (fun (state : Connection_state.t) request ->
               if is_participant_logged_in state
               then (
                 let session_participant =
                   Session.participant (Option.value_exn state.session)
                 in
                 let corrected_request =
                   if Participant.equal
                        session_participant
                        request.participant
                   then request
                   else { request with participant = session_participant }
                 in
                 handle_submit ~request_writer corrected_request)
               else
                 return
                   (Or_error.error_string
                      "Participant not logged in. Please login before \
                       submitting orders."))
        ; Rpc.Rpc.implement'
            Rpc_protocol.book_query_rpc
            (fun (state : Connection_state.t) symbol ->
               ignore state;
               Matching_engine.book engine symbol
               |> Option.map ~f:Order_book.snapshot)
        ; Rpc.Pipe_rpc.implement
            Rpc_protocol.market_data_rpc
            (fun state symbols ->
               ignore state;
               let reader =
                 Dispatcher.subscribe_market_data dispatcher symbols
               in
               return (Ok reader))
        ; Rpc.Pipe_rpc.implement Rpc_protocol.audit_log_rpc (fun state () ->
            ignore state;
            let reader = Dispatcher.subscribe_audit dispatcher in
            return (Ok reader))
        ; Rpc.Rpc.implement
            Rpc_protocol.login_rpc
            (fun (state : Connection_state.t) participant_name ->
               let trimmed = String.strip participant_name in
               if String.length trimmed > 0
               then (
                 let participant = Participant.of_string trimmed in
                 let session = Session.create participant in
                 state.session <- Some session;
                 let%bind () =
                   Dispatcher.set_up_session dispatcher participant
                 in
                 Deferred.return (Ok participant))
               else
                 return
                   (Or_error.error_string
                      [%string
                        "Invalid participant name: %{participant_name}"]))
        ]
      ~on_unknown_rpc:`Close_connection
      ~on_exception:Log_on_background_exn
  in
  let%map tcp_server =
    let initial_connection_state = { Connection_state.session = None } in
    Rpc.Connection.serve
      ~implementations
        (* instead of unit, want to hold the connections session *)
      ~initial_connection_state:(fun _addr _conn -> initial_connection_state)
      ~where_to_listen:(Tcp.Where_to_listen.of_port port)
      ()
  in
  let actual_port = Tcp.Server.listening_on tcp_server in
  { engine; dispatcher; request_writer; tcp_server; port = actual_port }
;;

let port t = t.port

let close t =
  Pipe.close t.request_writer;
  Tcp.Server.close t.tcp_server
;;

let close_finished t = Tcp.Server.close_finished t.tcp_server
