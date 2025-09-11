import { getTodos } from "@/api/todos";
import { TodoItem } from "@/components/TodoItem";

export default function TodosPage() {
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        <TodosList />
      </ul>
    </>
  );
}

async function TodosList() {
  const todos = await getTodos();
  return todos.map((todo) => <TodoItem key={todo.id} {...todo} />);
}
