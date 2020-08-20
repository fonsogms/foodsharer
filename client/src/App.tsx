import React from "react";
import "./App.css";
import axios from "axios";
import SignUp from "./components/auth/Registration/SingUp";
function App() {
  /*   axios.get("/api/food/test").then((res) => {
    console.log(res);
  });
 */
  return (
    <div className="App">
      <SignUp></SignUp>
    </div>
  );
}

export default App;
