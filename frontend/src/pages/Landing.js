import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css"; 

const Landing = () => {
    return (
        <div className="landing-container">
            <header>
                <h1>Bienvenido a STATS</h1>
                <p>Administra tus finanzas de manera sencilla y eficiente.</p>
                <Link to="/login" className="btn">Iniciar Sesión</Link>
            </header>
        </div>
    );
};

export default Landing;
