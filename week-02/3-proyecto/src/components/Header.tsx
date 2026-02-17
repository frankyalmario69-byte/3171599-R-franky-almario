/**
 * COMPONENTE: Header
 *
 * Este componente muestra el título y la descripción de la aplicación.
 * Lo adaptamos al dominio de Reservas Hoteleras.
 */

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* QUÉ: Aquí pongo el título principal de la app */}
      {/* PARA: Que el usuario sepa de qué trata el sistema */}
      {/* IMPACTO: Da identidad y contexto al proyecto */}
      <h1>🏨 Sistema de Reservas Hoteleras</h1>

      {/* QUÉ: Texto que explica un poco más la app */}
      {/* PARA: Que el usuario entienda qué puede hacer aquí */}
      {/* IMPACTO: Hace que la app se vea más clara y profesional */}
      <p>
        Gestiona reservas de habitaciones, clientes y disponibilidad en tiempo real.
      </p>

      {/* QUÉ: Lista con información extra */}
      {/* PARA: Mostrar algunas funciones que tiene el sistema */}
      {/* IMPACTO: Ayuda a que el usuario vea lo que puede hacer */}
      <ul>
        <li>📅 Crea y administra reservas fácilmente</li>
      </ul>

      {/* QUÉ: Texto pequeño al final */}
      {/* PARA: Dar un detalle técnico de cómo está hecho */}
      {/* IMPACTO: Refuerza que usamos React + TypeScript */}
      <small>
        Desarrollado con React + TypeScript.
      </small>
    </header>
  );
};

export default Header;
