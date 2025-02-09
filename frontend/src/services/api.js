const API_URL = "http://127.0.0.1:5000/api"; // Asegúrate de que esta URL sea la correcta

// Función para registrar un usuario
export const register = async (usuario, nombre, dni, contrasena) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, nombre, dni, contrasena }),
    });

    if (!response.ok) {
        throw new Error("Error al registrar usuario");
    }

    return response.json();
};

// Función para iniciar sesión
export const login = async (usuario, contrasena) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
    });

    if (!response.ok) {
        throw new Error("Credenciales incorrectas");
    }

    return response.json();
};

// Función para obtener datos del Dashboard
export const getDashboard = async () => {
    const token = localStorage.getItem("token");
    console.log("Token obtenido de localStorage:", token); // Verifica si está obteniendo el token

    const response = await fetch(`${API_URL}/dashboard`, {
        method: "GET",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.log("Error en la respuesta:", errorResponse); // Imprime el error devuelto por Flask
        throw new Error("Error al obtener datos del dashboard");
    }

    return response.json();
};




// Función para obtener el historial de ingresos y egresos
export const getHistory = async (token) => {
    const response = await fetch(`${API_URL}/history`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("Error al obtener historial");
    }

    return response.json();
};

// Función para reportar un problema (sistema de tickets)
export const reportIssue = async (token, descripcion) => {
    const response = await fetch(`${API_URL}/report`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ descripcion }),
    });

    if (!response.ok) {
        throw new Error("Error al enviar el reporte");
    }

    return response.json();
};

// Función para enviar una calificación con estrellas
export const sendRating = async (token, rating) => {
    const response = await fetch(`${API_URL}/rate`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
        throw new Error("Error al enviar calificación");
    }

    return response.json();
};
