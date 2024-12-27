import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), name: "Item 1" },
    { id: crypto.randomUUID(), name: "Item 2" },
  ]);

  function addItem() {
    setItems((curItems) => {
      return curItems.length > 0
        ? [
            ...curItems,
            { id: crypto.randomUUID(), name: `Item ${curItems.length + 1}` },
          ]
        : [{ id: crypto.randomUUID(), name: `Item 1` }];
    });
  }

  return (
    <>
      <button onClick={addItem}>Add new item</button> <br /><br />  
      <button onClick={() => setItems([])}>Clear</button>
      <pre>{JSON.stringify(items, null ,2)}</pre>
    </>
  );
}

export default App;
