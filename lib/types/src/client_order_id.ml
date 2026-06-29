open! Core
include Int

type t = int [@@deriving sexp, bin_io, compare, equal, hash, string]

module Registry = struct
  let used : (t, unit) Hashtbl.t = Hashtbl.Poly.create ()

  let register id =
    if Hashtbl.mem used id
    then Or_error.errorf "client_order_id %d already in use" id
    else (
      Hashtbl.set used ~key:id ~data:();
      Ok ())
  ;;

  let unregister id = Hashtbl.remove used id
  let is_used id = Hashtbl.mem used id
end

module Generator = struct
  type t = { mutable next : int } [@@deriving sexp_of]

  let create () = { next = 1 }

  let next t =
    let rec find () =
      let id = t.next in
      t.next <- t.next + 1;
      match Registry.register id with Ok () -> id | Error _ -> find ()
    in
    find ()
  ;;
end
