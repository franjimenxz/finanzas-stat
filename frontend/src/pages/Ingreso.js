// src/pages/Ingreso.js
import React, { useState, useEffect } from "react";
import { addIncome, getCategories } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/transactions.css";
const Ingreso = () => {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [idcategoria, setIdcategoria] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cargar categorías del tipo "ingreso" al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getCategories(token, "ingreso");
        // Suponemos que la respuesta tiene la forma: { categories: [ {id, nombre}, ... ] }
        setCategories(response.categories);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setError("Error al obtener categorías");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const data = await addIncome(token, descripcion, importe, idcategoria);
      console.log("Ingreso registrado:", data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registrando ingreso:", err);
      setError(err.message || "Error al registrar ingreso");
    }
  };

  return (
    <div className="ingreso-container">
      <h2>Registrar Ingreso</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Importe"
          value={importe}
          onChange={(e) => setImporte(e.target.value)}
          required
        />
        <select
          value={idcategoria}
          onChange={(e) => setIdcategoria(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Registrar Ingreso</button>
      </form>
    </div>
  );
};

export default Ingreso;
