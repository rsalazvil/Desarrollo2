// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState(null); // No persistimos al recargar
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard logout={logout} /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
