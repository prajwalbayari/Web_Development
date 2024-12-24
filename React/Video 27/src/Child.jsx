import { useState, useEffect } from "react";

export function Child() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    console.log("Re-render");
  });

  useEffect(()=>{
    document.title=name

    const timeout=setTimeout(()=>{
        console.log(`My name is ${name}`)
    },1000)

    return()=>{
        clearTimeout(timeout);
    }
  },[name])

  useEffect(() => {
    console.log("Hi");

    return()=>{
        console.log(Bye)
    }
  }, []);

  useEffect(()=>{
    console.log(`Hi I am ${name} and I am ${age} years old`)
  },[name,age])

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
