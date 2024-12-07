import { useState } from "react"
import { Counter } from "./counter"

function App() {
  const [name,setName]=useState("Bhatta")
  const [age,setAge]=useState(20)

  function handleClick(){
    setName("Nirma")
    setAge((currentAge)=>{
      return currentAge+1
    })
    setAge((currentAge)=>{
      return currentAge+1
    })
  }

  // return (
  //   <h1 onClick={handleClick}>Hello {name} {age}</h1>
  // )

  return(
    <Counter/>
  )
}

export default App
