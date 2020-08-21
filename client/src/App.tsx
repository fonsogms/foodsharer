import React from "react";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
function App() {
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
      <Route
        exact
        path="/home"
        render={(props) => {
          return <Home {...props}></Home>;
        }}
      />
    </div>
  );
}

export default App;
