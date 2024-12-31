import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "./App";

export function TodoList() {
  const { todo } = useContext(TodoContext);

  return (
    <ul id="list">
      {todo.map((t) => {
        return <TodoItem key={t.id} {...t} />;
      })}
    </ul>
  );
}
