import { useState } from "react"
import { DisplayString } from "./DisplayString"

export function FunctionComponent({ favoriteNumber }){
    const [name,setName]=useState("")
    const [age,setAge]=useState(0)

    return(
        <div>
            <input value={name} onChange={e=>setName(e.target.value)}/> <br /><br />
            <button onClick={()=>setAge(curAge=>curAge+1)}>+</button>
            {age}
            <button onClick={()=>setAge(curAge=>curAge-1)}>-</button> <br /><br />
            {favoriteNumber!=null && <h1>My favorite number is {favoriteNumber}</h1>}
            <DisplayString name={name} age={age}/>
        </div>
    )

}