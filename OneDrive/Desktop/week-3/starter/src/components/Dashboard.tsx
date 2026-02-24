// ============================================
// COMPONENTE: Dashboard (Principal)
// ============================================

// PARA: Ser el contenedor principal que une todos los componentes
// QUÉ: Layout que organiza StatsCard, RealTimeIndicator e ItemList en pantalla
// IMPACTO: Es lo primero que ve el usuario al abrir la app

import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Encabezado con el título de la plataforma */}
      <header className="dashboard-header">
        <h1>🏨 Dashboard - Plataforma de Reservas Hoteleras</h1>
        {/* Botón para recargar todos los datos manualmente */}
        <button onClick={() => window.location.reload()}>🔄 Refrescar</button>
      </header>

      <main className="dashboard-main">
        {/* Sección de estadísticas generales del hotel */}
        <section className="dashboard-section">
          <StatsCard />
        </section>

        {/* Sección con la ocupación que se actualiza sola cada 5 segundos */}
        <section className="dashboard-section">
          <RealTimeIndicator />
        </section>

        {/* Sección con la lista completa de habitaciones */}
        <section className="dashboard-section dashboard-list">
          <ItemList />
        </section>
      </main>

      {/* Pie de página con el año actual */}
      <footer className="dashboard-footer">
        <p>Reservas Hoteleras - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};