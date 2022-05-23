import React, { useReducer } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductsLists from "./ProductsLists";

let initialUser = {
  isLoggedIn: false,
  currentUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

function App() {
  let reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          isLoggedIn: true,
          currentUserId: action.payload.currentUserId,
          currentUserName: action.payload.currentUserName,
          currentUserRole: action.payload.currentUserRole,
        };

      case "logout":
        return {
          isLoggedIn: false,
          currentUserId: null,
          currentUserName: null,
          currentUserRole: null,
        };
      default:
        return state;
    }
  };

  let [user, dispatch] = useReducer(reducer, initialUser);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" exact="true" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products" element={<ProductsLists />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
