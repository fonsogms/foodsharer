import React, { useEffect } from "react";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import { getToken, setToken } from "./token.info";
import axios from "axios";
import CreateFood from "./components/FoodCreation/CreateFood";
function App() {
  useEffect(() => {
    const checkToken = async () => {
      const body = await fetch(
        process.env.REACT_APP_DOMAIN + "/api/auth/loggedin",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await body.json();
      console.log(data);
      setToken(data.token);
    };
    checkToken();
  }, []);
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
      <CreateFood></CreateFood>
    </div>
  );
}

export default App;
