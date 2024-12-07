import React from "react";

export class CounterClass extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }
    }
    render(){
        return(
            <h1 onClick={()=>this.setState({count:this.state.count+1})}>{this.state.count}</h1>
        )
    }
}