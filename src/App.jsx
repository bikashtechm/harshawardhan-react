import React from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

let App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
