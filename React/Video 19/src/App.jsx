import { useState } from "react"

const INITIAL_VALUE=["A","B","C"]

function App() {
  const [array,setArray]=useState(["A","B","C"])
  const [value,setValue]=useState("")

  function removeFirstElement(){
    setArray(currentArray=>{
      return currentArray.slice(1);
    })
  }

  function removeSpecificLetter(letter){
    setArray(currentArray=>{
      return currentArray.filter(ele=>ele!==letter)
    })
  }

  function addToBegin(letter){
    setArray(currentArray=>{
      return [letter,...currentArray]
    })
  }

  function addToEnd(letter){
    setArray(currentArray=>{
      return [...currentArray,letter]
    })
  }

  function clear(){
    setArray([])
  }

  function reset(){
    setArray(INITIAL_VALUE)
  }

  function updateAtoH(){
    setArray(currentArray=>{
      return currentArray.map(ele=>{
        if(ele==="A") return "H"
        return ele
      })
    })
  }

  function addLetterAtIndex(letter,index){
    setArray(currentArray=>{
      return [...currentArray.slice(0,index),letter,...currentArray.slice(index)]
    })
  }

  return (
    <div>
      <button onClick={removeFirstElement}>Remove First Element</button> 
      <br />
      <button onClick={()=>removeSpecificLetter("B")}>Remove All Bs</button>
      <br />
      <button onClick={()=>addToBegin("B")}>Add to Start</button>
      <br />
      <button onClick={()=>addToEnd("Z")}>Add to end</button>
      <br />
      <button onClick={clear}>Clear array</button>
      <br />
      <button onClick={reset}>Reset array</button>
      <br />
      <button onClick={updateAtoH}>Update All A to H</button>
      <br />
      <input value={value} onChange={e=>setValue(e.target.value)}/>
      <br />
      <button onClick={()=>addToBegin(value)}>Add value to array</button>
      <br />
      <button onClick={()=>addLetterAtIndex("C",3)}>Add letter at index</button>
      <br />
      <h1>{array.join(',')}</h1>
    </div>
  )
}

export default App
