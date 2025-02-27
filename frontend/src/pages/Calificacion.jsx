import React, { useState } from "react";
import { sendReview } from "../services/api";

const RateSystem = () => {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [message, setMessage] = useState("");
  const [yaCalificado, setYaCalificado] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!rating) {
      setMessage("Por favor, selecciona una calificación.");
      return;
    }

    try {
      console.log(" Enviando review con rating:", rating, "Comentario:", comentario);
      await sendReview(token, rating, comentario);
      setMessage("Gracias por tu calificación.");
      setYaCalificado(true);
    } catch (error) {
      setMessage("Error al enviar calificación.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Califica el Sistema
        </h2>

        {/* Estrellas de calificación */}
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => !yaCalificado && setRating(star)}
              className={`text-3xl transition-all ${
                rating >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-400 hover:scale-105"
              } ${yaCalificado ? "cursor-not-allowed opacity-50" : "hover:text-yellow-500"}`}
              disabled={yaCalificado}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comentario */}
        <textarea
          placeholder="Deja un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          disabled={yaCalificado}
          className="w-full h-24 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />

        {/* Botón de envío */}
        <button
          onClick={handleSubmit}
          disabled={yaCalificado}
          className={`w-full mt-4 py-2 rounded-md shadow-md transition-all text-white font-semibold ${
            yaCalificado
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg"
          }`}
        >
          {yaCalificado ? "Calificación Enviada" : "Enviar Calificación"}
        </button>

        {/* Mensaje de confirmación o error */}
        {message && (
          <p
            className={`mt-4 text-center p-2 rounded-md ${
              message.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RateSystem;
