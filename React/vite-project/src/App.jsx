import React from "react";

function App() {
  // return React.createElement("h1", { id: "5" }, "Nirma");

  // return(
  //   <h1 id="5" className="blue" style={{background:"red"}}>
  //     Hello world <span>Bye</span>
  //   </h1>
  // )

  // return(
  //   <label><h1>{2+2}</h1></label>
  // )

  return(
    <div className="large" id="largeDiv">
      <label htmlFor="inputId">Nirma</label>
      <input type="text" id="inputId" type="number" defaultValue={3}/>
    </div>
  )
}

export default App;
