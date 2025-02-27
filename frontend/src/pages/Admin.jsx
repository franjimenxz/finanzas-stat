import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminDashboard,
  addUser,
  deactivateUser,
  reactivateUser,
  addCategory,
  addPaymentMethod,
} from "../services/api";

const AdminDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    usuario: "",
    nombre: "",
    dni: "",
    email: "",
    contrasena: "",
    rol: "usuario",
  });
  const [newCategory, setNewCategory] = useState({ nombre: "", tipo: "ingreso" });
  const [newPaymentMethod, setNewPaymentMethod] = useState({ nombre: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await getAdminDashboard(token);
      setUsuarios(response.usuarios);
      setError(""); // Limpiar errores si la carga es exitosa
    } catch (err) {
      setError("Acceso denegado o error al cargar usuarios.");
    }
  };

  const handleUserStatus = async (legajo, isActive) => {
    const token = localStorage.getItem("token");
    try {
      if (isActive) {
        // Mostrar confirmación antes de desactivar
        if (!window.confirm("¿Está seguro que desea desactivar el usuario?")) {
          return;
        }
        await deactivateUser(token, legajo);
      } else {
        await reactivateUser(token, legajo);
      }
      fetchAdminData();
      setError("");
    } catch (err) {
      setError("Error al cambiar estado del usuario.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await addUser(token, newUser);
      fetchAdminData();
      setNewUser({
        usuario: "",
        nombre: "",
        dni: "",
        email: "",
        contrasena: "",
        rol: "usuario",
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar usuario.");
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await addCategory(token, newCategory);
      setNewCategory({ nombre: "", tipo: "ingreso" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar categoría.");
    }
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await addPaymentMethod(token, newPaymentMethod);
      setNewPaymentMethod({ nombre: "" });
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al agregar método de pago."
      );
    }
  };

  // Filtrado de usuarios según el término de búsqueda
  const filteredUsuarios = usuarios.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.legajo.toString().toLowerCase().includes(term) ||
      user.nombre.toLowerCase().includes(term) ||
      user.usuario.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Título y Botón de regreso */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-blue-700">
            Panel de Administración
          </h2>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition"
            onClick={() => navigate("/dashboard")}
          >
            ⬅ Volver
          </button>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === "usuarios" ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("usuarios")}
          >
            Usuarios
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === "sistema" ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("sistema")}
          >
            Sistema
          </button>
        </div>

        {/* Sección de Usuarios */}
        {activeTab === "usuarios" && (
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Usuarios Registrados
            </h3>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Input para búsqueda */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-4">Legajo</th>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Usuario</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Rol</th>
                    <th className="py-2 px-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.map((user) => (
                    <tr key={user.legajo} className="border-b border-gray-200">
                      <td className="py-2 px-4">{user.legajo}</td>
                      <td className="py-2 px-4">{user.nombre}</td>
                      <td className="py-2 px-4">{user.usuario}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.rol}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() =>
                            handleUserStatus(user.legajo, user.activo)
                          }
                          className={`px-3 py-1 rounded-md text-white ${
                            user.activo
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {user.activo ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsuarios.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No se encontraron usuarios que coincidan con la búsqueda.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Sección de Sistema */}
        {activeTab === "sistema" && (
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Gestión del Sistema
            </h3>

            {/* Agregar Usuario */}
            <h4 className="font-semibold">Agregar Usuario</h4>
            <form onSubmit={handleAddUser} className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Usuario"
                value={newUser.usuario}
                onChange={(e) =>
                  setNewUser({ ...newUser, usuario: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Nombre"
                value={newUser.nombre}
                onChange={(e) =>
                  setNewUser({ ...newUser, nombre: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="DNI"
                value={newUser.dni}
                onChange={(e) =>
                  setNewUser({ ...newUser, dni: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 border rounded"
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 border rounded"
                type="password"
                placeholder="Contraseña"
                value={newUser.contrasena}
                onChange={(e) =>
                  setNewUser({ ...newUser, contrasena: e.target.value })
                }
                required
              />
              <select
                className="w-full p-2 border rounded"
                value={newUser.rol}
                onChange={(e) =>
                  setNewUser({ ...newUser, rol: e.target.value })
                }
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Agregar Usuario
              </button>
            </form>

            {/* Agregar Categoría */}
            <h4 className="font-semibold mt-6">Agregar Categoría</h4>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Nombre Categoría"
                value={newCategory.nombre}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, nombre: e.target.value })
                }
                required
              />
              <select
                className="w-full p-2 border rounded"
                value={newCategory.tipo}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, tipo: e.target.value })
                }
              >
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Agregar Categoría
              </button>
            </form>

            {/* Agregar Método de Pago */}
            <h4 className="font-semibold mt-6">Agregar Método de Pago</h4>
            <form onSubmit={handleAddPaymentMethod} className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Nombre Método de Pago"
                value={newPaymentMethod.nombre}
                onChange={(e) =>
                  setNewPaymentMethod({
                    ...newPaymentMethod,
                    nombre: e.target.value,
                  })
                }
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Agregar Método de Pago
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
