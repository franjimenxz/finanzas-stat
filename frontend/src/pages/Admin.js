import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 📌 Importar useNavigate
import { getAdminDashboard, addUser, deleteUser, addCategory, addPaymentMethod } from "../services/api";
import "../styles/admin.css";

const AdminDashboard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [newUser, setNewUser] = useState({ usuario: "", nombre: "", dni: "", email: "", contrasena: "", rol: "usuario" });
    const [newCategory, setNewCategory] = useState({ nombre: "", tipo: "ingreso" });
    const [newPaymentMethod, setNewPaymentMethod] = useState({ nombre: "" });

    const navigate = useNavigate(); // 📌 Hook para navegación

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await getAdminDashboard(token);
            setUsuarios(response.usuarios);
        } catch (err) {
            setError("Acceso denegado o error al cargar usuarios.");
        }
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard"); // 📌 Redirigir al Dashboard
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await addUser(token, newUser);
            fetchAdminData();
            setNewUser({ usuario: "", nombre: "", dni: "", email: "", contrasena: "", rol: "usuario" });
        } catch (err) {
            setError("Error al agregar usuario.");
        }
    };

    const handleDeleteUser = async (legajo) => {
        const token = localStorage.getItem("token");
        try {
            await deleteUser(token, legajo);
            fetchAdminData();
        } catch (err) {
            setError("Error al eliminar usuario.");
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await addCategory(token, newCategory);
            setNewCategory({ nombre: "", tipo: "ingreso" });
        } catch (err) {
            setError("Error al agregar categoría.");
        }
    };

    const handleAddPaymentMethod = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await addPaymentMethod(token, newPaymentMethod);
            setNewPaymentMethod({ nombre: "" });
        } catch (err) {
            setError("Error al agregar método de pago.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Panel de Administración</h2>
            {error && <p className="error">{error}</p>}

            {/* 📌 Botón para volver al Dashboard */}
            <button className="back-btn" onClick={handleBackToDashboard}>Volver al Dashboard</button>

            {/* Formulario para agregar usuario */}
            <h3>Agregar Usuario</h3>
            <form onSubmit={handleAddUser} className="admin-form">
                <input type="text" placeholder="Usuario" value={newUser.usuario} onChange={(e) => setNewUser({ ...newUser, usuario: e.target.value })} required />
                <input type="text" placeholder="Nombre" value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} required />
                <input type="text" placeholder="DNI" value={newUser.dni} onChange={(e) => setNewUser({ ...newUser, dni: e.target.value })} required />
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                <input type="password" placeholder="Contraseña" value={newUser.contrasena} onChange={(e) => setNewUser({ ...newUser, contrasena: e.target.value })} required />
                <select value={newUser.rol} onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}>
                    <option value="usuario">Usuario</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Agregar Usuario</button>
            </form>

            {/* Tabla de Usuarios */}
            <h3>Usuarios Registrados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Legajo</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((user) => (
                        <tr key={user.legajo}>
                            <td>{user.legajo}</td>
                            <td>{user.nombre}</td>
                            <td>{user.usuario}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteUser(user.legajo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulario para agregar método de pago */}
            <h3>Agregar Método de Pago</h3>
            <form onSubmit={handleAddPaymentMethod} className="admin-form">
                <input 
                    type="text" 
                    placeholder="Nombre del Método de Pago" 
                    value={newPaymentMethod.nombre} 
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, nombre: e.target.value })} 
                    required 
                />
                <button type="submit">Agregar Método de Pago</button>
            </form>

            {/* Formulario para agregar categoría */}
            <h3>Agregar Categoría</h3>
            <form onSubmit={handleAddCategory} className="admin-form">
                <input type="text" placeholder="Nombre de la Categoría" value={newCategory.nombre} onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })} required />
                <select value={newCategory.tipo} onChange={(e) => setNewCategory({ ...newCategory, tipo: e.target.value })}>
                    <option value="ingreso">Ingreso</option>
                    <option value="egreso">Egreso</option>
                </select>
                <button type="submit">Agregar Categoría</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
