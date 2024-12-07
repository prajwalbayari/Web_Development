import { useState } from "react";

export function Counter(){
    const [count,increment]=useState(0)

    function increase(){
        increment(count+1);
    }

    return(
        <h1 onClick={()=>increase((currentCount)=>currentCount+1)}>{count}</h1>
    )
}