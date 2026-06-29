open! Core

type t = int [@@deriving sexp, bin_io, compare, equal, hash, string]

module Generator : sig
  type client_order_id := t
  type t [@@deriving sexp_of]

  val create : unit -> t
  val next : t -> client_order_id
end
