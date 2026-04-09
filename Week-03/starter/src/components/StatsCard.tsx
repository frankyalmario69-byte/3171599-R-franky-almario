import React, { useState, useEffect } from 'react';
import { fetchStats } from '../utils/api';

// ============================================
// COMPONENTE: StatsCard
// Muestra estadísticas clave del hotel
// ============================================

export const StatsCard: React.FC = () => {
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const [checkedIn, setCheckedIn] = useState<number>(0);
  const [confirmedPercentage, setConfirmedPercentage] = useState<number>(0);
  const [loadingTotal, setLoadingTotal] = useState<boolean>(true);
  const [loadingCheckedIn, setLoadingCheckedIn] = useState<boolean>(true);
  const [loadingPercentage, setLoadingPercentage] = useState<boolean>(true);

  // Efecto 1: total de reservas
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingTotal(true);
        const data = await fetchStats();
        if (!mounted) return;
        setTotalReservations(data.totalReservations);
      } catch (err) {
        console.error('Error loading total reservations', err);
      } finally {
        setLoadingTotal(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Efecto 2: habitaciones ocupadas (checked-in)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingCheckedIn(true);
        const data = await fetchStats();
        if (!mounted) return;
        setCheckedIn(data.checkedIn);
      } catch (err) {
        console.error('Error loading checkedIn', err);
      } finally {
        setLoadingCheckedIn(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Efecto 3: porcentaje confirmadas + en curso
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingPercentage(true);
        const data = await fetchStats();
        if (!mounted) return;
        setConfirmedPercentage(data.confirmedPercentage);
      } catch (err) {
        console.error('Error loading confirmedPercentage', err);
      } finally {
        setLoadingPercentage(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const loading = loadingTotal || loadingCheckedIn || loadingPercentage;
  if (loading) {
    return (
      <div className="stats-card">
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2>Estadísticas del Hotel</h2>

      <div className="stats-grid">
        <div className="stat">
          <div className="stat-value">{totalReservations}</div>
          <div className="stat-label">Total de Reservas</div>
        </div>

        <div className="stat">
          <div className="stat-value">{checkedIn}</div>
          <div className="stat-label">Huéspedes en el Hotel</div>
        </div>

        <div className="stat">
          <div className="stat-value">{confirmedPercentage}%</div>
          <div className="stat-label">Confirmadas + En Curso</div>
        </div>
      </div>
    </div>
  );
};
