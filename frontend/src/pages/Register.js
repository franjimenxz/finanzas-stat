import React, { useState } from "react";
import { register } from "../services/api"; // La función register espera: (usuario, nombre, dni, contrasena)
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";  // Importa el archivo de estilos para autenticación

const Register = () => {
  // Define los estados para cada campo
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Envía los parámetros en el orden correcto: usuario, nombre, dni, contrasena
      const data = await register(usuario, nombre, dni, contrasena);
      console.log("Usuario registrado:", data);
      // Una vez registrado, redirige al login
      navigate("/login");
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrarse</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
