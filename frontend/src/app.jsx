import React from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import RideList from "./components/RideList.jsx";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CityRide Prototype</h1>
      <Signup />
      <Login />
      <RideList />
    </div>
  );
}

export default App;
