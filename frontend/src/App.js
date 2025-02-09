import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ReportIssue from "./pages/Report";
import RateSystem from "./pages/Calificacion";

const App = () => {
    const [auth, setAuth] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                {/* Pasa la función setAuth al componente Login */}
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/report" element={<ReportIssue />} />
                <Route path="/rate" element={<RateSystem />} />
            </Routes>
        </Router>
    );
};

export default App;
