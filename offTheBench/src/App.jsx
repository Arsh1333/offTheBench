import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-black underline">First Page</h1>
      <Link to="/home">Home</Link>
      <Link to="/canvas">Canvas</Link>
    </>
  );
}

export default App;
