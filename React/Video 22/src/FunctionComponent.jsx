import { useState, useEffect } from "react";

export function FunctionComponent() {
  const [name, setName] = useState("Anonymous");
  const [age, setAge] = useState(0);

  useEffect(()=>{
    const handler=()=>{
        console.log("Name was changed",name);
    }
    document.addEventListener("click",handler)
    console.log("Inside effect")

    //This is considered the clean up function since it cleans up the extra function calls
    return ()=>{
        console.log("Cleanup")
        document.removeEventListener("click",handler)
    }
  },[name]) //Dependecny array

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <br />
      <br />
      <button onClick={() => setAge((currenrAge) => currenrAge + 1)}>+</button>
      {age}
      <button onClick={() => setAge((currenrAge) => currenrAge - 1)}>-</button>
      <br />
      <br />
      Hello my name is {name} my age is {age}
    </div>
  );
}
