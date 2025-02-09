import React, { useEffect, useState } from "react";
import { getHistory } from "../services/api";

const History = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No hay token de autenticación");
                return;
            }

            try {
                const response = await getHistory(token);
                setHistory(response);
            } catch (error) {
                setError("Error al obtener historial");
            }
        };
        fetchHistory();
    }, []);

    return (
        <div>
            <h2>Historial</h2>
            {error && <p>{error}</p>}
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item.descripcion} - ${item.importe}</li>
                ))}
            </ul>
        </div>
    );
};

export default History;
