import React, { useState, useEffect } from "react";
import { reportIssue, getUserTickets } from "../services/api";

const ReportIssue = () => {
  const [descripcion, setDescripcion] = useState("");
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await getUserTickets(token);
      console.log("Tickets obtenidos desde API:", data);
      setTickets(data.tickets || []);
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
      setMessage(" Problema reportado correctamente");
      setDescripcion("");
      fetchTickets();
    } catch (error) {
      setMessage(" Error al enviar el reporte");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Reportar Problema
        </h2>

        {/* Mensajes de éxito/error */}
        {message && (
          <p
            className={`text-center p-3 rounded-md font-semibold ${
              message.includes("Error")
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {message}
          </p>
        )}

        {/* Formulario de reporte */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Describe tu problema..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="w-full h-28 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md shadow-md transition-all"
          >
            Enviar Reporte
          </button>
        </form>

        {/* Estado de problemas reportados */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-8">
           Estado de Problemas Reportados
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 mt-4">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-600 mt-4">{error}</p>
        ) : tickets.length > 0 ? (
          <ul className="space-y-4 mt-6">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md border-l-4 border-blue-600 flex flex-col gap-2"
              >
                <strong className="text-gray-800">{ticket.subject || "Problema"}</strong>
                <p className="text-gray-600">{ticket.description || "Sin descripción"}</p>
                <span
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${
                    ticket.status.toLowerCase() === "resuelto"
                      ? "bg-green-100 text-green-700"
                      : ticket.status.toLowerCase() === "pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 mt-4">No hay problemas reportados.</p>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;
