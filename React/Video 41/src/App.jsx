import { createContext, useEffect, useReducer, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { TodoFilterForm } from "./TodoFilterForm";

const LOCAL_STORAGE_KEY = "TODOS";
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];

    case ACTIONS.TOGGLE:
      return todos.map((t) => {
        if (t.id === payload.id) return { ...t, completed: payload.complete };
        return t;
      });

    case ACTIONS.DELETE:
      return todos.filter((td) => td.id !== payload.id);

    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name };
        }
        return todo;
      });

    default:
      throw new Error(`No actions found for ${type}`);
  }
}

export const TodoContext = createContext();

function App() {
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [todo, dispatch] = useReducer(reducer, [], (initValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY); //Store locally

    if (value == null) return initValue;

    return JSON.parse(value);
  });

  const filteredTodos = todo.filter((t) => {
    if (hideCompletedFilter && t.completed) return false;
    return t.name.includes(filterName);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, complete) {
    dispatch({
      type: ACTIONS.TOGGLE,
      payload: { id: todoId, complete: complete },
    });
  }

  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: id } });
  }

  function updateTodo(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } });
  }

  return (
    <TodoContext.Provider
      value={{
        todo: filteredTodos,
        addNewTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      <TodoFilterForm
        name={filterName}
        setName={setFilterName}
        hideCompleted={hideCompletedFilter}
        setHideCompleted={setHideCompletedFilter}
      />
      <TodoList />
      <NewTodoForm />
    </TodoContext.Provider>
  );
}

export default App;
