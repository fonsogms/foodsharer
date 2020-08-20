import React from "react";
import "./App.css";
import SignUp from "./components/auth/SingUp";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
function App() {
  /*   axios.get("/api/food/test").then((res) => {
    console.log(res);
  });
 */
  return (
    <div className="App">
      <Route
        exact
        path="/singUp"
        render={(props) => {
          return <SignUp {...props}></SignUp>;
        }}
      />
      <Route
        exact
        path="/login"
        render={(props) => {
          return <Login {...props}></Login>;
        }}
      />
    </div>
  );
}

export default App;
