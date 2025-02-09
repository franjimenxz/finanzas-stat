import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { getUser } from "../services/auth";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "../styles/dashboard.css"; // Importar estilos

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState("Cargando...");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(""); // 📌 Estado para la fecha

  useEffect(() => {
    fetchData();
  }, [fechaSeleccionada]); // 📌 Recargar datos cuando cambie la fecha

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    try {
      // Obtener usuario autenticado
      const userData = await getUser(token);
      setUser(userData.usuario || "Usuario");

      // Obtener datos del Dashboard con la fecha seleccionada
      const response = await getDashboard(token, fechaSeleccionada);
      console.log("Datos recibidos de /api/dashboard:", response);
      setDashboardData(response);
    } catch (err) {
      setError("Error al obtener datos del dashboard");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!dashboardData) return <p className="loading">Cargando...</p>;

  const ingresosLabels = dashboardData.ingresos_por_categoria?.map((item) => item.categoria) || [];
  const ingresosValues = dashboardData.ingresos_por_categoria?.map((item) => item.total) || [];
  const egresosLabels = dashboardData.egresos_por_categoria?.map((item) => item.categoria) || [];
  const egresosValues = dashboardData.egresos_por_categoria?.map((item) => item.total) || [];

  const ingresosChartData = {
    labels: ingresosLabels.length ? ingresosLabels : ["Sin datos"],
    datasets: [{ label: "Ingresos por Categoría", data: ingresosValues.length ? ingresosValues : [0], backgroundColor: "rgba(75, 192, 192, 0.6)" }],
  };

  const egresosChartData = {
    labels: egresosLabels.length ? egresosLabels : ["Sin datos"],
    datasets: [{ label: "Egresos por Categoría", data: egresosValues.length ? egresosValues : [0], backgroundColor: "rgba(255, 99, 132, 0.6)" }],
  };

  const pieData = {
    labels: ["Ingresos Totales", "Egresos Totales"],
    datasets: [{ data: [dashboardData.ingresos_totales || 0, dashboardData.egresos_totales || 0], backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"] }],
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div className="user-info">
          <span className="user-name">{user}</span>
        </div>
      </div>

      {/* 📌 Selector de fecha */}
      <label>Filtrar por Fecha:</label>
      <input
        type="date"
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.target.value)}
      />

      <div className="dashboard-summary">
        <div className="summary-card red">
          <h3>Ingresos Totales</h3>
          <p>${dashboardData.ingresos_totales || 0}</p>
        </div>
        <div className="summary-card orange">
          <h3>Egresos Totales</h3>
          <p>${dashboardData.egresos_totales || 0}</p>
        </div>
        <div className="summary-card blue">
          <h3>Saldo</h3>
          <p>${(dashboardData.ingresos_totales || 0) - (dashboardData.egresos_totales || 0)}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Ingresos por Categoría</h3>
          <Bar data={ingresosChartData} options={{ responsive: true }} />
        </div>

        <div className="chart-box">
          <h3>Egresos por Categoría</h3>
          <Bar data={egresosChartData} options={{ responsive: true }} />
        </div>

        <div className="chart-box">
          <h3>Comparación General</h3>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
