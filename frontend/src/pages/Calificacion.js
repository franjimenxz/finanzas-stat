import React, { useState } from "react";
import { sendRating } from "../services/api";

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
        <div>
            <h2>Califica el sistema</h2>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => setRating(star)} style={{ cursor: "pointer", color: rating >= star ? "gold" : "gray" }}>★</span>
            ))}
            <button onClick={handleSubmit}>Enviar</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RateSystem;
