import { useState } from "react";
import { useToggle } from "./useToggle";

function App() {
  // const [name, setName] = useState("");
  const nameInput=useInputValue("")
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDarkMode,setIsDarkMode]=useToggle(false);

  return (
    <>
      <div
        style={{
          background: isDarkMode ? "#333" : "white",
          color: isDarkMode ? "white" : "#333",
        }}
      >
        <label>
          Name:
          {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
          <input {...nameInput} />
        </label>
        <br />
        <br />
        <button onClick={setIsDarkMode}>
          Toggle dark mode
        </button>
      </div>
    </>
  );
}

function useInputValue(initValue){
  const [value,setValue]=useState(initValue)

  return{
    value,
    onChange:(e)=> setValue(e.target.value)
  }
}

export default App;
