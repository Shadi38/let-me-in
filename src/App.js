import React, { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import InputName from "./components/ListName";

function App() {
  const [selectedName, setSelectedName] = useState("");

  return (
    <div className="App">
      <h1>Let me in</h1>
      <InputName setSelectedName={setSelectedName} />
      <Buttons name={selectedName} />
    </div>
  );
}

export default App;
