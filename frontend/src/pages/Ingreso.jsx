import React, { useState, useEffect } from "react";
import { addIncome, getCategories } from "../services/api";
import { useNavigate } from "react-router-dom";

const Ingreso = () => {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [idcategoria, setIdcategoria] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getCategories(token, "ingreso");
        setCategories(response.categories || []);
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
      await addIncome(token, descripcion, importe, idcategoria);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registrando ingreso:", err);
      setError(err.message || "Error al registrar ingreso");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Registrar Ingreso
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-md text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Descripción
            </label>
            <input
              type="text"
              placeholder="Ej: Pago de freelance"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Importe */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Importe
            </label>
            <input
              type="number"
              placeholder="Ej: 1500"
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Categoría
            </label>
            <select
              value={idcategoria}
              onChange={(e) => setIdcategoria(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-500 transition-all"
          >
            Registrar Ingreso
          </button>
        </form>
      </div>
    </div>
  );
};

export default Ingreso;
