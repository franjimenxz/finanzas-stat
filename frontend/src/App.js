import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
import AdminDashboard from "./pages/Admin"; // Importa el panel de admin
import Layout from "./components/Layout";
import ProtectedRoute from "./components/proteccion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 🌎 Rutas públicas con Navbar y Footer */}
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

        {/* 🔒 Rutas protegidas para usuarios comunes */}
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

        {/* 🔒 Rutas protegidas SOLO PARA ADMINISTRADORES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard /> {/* 📌 Renderiza directamente el panel de Admin */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
