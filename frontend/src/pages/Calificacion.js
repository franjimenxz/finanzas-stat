import React, { useState, useEffect } from "react";
import { sendRating, getUserRating } from "../services/api"; // Nueva función para obtener calificación existente
import "../styles/feedback.css";

const RateSystem = () => {
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState("");
    const [message, setMessage] = useState("");
    const [yaCalificado, setYaCalificado] = useState(false); // Bloquea si el usuario ya calificó

    useEffect(() => {
        const fetchUserRating = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await getUserRating(token); // Obtiene si el usuario ya calificó
                if (response.rating) {
                    setRating(response.rating);
                    setComentario(response.comentario || "");
                    setYaCalificado(true); // Bloquea la nueva calificación
                }
            } catch (error) {
                console.error("Error al obtener la calificación previa", error);
            }
        };
        fetchUserRating();
    }, []);

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!rating) {
            setMessage("Por favor, selecciona una calificación.");
            return;
        }

        try {
            await sendRating(token, rating, comentario);
            setMessage("Gracias por tu calificación.");
            setYaCalificado(true); // Bloquea la nueva calificación
        } catch (error) {
            setMessage("Error al enviar calificación.");
        }
    };

    return (
        <div className="feedback-container">
            <h2>Califica el sistema</h2>
            <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => !yaCalificado && setRating(star)}
                        className={`star ${rating >= star ? "gold" : "gray"} ${yaCalificado ? "disabled" : ""}`}
                    >
                        ★
                    </span>
                ))}
            </div>

            <textarea
                placeholder="Deja un comentario..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="comment-box"
                disabled={yaCalificado} // Bloquea si ya calificó
            />

            <button onClick={handleSubmit} disabled={yaCalificado}>
                {yaCalificado ? "Calificación enviada" : "Enviar Calificación"}
            </button>

            {message && <p className={message.includes("Error") ? "error-message" : "feedback-message"}>{message}</p>}
        </div>
    );
};

export default RateSystem;
