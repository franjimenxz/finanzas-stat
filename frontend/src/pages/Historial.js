import React, { useEffect, useState } from "react";
import { getHistory, deleteIncome, deleteExpense } from "../services/api"; // Asegúrate de que los endpoints existen
import "../styles/historial.css"; // Importar los estilos

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
        setIngresos(ingresos.filter((item) => item.codigo !== id)); // Actualiza la lista después de eliminar
      } else if (type === "egreso") {
        await deleteExpense(token, id);
        setEgresos(egresos.filter((item) => item.codigo !== id));
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      setError("Error al eliminar el elemento");
    }
  };

  return (
    <div className="history-container">
      <h2>Historial de Ingresos y Egresos</h2>
      {error && <p className="no-data">{error}</p>}

      {/* Tabla de Ingresos */}
      <div>
        <h3 className="section-title">Ingresos</h3>
        {ingresos.length === 0 ? (
          <p className="no-data">No hay ingresos registrados.</p>
        ) : (
          <table className="history-table">
            <thead className="ingresos-header">
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Importe</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((item, index) => (
                <tr key={index}>
                  <td>{item.fecha}</td>
                  <td>{item.descripcion}</td>
                  <td>${item.importe}</td>
                  <td>{item.categoria}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete("ingreso", item.codigo)}>
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tabla de Egresos */}
      <div>
        <h3 className="section-title">Egresos</h3>
        {egresos.length === 0 ? (
          <p className="no-data">No hay egresos registrados.</p>
        ) : (
          <table className="history-table">
            <thead className="egresos-header">
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Importe</th>
                <th>Categoría</th>
                <th>Método de Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {egresos.map((item, index) => (
                <tr key={index}>
                  <td>{item.fecha}</td>
                  <td>{item.descripcion}</td>
                  <td>${item.importe}</td>
                  <td>{item.categoria}</td>
                  <td>{item.metodo_pago}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete("egreso", item.codigo)}>
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;
