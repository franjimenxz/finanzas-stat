import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Oculta el navbar en /login y /register
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    // Función para desplazarse suavemente a las secciones
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false); // Cierra el menú al hacer clic
        }
    };

    return (
        <nav className="navbar">
            <h1>STATS</h1>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
            <ul className={menuOpen ? "open" : ""}>
                <li><Link to="/" onClick={() => scrollToSection("nosotros")}>Nosotros</Link></li>
                <li><Link to="/" onClick={() => scrollToSection("equipo")}>Equipo</Link></li>
                <li><Link to="/" onClick={() => scrollToSection("servicios")}>Servicios</Link></li>
                <li><Link to="/" onClick={() => scrollToSection("partners")}>Partners</Link></li>
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
