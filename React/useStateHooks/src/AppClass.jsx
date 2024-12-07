import React from "react"
import { CounterClass } from "./CounterClass"

export default class AppClass extends React.Component{
    constructor(props){
        super(props)

        this.state={
            name:"Prajwal",
            age:20
        }
    }

    render(){
        // const handleClick=()=>{
        //     this.setState({name:"Nirma"})
        //     this.setState({age:this.state.age+1})
        // }
        // return(
        //     // <h1 onClick={()=>this.setState({name:"Nirma"})}>Hi {this.state.name} {this.state.age}</h1>
        //     <h1 onClick={handleClick}>Hi {this.state.name} {this.state.age} </h1>
        // )
        return(
            <CounterClass/>
        )
    }
}