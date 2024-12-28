import { useCallback, useState } from "react"

export function useArray(initValue){
    const [array,setArray]=useState(initValue)

    // function push(element){
    //     setArray(a=> [...a,element])
    // }

    const push=useCallback(element=>{ //using useCalbaks
        setArray(a=>[...a,element])
    },[])

    function replace(index,newElement){
        setArray(a=>{
            return [...a.slice(0,index),newElement,...a.slice(index+1) ]
        })
    }

    function filter(callBack){
        setArray(a=>{
            return a.filter(callBack)
        })
    }

    function remove(index){
        setArray(a=>{
            return [...a.slice(0,index),...a.slice(index+1)]
        })
    }

    function clear(){
        setArray([])
    }

    function reset(){
        setArray(initValue)
    }

    return{ array,set:setArray,push,replace,filter,remove,clear,reset}
}