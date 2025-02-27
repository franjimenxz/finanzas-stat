import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
    <nav className="bg-gradient-to-r from-blue-600 via-blue-900 to-blue-500 text-white py-4 px-6 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          STATS
        </Link>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {["nosotros", "equipo", "servicios", "partners"].map((section) => (
            <li key={section}>
              <Link
                to="/"
                onClick={() => scrollToSection(section)}
                className="px-3 py-2 rounded-md transition-all hover:text-blue-300 hover:shadow-md hover:bg-gray-800"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón Iniciar Sesión */}
        <Link
          to="/login"
          className="hidden md:block bg-blue-700 hover:bg-blue-600 px-5 py-2 rounded-md text-white shadow-md transition-all hover:shadow-lg"
        >
          Iniciar Sesión
        </Link>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden text-2xl focus:outline-none w-32"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-blue-700 py-4 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 text-lg">
            {["nosotros", "equipo", "servicios", "partners"].map((section) => (
              <li key={section}>
                <Link
                  to="/"
                  onClick={() => scrollToSection(section)}
                  className="px-4 py-2 rounded-md transition-all hover:text-blue-400 hover:shadow-md hover:bg-gray-800"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md text-white shadow-md transition-all hover:shadow-lg"
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
