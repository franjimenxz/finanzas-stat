import React from "react";
import "../styles/landing.css";

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Sección Hero */}
            <header className="hero">
                <div className="hero-content">
                    <h1>Toma el control de tus finanzas sin complicaciones</h1>
                    <p>
                        Organiza, monitorea y gestiona tus ingresos y egresos de manera sencilla.
                        Nuestra plataforma te ofrece información detallada y soporte administrativo
                        para alcanzar la libertad financiera total.
                    </p>
                </div>
                <img src="https://via.placeholder.com/400x300" alt="Finanzas STATS" className="hero-image" />
            </header>

            {/* Sección Nosotros */}
            <section id="nosotros" className="section">
                <h2>Nosotros</h2>
                <p>
                    Somos una plataforma diseñada para facilitar la administración de las finanzas personales.
                    Nuestro objetivo es empoderar a los usuarios a tomar decisiones financieras informadas.
                </p>
            </section>

            {/* Sección Equipo */}
            <section id="equipo" className="section">
                <h2>Equipo</h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Miembro 1" />
                        <h3>Ana Pérez</h3>
                        <p>CEO & Fundadora</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Miembro 2" />
                        <h3>Carlos Gómez</h3>
                        <p>CTO & Ingeniero de Software</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150" alt="Miembro 3" />
                        <h3>Lucía Fernández</h3>
                        <p>Especialista en Finanzas</p>
                    </div>
                </div>
            </section>

            {/* Sección Servicios */}
            <section id="servicios" className="section">
                <h2>Servicios</h2>
                <div className="services-container">
                    <div className="service">
                        <h3>Gestión de Ingresos y Egresos</h3>
                        <p>Registra y administra tus movimientos financieros de forma eficiente.</p>
                    </div>
                    <div className="service">
                        <h3>Reportes Financieros</h3>
                        <p>Accede a gráficos detallados y reportes sobre tus gastos e ingresos.</p>
                    </div>
                    <div className="service">
                        <h3>Soporte y Consultoría</h3>
                        <p>Recibe asesoramiento financiero y resuelve tus dudas con nuestro equipo.</p>
                    </div>
                </div>
            </section>

            {/* Sección Partners */}
            <section id="partners" className="section">
                <h2>Partners</h2>
                <div className="partners-container">
                    <img src="https://via.placeholder.com/120" alt="Partner 1" />
                    <img src="https://via.placeholder.com/120" alt="Partner 2" />
                    <img src="https://via.placeholder.com/120" alt="Partner 3" />
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2024 STATS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Landing;
