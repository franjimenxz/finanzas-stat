import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await register(usuario, nombre, dni, email, contrasena);
      console.log("Usuario registrado:", data);
      navigate("/login");
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-md transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800">Crear Cuenta</h2>

        {/* Mensaje de error */}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 transition duration-200"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 transition duration-200"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">DNI</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 transition duration-200"
              placeholder="Ingresa tu DNI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 transition duration-200"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 transition duration-200"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace a login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-100 font-semibold hover:text-white transition duration-200">
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
