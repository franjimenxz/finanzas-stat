import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Layout.css";

const Sidebar = ({ setAuth }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.rol === "admin");
    }
  }, []);

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
          {isAdmin && <li><NavLink to="/admin">Administración</NavLink></li>}
        </ul>
      </nav>

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
