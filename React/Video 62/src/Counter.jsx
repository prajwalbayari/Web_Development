import { useReducer } from "react";
import { useState } from "react";

const ACTIONS={
    INCREMENT:"INCREMENT",
    DECREMENT:"DECREMENT",
    RESET:"RESET",
    CHANGE_COUNT:"CHANGE_COUNT"
}

function reducer(count, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return count + 1;
    case ACTIONS.DECREMENT:
      return count - 1;
    case ACTIONS.RESET:
      return 0;
    case ACTIONS.CHANGE_COUNT:
      return count + action.payload.value;
    default:
      return count;
  }
}

export function Counter({ initCount = 0 }) {
  const [count, dispatch] = useReducer(reducer, initCount, (count) => {
    return count;
  });
  // const [count,counter]=useState(initCount)
  return (
    <div>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+</button>
      {count}
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>RESET</button>
      <br />
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.CHANGE_COUNT, payload: { value: 5 } })
        }
      >
        +5
      </button>
    </div>
    // <div>
    //     <button onClick={()=>counter(cnt=>cnt+1)}>+</button>
    //     {count}
    //     <button onClick={()=>counter(cnt=>cnt-1)}>-</button>
    // </div>
  );
}
