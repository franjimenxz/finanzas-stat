import React, { useEffect, useState } from "react";
import { getHistory, deleteIncome, deleteExpense, downloadHistoryPDF } from "../services/api";

const History = () => {
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    try {
      const response = await getHistory(token);
      console.log("Respuesta de getHistory:", response);
      setIngresos(response.ingresos || []);
      setEgresos(response.egresos || []);
    } catch (error) {
      setError("Error al obtener historial");
    }
  };

  const handleDelete = async (type, id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    try {
      if (type === "ingreso") {
        await deleteIncome(token, id);
        setIngresos(ingresos.filter((item) => item.codigo !== id));
      } else if (type === "egreso") {
        await deleteExpense(token, id);
        setEgresos(egresos.filter((item) => item.codigo !== id));
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError("Error al eliminar el elemento");
    }
  };

  const handleDownloadPDF = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }
    await downloadHistoryPDF(token);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700">Historial de Finanzas</h2>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 transition w-40"
          >
            📥 Descargar PDF
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Tabla de Ingresos */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-700">Ingresos</h3>
          {ingresos.length === 0 ? (
            <p className="text-gray-600 text-center mt-2">No hay ingresos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 mt-3">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="py-2 px-4">Fecha</th>
                    <th className="py-2 px-4">Descripción</th>
                    <th className="py-2 px-4">Importe</th>
                    <th className="py-2 px-4">Categoría</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ingresos.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-center">{item.fecha}</td>
                      <td className="py-2 px-4">{item.descripcion}</td>
                      <td className="py-2 px-4 text-green-600 font-semibold">${item.importe}</td>
                      <td className="py-2 px-4">{item.categoria}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleDelete("ingreso", item.codigo)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tabla de Egresos */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-700">Egresos</h3>
          {egresos.length === 0 ? (
            <p className="text-gray-600 text-center mt-2">No hay egresos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 mt-3">
                <thead className="bg-red-700 text-white">
                  <tr>
                    <th className="py-2 px-4">Fecha</th>
                    <th className="py-2 px-4">Descripción</th>
                    <th className="py-2 px-4">Importe</th>
                    <th className="py-2 px-4">Categoría</th>
                    <th className="py-2 px-4">Método de Pago</th>
                    <th className="py-2 px-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {egresos.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-center">{item.fecha}</td>
                      <td className="py-2 px-4">{item.descripcion}</td>
                      <td className="py-2 px-4 text-red-600 font-semibold">${item.importe}</td>
                      <td className="py-2 px-4">{item.categoria}</td>
                      <td className="py-2 px-4">{item.metodo_pago}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleDelete("egreso", item.codigo)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
