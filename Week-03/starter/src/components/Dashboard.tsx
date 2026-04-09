import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

// ============================================
// COMPONENTE: Dashboard (Principal)
// Dominio: Sistema de Reservas Hoteleras
// ============================================

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard - Reservas Hoteleras</h1>
      </header>

      <main className="dashboard-main">
        {/* Sección de estadísticas */}
        <section className="dashboard-section">
          <StatsCard />
        </section>

        {/* Sección de datos en tiempo real */}
        <section className="dashboard-section">
          <RealTimeIndicator />
        </section>

        {/* Sección de lista principal */}
        <section className="dashboard-section dashboard-list">
          <ItemList />
        </section>
      </main>
    </div>
  );
};
