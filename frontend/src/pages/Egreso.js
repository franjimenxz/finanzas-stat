import React, { useState, useEffect } from "react";
import { addExpense, getCategories, getPaymentMethods } from "../services/api"; 
import { useNavigate } from "react-router-dom";
import "../styles/transactions.css";

const Egreso = () => {
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [idcategoria, setIdcategoria] = useState("");
  const [idMetodoPago, setIdMetodoPago] = useState("");
  const [categories, setCategories] = useState([]); 
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Cargar categorías de egresos
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getCategories(token, "egreso");
        console.log("Categorías recibidas en React:", response);
        setCategories(response.categories || []); // ✅ Acceder correctamente al array
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setError("Error al obtener categorías");
      }
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchPaymentMethods = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await getPaymentMethods(token);
            console.log("Métodos de pago obtenidos en React:", response);

            // ✅ No es un objeto con `metodos`, sino un array directamente
            if (Array.isArray(response)) {
                setPaymentMethods(response);
            } else {
                console.error("Formato inesperado en métodos de pago:", response);
                setPaymentMethods([]);
            }
        } catch (err) {
            console.error("Error al obtener métodos de pago:", err);
            setError("Error al obtener métodos de pago");
        }
    };
    fetchPaymentMethods();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      const data = await addExpense(token, descripcion, importe, idcategoria, idMetodoPago);
      console.log("Egreso registrado:", data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error registrando egreso:", err);
      setError(err.message || "Error al registrar egreso");
    }
  };

  return (
    <div className="egreso-container">
      <h2>Registrar Egreso</h2>
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

        {/* Selector de categorías */}
        <select
          value={idcategoria}
          onChange={(e) => setIdcategoria(e.target.value)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))
          ) : (
            <option disabled>Cargando categorías...</option>
          )}
        </select>

        {/* Selector de método de pago */}
        <select
          value={idMetodoPago}
          onChange={(e) => setIdMetodoPago(e.target.value)}
          required
        >
          <option value="">Seleccione un método de pago</option>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.nombre}
              </option>
            ))
          ) : (
            <option disabled>Cargando métodos de pago...</option>
          )}
        </select>

        <button type="submit">Registrar Egreso</button>
      </form>
    </div>
  );
};

export default Egreso;
