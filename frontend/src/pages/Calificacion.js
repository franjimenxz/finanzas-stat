import React, { useState } from "react";
import { sendRating } from "../services/api";
import "../styles/feedback.css"; // Importar el CSS unificado

const RateSystem = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        try {
            await sendRating(token, rating);
            setMessage("Gracias por tu calificación");
        } catch (error) {
            setMessage("Error al enviar calificación");
        }
    };

    return (
        <div className="feedback-container">
            <h2>Califica el sistema</h2>
            <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`star ${rating >= star ? "gold" : "gray"}`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button onClick={handleSubmit}>Enviar Calificación</button>
            {message && <p className={message.includes("Error") ? "error-message" : "feedback-message"}>{message}</p>}
        </div>
    );
};

export default RateSystem;
