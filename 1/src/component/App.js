import React from "react";
import WithContext from "./whithContext";
import './App.css'

function App({name}) {
    return (
      <div className="App">
        <h1>hello {name}</h1>
        <button>logout</button>
      </div>
    )
}

export default WithContext(App);