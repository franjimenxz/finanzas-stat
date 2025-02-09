import React, { useState } from "react";
import { reportIssue } from "../services/api";
import "../styles/feedback.css"; // Importar el CSS unificado

const ReportIssue = () => {
    const [descripcion, setDescripcion] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await reportIssue(token, descripcion);
            setMessage("Problema reportado correctamente");
            setDescripcion("");
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
        </div>
    );
};

export default ReportIssue;
