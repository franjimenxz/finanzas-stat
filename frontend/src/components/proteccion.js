import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Datos del token:", decoded);  // ✅ Verifica el rol del usuario

    if (adminOnly && decoded.rol !== "admin") {
      console.warn("⚠️ No tienes permisos de administrador.");
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
