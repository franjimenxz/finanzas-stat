import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { getUser } from "../services/auth"; // Obtiene el usuario autenticado
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
  const [user, setUser] = useState("Cargando..."); // Estado inicial del usuario

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    // Obtener el usuario autenticado desde el token
    const userData = getUser(token); // No necesita `await`
    setUser(userData.usuario);

    // Obtener datos del Dashboard
    getDashboard(token)
      .then(setDashboardData)
      .catch(() => setError("Error al obtener datos del dashboard"));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!dashboardData) return <p className="loading">Cargando...</p>;

  const ingresosLabels = dashboardData.ingresos_por_categoria?.map((item) => item.categoria) || [];
  const ingresosValues = dashboardData.ingresos_por_categoria?.map((item) => item.total) || [];

  const ingresosChartData = {
    labels: ingresosLabels,
    datasets: [
      {
        label: "Ingresos por Categoría",
        data: ingresosValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const egresosLabels = dashboardData.egresos_por_categoria?.map((item) => item.categoria) || [];
  const egresosValues = dashboardData.egresos_por_categoria?.map((item) => item.total) || [];

  const egresosChartData = {
    labels: egresosLabels,
    datasets: [
      {
        label: "Egresos por Categoría",
        data: egresosValues,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Ingresos Totales", "Egresos Totales"],
    datasets: [
      {
        data: [dashboardData.ingresos_totales, dashboardData.egresos_totales],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div className="user-info">
          <span className="user-name">{user}</span> {/* Muestra el nombre del usuario */}
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card red">
          <h3>Ingresos Totales</h3>
          <p>${dashboardData.ingresos_totales}</p>
        </div>
        <div className="summary-card orange">
          <h3>Egresos Totales</h3>
          <p>${dashboardData.egresos_totales}</p>
        </div>
        <div className="summary-card blue">
          <h3>Saldo</h3>
          <p>${dashboardData.ingresos_totales - dashboardData.egresos_totales}</p>
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
