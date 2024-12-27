import { useState } from "react";

function App() {
  const [newTodo, setTodoName] = useState("");
  const [todo, setTodo] = useState([]);

  function addNewTodo() {
    if (newTodo === "") return;
    setTodo((curTodo) => {
      return [
        ...curTodo,
        { name: newTodo, completed: false, id: crypto.randomUUID() },
      ];
    });
    setTodoName("");
  }

  function toggleTodo(todoId, complete) {
    setTodo((curTodo) => {
      return curTodo.map((t) => {
        if (t.id === todoId) return { ...t, completed:complete };
        else return t;
      });
    });
  }

  function deleteTodo(id) {
    setTodo((curTodo) => {
      return curTodo.filter((td) => td.id !== id);
    });
  }

  return (
    <>
      <ul id="list">
        {todo.map((t) => {
          return (
            <li key={t.id} className="list-item">
              <label className="list-item-label">
                <input
                  checked={t.completed}
                  type="checkbox"
                  data-list-item-checkbox
                  onChange={e => toggleTodo(t.id, e.target.checked)}
                />
                <span data-list-item-checkbox>{t.name}</span>
              </label>
              <button data-list-item-checkbox onClick={() => deleteTodo(t.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <div id="todo-form">
        <br />
        <label htmlFor="todo-input">New Todo</label>
        <br />
        <input
          type="text"
          id="todo-input"
          value={newTodo}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <br />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
