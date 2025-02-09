import { jwtDecode } from "jwt-decode";

export const getUser = (token) => {
  try {
    const decoded = jwtDecode(token); // Decodifica el token JWT
    return { usuario: decoded.usuario }; // Ahora devuelve el usuario en lugar del legajo
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return { usuario: "Desconocido" };
  }
};
