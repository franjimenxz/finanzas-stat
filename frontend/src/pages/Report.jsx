import React, { useState } from "react";
import { reportIssue } from "../services/api";

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
      </div>
    </div>
  );
};

export default ReportIssue;
