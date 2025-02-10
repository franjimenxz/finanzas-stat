const API_URL = process.env.REACT_APP_URL; // Asegúrate de que esta URL sea la correcta

// Función para registrar un usuario
export const register = async (usuario, nombre, dni, email, contrasena) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, nombre, dni, email, contrasena }),  // 📌 Agregado email
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
export const getDashboard = async (token, fecha) => {
    try {
        const url = fecha ? `${API_URL}/dashboard?fecha=${fecha}` : `${API_URL}/dashboard`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos del Dashboard obtenidos:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener datos del Dashboard:", error);
        return { ingresos_totales: 0, egresos_totales: 0, ingresos_por_categoria: [], egresos_por_categoria: [] };
    }
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



  export const getAdminDashboard = async (token) => {
    console.log("Token enviado:", token);  // 👀 Verifica si hay token

    const response = await fetch("http://127.0.0.1:5000/api/admin", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log("Usuarios recibidos:", data); // 👀 Verifica los datos recibidos

    if (!response.ok) {
        throw new Error("Error al obtener datos del administrador");
    }

    return data;
};


// Agregar un usuario
export const addUser = async (token, userData) => {
    const response = await fetch(`${API_URL}/admin/add_user`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error("Error al agregar usuario");
    }
    return response.json();
};

// Eliminar usuario
export const deleteUser = async (token, legajo) => {
    const response = await fetch(`${API_URL}/admin/delete_user/${legajo}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error al eliminar usuario");
    }
    return response.json();
};

// Agregar una categoría
export const addCategory = async (token, categoryData) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
    });

    if (!response.ok) {
        throw new Error("Error al agregar categoría");
    }
    return response.json();
};

export const getPaymentMethods = async (token) => {
    try {
        const response = await fetch(`${API_URL}/payment_methods`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Métodos de pago obtenidos:", data);  // 🔹 Verifica qué devuelve la API

        return data.metodos || [];  // ✅ Asegurar retorno correcto
    } catch (error) {
        console.error("Error al obtener métodos de pago:", error);
        return []; // Retorna un array vacío en caso de error
    }
};


// Agregar un método de pago
export const addPaymentMethod = async (token, paymentData) => {
    const response = await fetch(`${API_URL}/payment_methods`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
        throw new Error("Error al agregar método de pago");
    }
    return response.json();
};
export const getDashboardData = async (token, fecha) => {
    try {
        const url = fecha ? `${API_URL}/api/dashboard?fecha=${fecha}` : `${API_URL}/api/dashboard`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos del Dashboard obtenidos:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener datos del Dashboard:", error);
        return { ingresos_totales: 0, egresos_totales: 0, ingresos_por_categoria: [], egresos_por_categoria: [] };
    }
};
export const getUserTickets = async (token) => {
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,  // ✅ Enviar token correctamente
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener tickets:", error);
        return []; // Retornar array vacío si falla
    }
};

export const reportIssue = async (token, descripcion) => {
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,  // ✅ Enviar token correctamente
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: descripcion })
        });

        if (!response.ok) {
            throw new Error("Error al reportar el problema.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al reportar problema:", error);
        return { error: "No se pudo reportar el problema" };
    }
};
