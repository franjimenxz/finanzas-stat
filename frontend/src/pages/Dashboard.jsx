import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { getUser } from "../services/auth";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState("Cargando...");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  useEffect(() => {
    fetchData();
  }, [fechaSeleccionada]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    try {
      const userData = await getUser(token);
      setUser(userData.usuario || "Usuario");

      const response = await getDashboard(token, fechaSeleccionada);
      setDashboardData(response);
    } catch (err) {
      setError("Error al obtener datos del dashboard");
    }
  };

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!dashboardData) return <p className="text-center mt-8">Cargando...</p>;

  // Datos para gráficos de barras y pastel
  const ingresosLabels = dashboardData.ingresos_por_categoria?.map(
    (item) => item.categoria
  ) || [];
  const ingresosValues =
    dashboardData.ingresos_por_categoria?.map((item) => item.total) || [];
  const egresosLabels = dashboardData.egresos_por_categoria?.map(
    (item) => item.categoria
  ) || [];
  const egresosValues =
    dashboardData.egresos_por_categoria?.map((item) => item.total) || [];

  const ingresosChartData = {
    labels: ingresosLabels.length ? ingresosLabels : ["Sin datos"],
    datasets: [
      {
        label: "Ingresos por Categoría",
        data: ingresosValues.length ? ingresosValues : [0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const egresosChartData = {
    labels: egresosLabels.length ? egresosLabels : ["Sin datos"],
    datasets: [
      {
        label: "Egresos por Categoría",
        data: egresosValues.length ? egresosValues : [0],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Procesamiento de datos para el gráfico de líneas comparativo
  const getLineChartData = () => {
    const ingresos = dashboardData.ingresos_mensuales || [];
    const egresos = dashboardData.egresos_mensuales || [];

    // Reunir meses únicos en formato "YYYY-MM"
    const monthSet = new Set();
    ingresos.forEach((item) => {
      monthSet.add(`${item.year}-${String(item.month).padStart(2, "0")}`);
    });
    egresos.forEach((item) => {
      monthSet.add(`${item.year}-${String(item.month).padStart(2, "0")}`);
    });
    const labels = Array.from(monthSet).sort();

    const ingresosData = labels.map((label) => {
      const [year, month] = label.split("-");
      const found = ingresos.find(
        (item) =>
          item.year.toString() === year &&
          String(item.month).padStart(2, "0") === month
      );
      return found ? found.total : 0;
    });

    const egresosData = labels.map((label) => {
      const [year, month] = label.split("-");
      const found = egresos.find(
        (item) =>
          item.year.toString() === year &&
          String(item.month).padStart(2, "0") === month
      );
      return found ? found.total : 0;
    });

    return {
      labels,
      datasets: [
        {
          label: "Ingresos Mensuales",
          data: ingresosData,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.2)",
          fill: false,
        },
        {
          label: "Egresos Mensuales",
          data: egresosData,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          fill: false,
        },
      ],
    };
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado y filtro */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Bievenido!
          </h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="fecha" className="text-gray-600 font-medium">
              Seleccionar fecha:
            </label>
            <input
              id="fecha"
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Resumen Financiero */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-green-700">
              Ingresos Totales
            </h3>
            <p className="text-2xl font-bold text-green-800">
              ${dashboardData.ingresos_totales || 0}
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-red-700">
              Egresos Totales
            </h3>
            <p className="text-2xl font-bold text-red-800">
              ${dashboardData.egresos_totales || 0}
            </p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-blue-700">Saldo</h3>
            <p className="text-2xl font-bold text-blue-800">
              ${dashboardData.balance || 0}
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-yellow-700">
              Mayor Gasto
            </h3>
            <p className="text-2xl font-bold text-yellow-800">
              ${dashboardData.gasto_mas_alto_mes || 0}
            </p>
          </div>
        </div>

        {/* Primera fila de gráficos: Barras */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Ingresos por Categoría
            </h3>
            <div className="h-64">
              <Bar
                data={ingresosChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Egresos por Categoría
            </h3>
            <div className="h-64">
              <Bar
                data={egresosChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        {/* Segunda fila de gráficos: Comparación General y Evolución Mensual lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Comparación General
            </h3>
            <div className="h-64">
              <Pie
                data={{
                  labels: ["Ingresos Totales", "Egresos Totales"],
                  datasets: [
                    {
                      data: [
                        dashboardData.ingresos_totales || 0,
                        dashboardData.egresos_totales || 0,
                      ],
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(255, 99, 132, 0.6)",
                      ],
                    },
                  ],
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Evolución Mensual
            </h3>
            <div className="h-64">
              {getLineChartData() ? (
                <Line
                  data={getLineChartData()}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              ) : (
                <p className="text-center text-gray-600">
                  No hay datos suficientes para mostrar el gráfico de evolución.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
