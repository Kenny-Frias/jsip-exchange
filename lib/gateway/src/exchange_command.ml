open! Core
open Jsip_types

type verb =
  | Buy
  | Sell
  | Book
  | Subscribe
[@@deriving
  enumerate, string ~case_insensitive ~capitalize:"SCREAMING_SNAKE_CASE"]

type t =
  | Submit of Order.Request.t
  | Book of Symbol.t
  | Subscribe of Symbol.t

(* splits the given line on spaces and takes the first word. Parse it as a
   verb: return err if not recognized otherwise match on the verb to parse
   the remaining arguments: Buy | Sell parse symbol, price, TIF, participant
   Book | Subscribe: parse a required symbol argument *)

let parse ?default_participant line =
  let parse_symbol symbol_str =
    Or_error.try_with (fun () -> Symbol.of_string symbol_str)
  in
  let all_str =
    String.concat
      ~sep:"|"
      (List.map ~f:Time_in_force.to_string Time_in_force.all)
  in
  let line = String.strip line in
  if String.is_empty line
  then Or_error.error_string "empty command"
  else (
    let parts =
      String.split line ~on:' ' |> List.filter ~f:(Fn.non String.is_empty)
    in
    match parts with
    | [] -> Or_error.error_string "empty command"
    | verb_str :: rest ->
      let open Result.Let_syntax in
      (match String.uppercase verb_str with
       (* Handle orders (BUY/SELL) --- *)
       | ("BUY" | "SELL") as side_str ->
         let side = Side.of_string side_str in
         (match rest with
          | symbol_str :: size_str :: price_str :: rest ->
            let%bind size =
              match Int.of_string_opt size_str with
              | Some n when n > 0 -> Ok n
              | Some _ -> Or_error.error_string "size must be positive"
              | None ->
                Or_error.error_string [%string "invalid size: %{size_str}"]
            in
            let%bind price =
              Or_error.try_with (fun () -> Price.of_string price_str)
            in
            let%bind symbol = parse_symbol symbol_str in
            let%bind time_in_force, rest =
              match rest with
              | ("as" | "AS") :: _ -> Ok (Time_in_force.Day, rest)
              | tif_str :: rest' ->
                let%bind tif =
                  Or_error.try_with (fun () ->
                    Time_in_force.of_string tif_str)
                in
                Ok (tif, rest')
              | [] -> Ok (Time_in_force.Day, [])
            in
            let%bind participant =
              let%bind parsed_participant_opt =
                match rest with
                | "as" :: name :: _ | "AS" :: name :: _ ->
                  Ok (Some (Participant.of_string name))
                | [] -> Ok None
                | _ ->
                  let trailing = String.concat ~sep:" " rest in
                  Or_error.error_string
                    [%string "unexpected trailing arguments: %{trailing}"]
              in
              let resolved =
                match parsed_participant_opt, default_participant with
                | Some p, _ -> p
                | None, Some p -> p
                | None, None -> Participant.of_string "anonymous"
              in
              Ok resolved
            in
            let request =
              ({ symbol
               ; participant
               ; side
               ; price
               ; size = Size.of_int size
               ; time_in_force
               }
               : Order.Request.t)
            in
            Ok (Submit request)
          | _ ->
            Or_error.error_string
              [%string
                "expected: BUY|SELL <symbol> <size> <price> [%{all_str}] \
                 [as <name>]"])
       | ("BOOK" | "SUBSCRIBE") as cmd ->
         (match rest with
          | [ symbol_str ] ->
            let%bind symbol = parse_symbol symbol_str in
            let result =
              if String.equal cmd "BOOK"
              then Book symbol
              else Subscribe symbol
            in
            Ok result
          | _ -> Or_error.error_string [%string "expected: %{cmd} <symbol>"])
       | other ->
         let verb_types =
           all_of_verb
           |> List.map ~f:string_of_verb
           |> String.concat ~sep:" or "
         in
         Or_error.error_string
           [%string "unknown command: %{other} (expected %{verb_types})"]))
;;
