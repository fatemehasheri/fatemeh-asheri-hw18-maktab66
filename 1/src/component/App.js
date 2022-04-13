import React from "react";
import WithContext from "./whithContext";
import './App.css'

function App() {
    return (
      <div className="App">
        <h1>hello mahyar</h1>
        <button>logout</button>
      </div>
    )
}

export default WithContext(App);