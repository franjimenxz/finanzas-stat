// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ingreso from "./pages/Ingreso";
import Egreso from "./pages/Egreso";
import Historial from "./pages/Historial";
import ReportIssue from "./pages/Report";
import RateSystem from "./pages/Calificacion";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/proteccion";
import Navbar from "./components/Navbar"; // Importa el Navbar
import Footer from "./components/Footer"; // Importa el Footer

const App = () => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas con Navbar y Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Landing />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login setAuth={setAuth} />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        {/* Rutas protegidas SIN Navbar y Footer */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout setAuth={setAuth} />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ingreso" element={<Ingreso />} />
          <Route path="egreso" element={<Egreso />} />
          <Route path="historial" element={<Historial />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="calificar" element={<RateSystem />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
