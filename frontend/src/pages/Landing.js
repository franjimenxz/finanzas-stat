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
                <img src="../assets/images/logo.png" alt="Finanzas STATS" className="hero-image" />
            </header>

            {/* Sección Nosotros */}
<section id="nosotros" className="section">
    <h2>Nosotros</h2>
    <p>
        Somos una plataforma innovadora diseñada para facilitar la administración de las <strong>finanzas personales</strong>.
        Nuestro objetivo es empoderar a los usuarios, brindándoles herramientas intuitivas para tomar decisiones 
        financieras <strong>informadas y estratégicas</strong>.
    </p>
    

    <h3>Casos de Éxito</h3>
    <p><strong>🚀 Ana, emprendedora digital:</strong> Organizó sus finanzas y redujo gastos innecesarios en un <strong>25%</strong>.</p>
    <p><strong>📈 Javier, estudiante universitario:</strong> Estableció límites y logró ahorrar el <strong>15%</strong> de sus ingresos mensuales.</p>
    <p><strong>💼 Empresa López & Asociados:</strong> Optimizó su presupuesto y aumentó su rentabilidad en un <strong>30%</strong>.</p>

    <h3>Nuestra Misión</h3>
    <p>
        Facilitar el control financiero de nuestros usuarios, ayudándolos a lograr estabilidad y crecimiento económico 
        a través de <strong>herramientas inteligentes y accesibles</strong>.
    </p>

    <h3>Únete a nuestra comunidad</h3>
    <p>
        Miles de personas ya han transformado su manera de gestionar sus finanzas. ¿Estás listo para tomar el control 
        de tu economía? <strong>¡Empieza hoy mismo! 🚀</strong>
    </p>
</section>


            {/* Sección Equipo */}
            <section id="equipo" className="section">
                <h2>Equipo</h2>
                <div className="team-container">
                    <div className="team-member">
                        <img src="../assets/images/personal1.jpg" alt="Miembro 1" />
                        <h3>Ana Pérez</h3>
                        <p>CEO & Fundadora</p>
                    </div>
                    <div className="team-member">
                        <img src="../assets/images/personal2.jpg" alt="Miembro 2" />
                        <h3>Carlos Gómez</h3>
                        <p>CTO & Ingeniero de Software</p>
                    </div>
                    <div className="team-member">
                        <img src="../assets/images/personal1.jpg" alt="Miembro 3" />
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
                    <img src="../assets/images/globant.png" alt="Partner 1" />
                    <img src="../assets/images/meli.png" alt="Partner 2" />
                    <img src="../assets/images/accenture.jpg" alt="Partner 3" />
                    <img src="../assets/images/mostaza.png" alt="Partner 4" />
                    <img src="../assets/images/mcdoanld.jpg" alt="Partner 5" />
                    <img src="../assets/images/utn.png" alt="Partner 6" />
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
