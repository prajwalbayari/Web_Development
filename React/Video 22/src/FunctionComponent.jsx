import { useState } from "react"

export function FunctionComponent(){
    const [name,setName]=useState("");
    const [age,setAge]=useState(0);

    return(
        <div>
            <input value={name} onChange={ e=> setName(e.target.value)}></input>
            <br /><br />
            <button onClick={()=> setAge(currenrAge=>currenrAge+1)}>+</button>
            {age}
            <button onClick={()=> setAge(currenrAge=>currenrAge-1 )}>-</button>
            <br /><br />
            Hello my name is {name} my age is {age}
        </div>
    )
}