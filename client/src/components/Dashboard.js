import React from "react";
import "../styles.css";

const Dashboard = ({ logout }) => {
  return (
    <div className="dashboard-container">
      <h2>Bienvenido al Panel</h2>
      <p>Acceso concedido tras autenticación 2FA.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
