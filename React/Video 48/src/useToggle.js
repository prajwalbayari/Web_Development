//Creating and using custom hooks

import { useState } from "react"

export function useToggle(initValue){
    const [value,setValue]=useState(initValue)

    function Toggle(){
      setValue(cur=>!cur)
    }
  
    return [value,Toggle]
}