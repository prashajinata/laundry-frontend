import React from "react";
import "./App.css";
import Member from "./pages/member";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Member></Member>
      </div>
    );
  }
}

export default App;
