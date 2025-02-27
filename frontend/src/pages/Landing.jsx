import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import personal1 from "../assets/images/personal1.jpg";
import personal2 from "../assets/images/personal2.jpg";
import globant from "../assets/images/globant.png";
import meli from "../assets/images/meli.png";
import accenture from "../assets/images/accenture.jpg";
import mostaza from "../assets/images/mostaza.png";
import utn from "../assets/images/utn.png";

const Landing = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header
        id="hero"
        className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white text-center py-60 px-6"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Toma el control de tus finanzas sin complicaciones
          </h1>
          <p className="mt-4 text-lg">
            Organiza, monitorea y gestiona tus ingresos y egresos de manera
            sencilla.
          </p>
        </div>
      </header>

      {/* Sección Nosotros */}
      <section
        id="nosotros"
        className="max-w-5xl mx-auto px-6 py-32 text-center"
      >
        <h2 className="text-3xl font-bold">Nosotros</h2>
        <p className="mt-4 text-lg">
          Somos una plataforma innovadora para la administración de{" "}
          <strong>finanzas personales</strong>. Nuestra misión es ayudarte a
          alcanzar la estabilidad financiera.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            🚀 <strong>Ana, emprendedora digital:</strong> Redujo gastos en un{" "}
            <strong>25%</strong>.
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            📈 <strong>Javier, estudiante:</strong> Logró ahorrar el{" "}
            <strong>15%</strong>.
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            💼 <strong>Empresa López & Asociados:</strong> Aumentó su
            rentabilidad en un <strong>30%</strong>.
          </div>
        </div>
      </section>

      {/* Sección Equipo */}
      <section id="equipo" className="bg-gray-100 py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                name: "Ana Pérez",
                role: "CEO & Fundadora",
                img: personal1,
              },
              {
                name: "Carlos Gómez",
                role: "CTO & Ingeniero de Software",
                img: personal2,
              },
              {
                name: "Lucía Fernández",
                role: "Especialista en Finanzas",
                img: personal1,
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
                />
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Servicios */}
      <section id="servicios" className="max-w-5xl mx-auto px-6 py-32">
        <h2 className="text-3xl font-bold text-center">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Gestión de Finanzas",
              desc: "Registra y administra tus ingresos y egresos de manera eficiente.",
            },
            {
              title: "Reportes Detallados",
              desc: "Accede a gráficos y reportes financieros en tiempo real.",
            },
            {
              title: "Soporte y Consultoría",
              desc: "Asesoramiento financiero para maximizar tus ganancias.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Partners */}
      <section id="partners" className="bg-gray-200 py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Nuestros Partners</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              globant,
              meli,
              accenture,
              mostaza,
              utn,
            ].map((partner, index) => (
              <img
                key={index}
                src={partner}
                alt="Partner"
                className="w-28 h-14 object-contain"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
