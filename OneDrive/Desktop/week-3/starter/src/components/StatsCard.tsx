// ============================================
// COMPONENTE: StatsCard
// ============================================

// PARA: Mostrar un resumen de los números más importantes del hotel
// QUÉ: Tarjeta con estadísticas: habitaciones, disponibilidad e ingresos
// IMPACTO: Le da al usuario una vista rápida del estado del hotel

import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

export const StatsCard: React.FC = () => {
  // PARA: Guardar las estadísticas cuando lleguen de la API
  // QUÉ: Estado que empieza vacío y se llena al cargar
  // IMPACTO: Cuando cambia, React vuelve a renderizar el componente
  const [stats, setStats] = useState<Stats | null>(null);

  // PARA: Mostrar "Cargando..." mientras se esperan los datos
  // QUÉ: Estado booleano que empieza en true y pasa a false al terminar
  // IMPACTO: Controla qué se muestra: el spinner o las estadísticas reales
  const [loading, setLoading] = useState<boolean>(true);

  // PARA: Cargar las estadísticas una sola vez cuando el componente aparece
  // QUÉ: useEffect que llama a fetchStats al montar el componente
  // IMPACTO: Sin este efecto, los datos nunca se cargarían
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data); // Guardamos los datos en el estado
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false); // Siempre quitamos el loading, haya error o no
      }
    };

    loadStats();
  }, []); // [] significa: ejecutar solo al montar

  // PARA: No mostrar datos vacíos mientras carga
  // QUÉ: Renderizado condicional mientras loading es true
  // IMPACTO: Mejora la experiencia de usuario
  if (loading) {
    return (
      <div className="stats-card">
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2>📊 Estadísticas del Hotel</h2>

      <div className="stats-grid">
        {/* Total de habitaciones en el hotel */}
        <div className="stat">
          <div className="stat-value">{stats?.total}</div>
          <div className="stat-label">Total Habitaciones</div>
        </div>

        {/* Habitaciones que están libres ahora */}
        <div className="stat">
          <div className="stat-value">{stats?.active}</div>
          <div className="stat-label">Disponibles</div>
        </div>

        {/* Porcentaje de habitaciones disponibles */}
        <div className="stat">
          <div className="stat-value">{stats?.percentage}%</div>
          <div className="stat-label">Disponibilidad</div>
        </div>

        {/* Cuántas reservas se hicieron hoy */}
        <div className="stat">
          <div className="stat-value">{stats?.reservationsToday}</div>
          <div className="stat-label">Reservas Hoy</div>
        </div>

        {/* Ingresos del día formateados en pesos colombianos */}
        <div className="stat">
          <div className="stat-value">
            ${stats?.revenue.toLocaleString('es-CO')}
          </div>
          <div className="stat-label">Ingresos del Día</div>
        </div>
      </div>
    </div>
  );
};