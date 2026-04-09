import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

// ============================================
// COMPONENTE: RealTimeIndicator
// Muestra habitaciones ocupadas en tiempo real
// ============================================

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRealTimeData();
        if (!mounted) return;
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading real-time data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    loadData();

    const intervalId = setInterval(() => {
      loadData();
    }, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const formatTimestamp = (isoString: string): string => {
    try {
      return new Date(isoString).toLocaleString();
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>Cargando datos en tiempo real...</h2>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>Ocupación en Tiempo Real</h2>
        {isUpdating && (
          <span className="updating-badge">Actualizando...</span>
        )}
      </div>

      <div className="realtime-content">
        <div className="realtime-value" style={{ fontSize: 28, fontWeight: '700' }}>
          {data.value} {data.unit}
        </div>

        <div className="realtime-label" style={{ opacity: 0.9 }}>{data.label}</div>

        <div className="realtime-timestamp" style={{ marginTop: 8 }}>
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        <div className="next-update" style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
          Próxima actualización en {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>
    </div>
  );
};
