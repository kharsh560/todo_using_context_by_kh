import React, { useState } from "react";
import useTodoContext from "../context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  // "" -> symbolises empty string
  //Its made so as to temporarily store the todo and pass it to the "addTodo" function!

  // As this form contains "Add" button, so we need the "addTodo" functionality;
  // Hence this line of code:-
  const { addTodo } = useTodoContext();

  // We also need to make a function/method for the add button. When its clicked, we need to do these:-
  // 1) call "addTodo" and pass it the "todo"
  // 2) Clear the input space for next todo to be written.

  const addTheTodo = (e) => {
    e.preventDefault();
    // As its a button, hence we needed to do so.

    if (!todo) return;
    // As the addTodo takes an object as input, hence we need to pass on the object only, and not simply the string "todo"
    addTodo({ content: todo, completed: false });
    // I wrote todo as -> {todo}, so this was coming "[object Object]" instead of original message.
    // We did not include the "id" as we took care of it and override it in the "addtodo" fxn definition.

    setTodo("");
    // Did this to cleanup the "todo" variable so that the input box in UI gets cleared.
  };

  return (
    <form className="flex" onSubmit={addTheTodo}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
