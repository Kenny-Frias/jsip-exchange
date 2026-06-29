open! Core

type t = int [@@deriving sexp, bin_io, compare, equal, hash, string]

module Generator : sig
  type client_order_id := t
  type t [@@deriving sexp_of]

  val create : unit -> t
  val next : t -> client_order_id
end

module Registry : sig
  val used : (t, unit) Hashtbl.t
  val register : t -> unit Or_error.t
  val unregister : t -> unit
  val is_used : t -> bool
end
