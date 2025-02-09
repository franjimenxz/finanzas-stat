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




export const getHistory = async (token) => {
    const response = await fetch(`${API_URL}/history`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });

    const data = await response.json();
    console.log("Datos recibidos de /api/history:", data); // Verifica la respuesta

    if (!response.ok) {
        throw new Error("Error al obtener historial");
    }

    return data;
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

export const addIncome = async (token, descripcion, importe, idcategoria) => {
    const response = await fetch(`${API_URL}/add_income`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ descripcion, importe, idcategoria }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar ingreso");
    }
    return response.json();
};


// Función para registrar un egreso
export const addExpense = async (token, descripcion, importe, idcategoria, idMetodoPago) => {
    const response = await fetch(`${API_URL}/add_expense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ descripcion, importe, idcategoria, idMetodoPago }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar egreso");
    }

    return response.json();
};

// Función para obtener categorías por tipo (por ejemplo, "ingreso" o "egreso")
export const getCategories = async (token, tipo) => {
    const response = await fetch(`${API_URL}/categories?tipo=${tipo}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error("Error al obtener categorías");
    }
    return response.json();
};
// Función para obtener métodos de pago
export const getPaymentMethods = async (token) => {
    const response = await fetch(`${API_URL}/payment_methods`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Error al obtener métodos de pago");
    }
    return response.json();
  };
  