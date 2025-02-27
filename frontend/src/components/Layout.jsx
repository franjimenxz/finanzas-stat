import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/images/logo.png";

const Sidebar = ({ setAuth, isOpen, toggleMenu }) => {
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
    <aside
      className={`fixed md:relative w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col justify-between p-6 shadow-xl transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 z-50`}
    >
      {/* Logo */}
      <div className="text-center">
        <NavLink to="/" onClick={toggleMenu}>
          <img src={logo} alt="Inicio" className="w-32 mx-auto mb-4" />
        </NavLink>
      </div>

      {/* Menú */}
      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className="block px-4 py-2 rounded-md transition-all hover:bg-blue-800"
              onClick={toggleMenu}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingreso"
              className="block px-4 py-2 rounded-md transition-all hover:bg-blue-800"
              onClick={toggleMenu}
            >
              Ingresar Ingreso
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/egreso"
              className="block px-4 py-2 rounded-md transition-all hover:bg-blue-800"
              onClick={toggleMenu}
            >
              Ingresar Egreso
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/historial"
              className="block px-4 py-2 rounded-md transition-all hover:bg-blue-800"
              onClick={toggleMenu}
            >
              Historial
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className="block px-4 py-2 rounded-md transition-all hover:bg-blue-800"
                onClick={toggleMenu}
              >
                Administración
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* Botones inferiores */}
      <div className="mt-auto space-y-3">
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md shadow-md transition-all hover:shadow-lg"
          onClick={() => {
            navigate("/calificar");
            toggleMenu();
          }}
        >
          Calificar
        </button>
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md shadow-md transition-all hover:shadow-lg"
          onClick={() => {
            navigate("/report");
            toggleMenu();
          }}
        >
          Reportar Problema
        </button>
        <button
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md shadow-md transition-all hover:shadow-lg"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

const Layout = ({ setAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex h-screen">
      {/* Botón de menú hamburguesa (Solo en móvil) */}
      {!menuOpen && (
        <button
          className="md:hidden fixed top-4 inset-x-0 z-50 bg-blue-700 text-white p-2 rounded-md shadow-md w-40 mx-auto "
          onClick={toggleMenu}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <Sidebar setAuth={setAuth} isOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* Overlay cuando el menú está abierto */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Área de contenido principal */}
      <div className="flex-1 p-8 bg-white overflow-auto transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

