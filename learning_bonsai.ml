(* Good rule of thumb is to keep things in as narrow of a scope as possible. When you 
have a global mutated state, especially, in bonsai, that thing when updated will affect
all of its children nodes. its best to keep things in a closed scope. 

Ex: 
let x = 2 in 
let y = 4 in 
let z = x + y
-> 

  let z = 

    let x = 2 in
    let y = 4 in 
    x + y
  in 
  .... 
*)

(* Components should be used as modules with a view function *)

module Greeting = struct
  let view () = {%html|<div class="greeting">Hello, world!</div>|}
end

module Home_page = struct
  let view () = {%html|<Greeting.view />|}
end


(* Any HTML tag can be used in ppx_hyml (h1, span, form) 

Additionally, you can use Ocaml values in your markup, eg. %{value#Module} calls Module.to_string value and renders
the result as a test, like ppx_string *)

(*Rendering componenets: 

Method 1: <MOdule.path> Syntax, which only works with literal 
module paths like Card.view: *)

let view = {%html | <Card.view> Hello, world!</>|}

(* the general form can use any expression, and can pass positional arguments (above you can't)*)

(* Say a card has a header argument and then an optinal attributes. if you use the general: 
  
  <%{expression} -> <%{card} class = "greeting" 

Self closing things are the same: < syntax /> *)

(* Attributes are a list of things which can be optinal, single or another list*)

let view =
  {%html|<div %{class_attr} ?{optional_id} *{extra_attrs}>Hello, world!</div>|}
;;

(*Arguments are similar, you can pass them in using the ~arg:%{value} syntax*)

let view ?(placeholder_name = "") ~label () =
    {%html|
      <div %{style}>
        <label>#{label}</label>
        <input type="text" placeholder=%{placeholder_name} />
      </div>
    |}
let placeholder_name = "Alice"
let view =
  (* {%html|<Name_input.view ~label:%{"What's your name?"}|> ~placeholder_name  *)

    (* notice how when you create a div, you enter things in it, then close it later. 
    Here, inside the div, we have a label, which  is "Whats your name?" and an 
input which is of tpye text (attribute) with name as the argument you pass in  *)


(* Styling with ppx_css
 
  1.) Inline style attribute, for simple one off styles on a single element 
    specifically used the stlye keyword within a div 
  2.) {%css | | } blocks for reusable styles with selectors like :hover 
    css keyword, can define style = {%css || }
  3.) [%css stylesheets] for named classes with media queries, relative selectors, 
  and other @at-rules 

*)


(* Mapping 

let%arr allows you to get the underlying type of a bonsai: 

say you have a Bonsai.t Student.t and you want to get just the student.t so that 
you can use a student.t masters_student, you can then again map that to a bonsai using 
Bonsai.return  *)

module Student_badge = struct
  let component student =
    let%arr student in
    {%html|<div class="student-badge">My name is #{Student.name student}</div>|}
  ;;
end

let component =
  let student =
    Bonsai.return
      (Student.Masters
         { name = "Bob"; thesis = Some "incrementally typed languages" })
  in
  Student_badge.component student
;;

(* match%arr vs match%sub 

%arr -> simpler, used when each branch returns a different value 
  think: transforrming data instead of creating new computions
  no branch. needs state, effects, or access to graph 
  equivalent to let%arr value in match value with ... 

%sub -> more powerful, has overhead, 
  used when each branch needs their own state, where 
  you need to use graph within the match arms. Each arm creates a speerate Bonsai node with a local state 
  to that arm 

Usually, you start with %arr and swap when you need stateful branches or computations 

*)


module Student_page = struct
  let component degree (graph @ local) =
    (* lazy tag akkiws you to defer the construction of the nodes in a match 
    arm until it is matched on (e.g. the user visits it )*)
    match%sub [%lazy] degree with
    | Student.Phd { name; thesis } ->
      (* Imagine this is a computationally intensive page *)
      let%arr name and thesis in
      Grad_student_page.component ~name ~thesis:(Some thesis)
    | Masters { name; thesis } ->
      let%arr name and thesis in
      Grad_student_page.component ~name ~thesis
    | Bachelors { name; major } ->
      let%arr name and major in
      {%html|<div>#{name} is a Bachelors student majoring in #{major}!</div>|}

      (* sub is used here becasue between phd masters and bachelors, each has a 
      seperate componenet associated with it*)
  ;;
end

let component =
  Student_page.component
    (Bonsai.return
       (Student.Masters
          { name = "Charlie"; thesis = Some "programming languages" }))
    graph
;;

(* What if you want a dynamic number of nodes? Bonsai.assoc allows you to create a node
  for each entry in a data structure, such as when you're rendering a list of items that need a 
state or if you need to recompute a single node without redoing the entire list. *)

  let component ~todos (graph @ local) =
  let assoc_view =
    Bonsai.assoc
      (module Int)
      todos
      ~f:(fun _key todo (graph @ local) ->
        let is_finished, set_is_finished = Bonsai.state false graph in
        let%arr todo and is_finished and set_is_finished in
        let icon =
          match is_finished with
          | true -> {%html|<span %{icon_style}>✓</span>|}
          | false ->
            {%html|
              <button %{button_style} on_click=%{fun _ ->
                set_is_finished true
              }>
                #{" Complete "}
              </button>
            |}
        in
        {%html|<div %{todo_style}>%{icon}<span> #{todo}</span></div>|})
      graph
  in
  let%arr assoc_view in
  Vdom.Node.Map_children.div assoc_view
;;
(* here, you can complete tasks in the todo (within the same list) and add them. *)


(* States for your application 

Bonsai.state is used when all updates to state completely replace the old 
state and do not depend on the old one. An example is changing majors. 

Bonsai.state' is if all updates to one depend on the others, like enrolling for 
  classes. *)

let component (graph @ local) =
  let classes, set_classes = Bonsai.state' 0 graph in
  let%arr classes and set_classes in
  {%html|
    <div>
      #{" You are enrolled in "}#{Int.to_string classes}#{" classes. "}<button
        on_click=%{fun _ -> set_classes (fun classes -> classes + 1)}
      >
        #{"Enroll"}
      </button>
    </div>
  |}
;;
(* Bonsai.toggle for boolean states, toggle' when you need to set that state to a value*)
module Theme_toggle = struct
  let component (graph @ local) =
    let is_light_mode, toggle_theme =
      Bonsai.toggle ~default_model:true graph
    in
    let%arr is_light_mode and toggle_theme in
    let style, mode_text =
      if is_light_mode
      then light_mode_styles, "Light Mode"
      else dark_mode_styles, "Dark Mode"
    in
    {%html|
      <div %{style}>
        #{" Current theme: "}#{mode_text}<button
          style="margin-left: 16px"
          on_click=%{fun _ -> toggle_theme}
        >
          #{" Toggle Theme "}
        </button>
      </div>
    |}
  ;;
end

(* Complex states are used when you need multiple ways to update state. 
instead of setting it directly, you dispatch actions and an apply_action function to 
transform each one. This is used when you have a state with multiple fields or complex
updating logic. (Bonsai.state_machine)

If you need to return values, Bonsai.actor does so. It does the same as state machine 
but at the end returns a value that gets sent back through the effect when it compiles. *)

