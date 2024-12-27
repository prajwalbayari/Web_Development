import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"

function App() {
  const [name,setName]=useState("")
  const temp=useRef("Nirma") //Does no re-renders every time

  useEffect(()=>{
    console.log("Re-render")
  })

  return (
    <>
      <label>
        Name:
        <input ref={temp} type="text" value={name} onChange={e=>setName(e.target.name)}/>
      </label>
      <button onClick={()=> temp.current=Math.random()}> Change ref</button>
      <button onClick={()=> console.log(temp.current)}> Print ref</button>
    </>
  )
}

export default App
