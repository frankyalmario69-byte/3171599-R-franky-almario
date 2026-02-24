// ============================================
// COMPONENTE: RealTimeIndicator
// ============================================

// PARA: Mostrar cuántas habitaciones están ocupadas en este momento
// QUÉ: Componente que se actualiza solo cada 5 segundos usando polling
// IMPACTO: El usuario ve la ocupación actual sin necesidad de recargar la página

import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

// PARA: Definir cada cuánto se consulta la ocupación
// QUÉ: Constante de 5000 milisegundos = 5 segundos
// IMPACTO: Cambiar este número hace que se actualice más o menos seguido
const POLLING_INTERVAL = 5000;

export const RealTimeIndicator: React.FC = () => {
  // PARA: Guardar el dato de ocupación actual
  // QUÉ: Estado que se actualiza cada vez que llega nueva información
  // IMPACTO: Cuando cambia, React actualiza lo que se muestra en pantalla
  const [data, setData] = useState<RealTimeData | null>(null);

  // PARA: Mostrar "Cargando..." la primera vez que carga
  // QUÉ: Estado que solo es true hasta que llega el primer dato
  // IMPACTO: Evita mostrar un componente vacío al inicio
  const [loading, setLoading] = useState<boolean>(true);

  // PARA: Mostrar visualmente que se está actualizando
  // QUÉ: Estado que se pone en true mientras dura la llamada a la API
  // IMPACTO: Muestra el badge "Actualizando..." durante cada consulta
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // PARA: Configurar el polling que actualiza los datos automáticamente
  // QUÉ: useEffect que carga datos al inicio y luego repite cada 5 segundos
  // IMPACTO: Sin este efecto, los datos nunca cambiarían solos
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRealTimeData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading real-time data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    // Llamada inicial para no esperar 5 segundos al primer dato
    loadData();

    // PARA: Repetir la consulta cada 5 segundos
    // QUÉ: setInterval guarda un ID que usamos para detenerlo después
    // IMPACTO: Es lo que hace que el componente se "actualice solo"
    const intervalId = setInterval(() => {
      console.log('🔄 Actualizando ocupación...');
      loadData();
    }, POLLING_INTERVAL);

    // PARA: Evitar que el polling siga corriendo si el componente se desmonta
    // QUÉ: Función de cleanup que cancela el intervalo
    // IMPACTO: Sin esto habría un memory leak (fuga de memoria)
    return () => {
      clearInterval(intervalId);
      console.log('🧹 Polling detenido');
    };
  }, []); // [] significa: configurar solo al montar

  // PARA: Formatear el timestamp en hora legible para el usuario
  // QUÉ: Convierte un string ISO a hora local colombiana
  // IMPACTO: En vez de "2024-01-15T14:30:00Z" se muestra "2:30:00 p. m."
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('es-CO');
  };

  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>Cargando ocupación...</h2>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>🏨 Ocupación Actual</h2>
        {/* Solo se muestra mientras está consultando la API */}
        {isUpdating && (
          <span className="updating-badge">Actualizando...</span>
        )}
      </div>

      <div className="realtime-content">
        {/* Número grande con la unidad de medida */}
        <div className="realtime-value">
          {data.value} <span style={{ fontSize: '1.2rem' }}>{data.unit}</span>
        </div>

        {/* Descripción de qué significa el número */}
        <div className="realtime-label">{data.label}</div>

        {/* Hora en que se consultó por última vez */}
        <div className="realtime-timestamp">
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        <div className="next-update">
          Se actualiza cada {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>

      {/* Barra que se vacía visualmente hasta la próxima actualización */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            animation: `progress ${POLLING_INTERVAL}ms linear infinite`,
          }}
        ></div>
      </div>
    </div>
  );
};