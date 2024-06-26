import React, { useState } from "react";
import useTodoContext from "../context/TodoContext";

function TodoItem({ todoObject }) {

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMessage, setTodoMessage] = useState(todoObject.content);

  const {toggleComplete, deleteTodo, updateTodo} = useTodoContext();

  const editTodo = () => {
    updateTodo(todoObject.id, {...todoObject, content: todoMessage});
    setIsTodoEditable(false);
  }

  const toggleCompleteButton = () => {
    toggleComplete(todoObject.id);
  }

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black 
      ${
        todoObject.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todoObject.completed}
        onChange={toggleCompleteButton}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todoObject.completed ? "line-through" : ""}`}
        value={todoMessage}
        onChange={(e) => setTodoMessage(e.target.value)}
        readOnly={!isTodoEditable}
      />


      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todoObject.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todoObject.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>


      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todoObject.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
