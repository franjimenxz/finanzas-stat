import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No hay token de autenticación");
                return;
            }

            try {
                const response = await getDashboard(token);
                setData(response);
            } catch (error) {
                setError("Error al obtener datos del dashboard");
            }
        };
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;
    if (!data) return <p>Cargando...</p>;

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Ingresos: ${data.ingresos_totales}</p>
            <p>Total Egresos: ${data.egresos_totales}</p>
            <p>Saldo: ${data.ingresos_totales - data.egresos_totales}</p>
        </div>
    );
};

export default Dashboard;
