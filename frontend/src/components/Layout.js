import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layout.css"; // Importar estilos mejorados

const Sidebar = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h1>STATS</h1>
      <nav>
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/ingreso">Ingresar Ingreso</NavLink></li>
          <li><NavLink to="/egreso">Ingresar Egreso</NavLink></li>
          <li><NavLink to="/historial">Historial</NavLink></li>
        </ul>
      </nav>

      {/* Botones inferiores */}
      <div className="sidebar-bottom">
        <button className="btn-rate" onClick={() => navigate("/calificar")}>
          Calificar
        </button>
        <button className="btn-report" onClick={() => navigate("/report")}>
          Reportar Problema
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

const Layout = ({ setAuth }) => {
  return (
    <div className="layout-container">
      <Sidebar setAuth={setAuth} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
