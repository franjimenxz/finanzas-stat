import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/footer.css";
const Footer = () => {
    const location = useLocation();

    return (
        <footer className="footer">
            <p>© 2024 STATS. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;