import { useState } from "react";
import "./styles.css"

function App() {
  const [newTodo, setTodoName] = useState("");
  const [todo, setTodo] = useState([]);

  function addNewTodo(e) {
    e.preventDefault()
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
                <span data-list-item-text>{t.name}</span>
              </label>
              <button data-button-delete onClick={() => deleteTodo(t.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <from onSubmit={addNewTodo} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodo}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </from>
    </>
  );
}

export default App;
