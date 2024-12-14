import React from "react";

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: 0,
    };
  }

  render() {
    return (
      <div>
        <input value={this.state.name} onChange={(e) => this.setState({name:e.target.value})}></input>
        <br />
        <br />
        <button onClick={() => this.setState((currentState) =>{ return {age:currentState.age + 1}})}>
          +
        </button>
        {this.state.age}
        <button onClick={() => this.setState((currentState) =>{ return {age: currentState.age - 1}})}>
          -
        </button>
        <br />
        <br />
        Hello my name is {this.state.name} my age is {this.state.age}
      </div>
    );
  }
}
