// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
