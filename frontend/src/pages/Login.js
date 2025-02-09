import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(usuario, contrasena);
            console.log("Token recibido:", data.access_token);

            localStorage.setItem("token", data.access_token);
            console.log("Token guardado:", localStorage.getItem("token"));

            setAuth(true);  // Aquí se usa la función pasada desde el padre
            navigate("/dashboard");
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
