import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>STATS</h1>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/history">Historial</Link></li>
                <li><Link to="/report">Reportar Problema</Link></li>
                <li><Link to="/logout">Cerrar Sesión</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
