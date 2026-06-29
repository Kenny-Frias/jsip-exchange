open! Core
include Int

type t = int [@@deriving sexp, bin_io, compare, equal, hash, string]

module Generator = struct
  type t = { mutable next : int } [@@deriving sexp_of]

  let create () = { next = 1 }

  let next t =
    let id = t.next in
    t.next <- t.next + 1;
    id
  ;;
end
