const API_URL = "http://147.79.83.153:5000/api";

export const apiRequest = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, options);

    // 🔹 Si el usuario está desactivado, cierra sesión y redirige
    if (response.status === 403) {
        alert("Tu cuenta ha sido desactivada. Cerrarás sesión.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirige al login
        return null; // Evita continuar con la ejecución
    }

    return response.json();
};







// Función para registrar un usuario
export const register = async (usuario, nombre, dni, email, contrasena) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, nombre, dni, email, contrasena }),  //Agregado email
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

    const response = await fetch(`${API_URL}/admin`, {
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

// Desactivar usuario
export const deactivateUser = async (token, legajo) => {
    const response = await fetch(`${API_URL}/admin/deactivate_user/${legajo}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error al desactivar usuario");
    }
    return response.json();
};

// Reactivar usuario
export const reactivateUser = async (token, legajo) => {
    const response = await fetch(`${API_URL}/admin/reactivate_user/${legajo}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error al reactivar usuario");
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

        return data.metodos || [];  //   Asegurar retorno correcto
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

export const deleteIncome = async (token, id) => {
    const response = await fetch(`${API_URL}/history/delete_income/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el ingreso");
    }
    return response.json();
  };
  
  export const deleteExpense = async (token, id) => {
    const response = await fetch(`${API_URL}/delete_expense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el egreso");
    }
    return response.json();
  };


export const downloadHistoryPDF = async (token) => {
    try {
        const response = await fetch(`${API_URL}/history/download_pdf`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al descargar el PDF");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace de descarga
        const a = document.createElement("a");
        a.href = url;
        a.download = "historial_financiero.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error al descargar PDF:", error);
    }
};





/**
 * Reporta un problema al backend.
 * @param {string} token - Token de autenticación.
 * @param {string} descripcion - Descripción del problema.
 */
export const reportIssue = async (token, descripcion) => {
    if (!token) {
        console.error("  Error: No hay token disponible.");
        return { error: "No hay sesión activa." };
    }

    if (!descripcion || descripcion.trim().length < 5) {
        console.error("  Error: Descripción inválida.");
        return { error: "La descripción debe tener al menos 5 caracteres." };
    }

    try {
        console.log("  Enviando reporte...");
        const response = await fetch(`${API_URL}/external/tickets`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description: descripcion.trim() })
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("  Reporte enviado con éxito:", result);
        return result;
    } catch (error) {
        console.error("  Error al reportar problema:", error);
        return { error: "No se pudo reportar el problema." };
    }
};



/**
 * Registra una reseña en el backend.
 * @param {string} usuario - Nombre del usuario.
 * @param {string} dni - DNI del usuario.
 * @param {number} stars - Calificación de 1 a 5.
 * @param {string} descripcion - Comentario opcional.
 */
export const sendReview = async (token, stars, descripcion) => {
    if (!token) {
        console.error("  Error: No hay token disponible.");
        return { error: "No hay sesión activa." };
    }

    if (!stars || stars < 1 || stars > 5) {
        console.error("  Error: Calificación inválida.");
        return { error: "La calificación debe estar entre 1 y 5 estrellas." };
    }

    if (!descripcion || descripcion.trim().length < 5) {
        console.error("  Error: Descripción inválida.");
        return { error: "La descripción debe tener al menos 5 caracteres." };
    }

    try {
        console.log("  Enviando reseña...");
        const response = await fetch(`${API_URL}/external/reviews`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stars,
                description: descripcion.trim()
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("  Reseña enviada con éxito:", result);
        return result;
    } catch (error) {
        console.error("  Error al enviar reseña:", error);
        return { error: "No se pudo enviar la reseña." };
    }
};


/**
 * Obtiene la calificación previa del usuario desde el backend.
 * @param {string} token - Token de autenticación.
 */
export const getUserRating = async (token) => {
    if (!token) {
        console.error("  Error: No hay token disponible.");
        return { error: "No hay sesión activa." };
    }

    try {
        console.log("  Solicitando calificación del usuario...");
        const response = await fetch(`${API_URL}/external/reviews`, {
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
        console.log("  Calificación obtenida:", data);
        return data;
    } catch (error) {
        console.error(" Error al obtener calificación:", error);
        return { error: "No se pudo obtener la calificación." };
    }   
};
