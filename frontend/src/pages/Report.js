import React, { useState } from "react";
import { reportIssue } from "../services/api";

const ReportIssue = () => {
    const [descripcion, setDescripcion] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await reportIssue(token, descripcion);
            setMessage("Problema reportado correctamente");
            setDescripcion("");
        } catch (error) {
            setMessage("Error al enviar el reporte");
        }
    };

    return (
        <div>
            <h2>Reportar Problema</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Describe tu problema..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ReportIssue;
