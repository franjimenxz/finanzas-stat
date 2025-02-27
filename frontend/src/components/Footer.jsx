import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-gradient-to-r from-blue-600 via-blue-900 to-blue-500 text-white py-6 px-4 text-center mt-10">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* 📜 Derechos Reservados */}
        <p className="text-xs md:text-sm text-gray-300">
          © 2024 STATS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

