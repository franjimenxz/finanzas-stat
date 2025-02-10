import React, { useState, useEffect } from "react";
import { reportIssue, getUserTickets } from "../services/api";
import "../styles/feedback.css"; // Importar el CSS unificado

const ReportIssue = () => {
    const [descripcion, setDescripcion] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Obtener los tickets cuando el componente se monta
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await getUserTickets(token);
            console.log("Tickets obtenidos desde API:", data); // 📌 Verifica en la consola del navegador
            setTickets(data.tickets || []); // Asegurar que `tickets` es un array
        } catch (err) {
            setError("Error al obtener los tickets");
        } finally {
            setLoading(false);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await reportIssue(token, descripcion);
            setMessage("Problema reportado correctamente");
            setDescripcion("");
            fetchTickets(); // 🔄 Refrescar la lista de tickets después de enviar uno nuevo
        } catch (error) {
            setMessage("Error al enviar el reporte");
        }
    };

    return (
        <div className="feedback-container report-container">
            <h2>Reportar Problema</h2>
            {message && <p className={message.includes("Error") ? "error-message" : "feedback-message"}>{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Describe tu problema..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <button type="submit">Enviar Reporte</button>
            </form>

            {/* 🔹 Sección para ver los problemas reportados */}
            <h2>Estado de Problemas Reportados</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <ul className="ticket-list">
                    {tickets.length > 0 ? tickets.map((ticket) => (
                        <li key={ticket.id} className="ticket-item">
                            <strong>{ticket.subject || "Problema"}</strong>
                            <p>{ticket.description || "Sin descripción"}</p>
                            <span className={`status ${ticket.status.toLowerCase()}`}>
                                {ticket.status}
                            </span>
                        </li>
                    )) : <p>No hay problemas reportados.</p>}
                </ul>
            )}
        </div>
    );
};

export default ReportIssue;
