// ============================================
// COMPONENTE: ItemList
// ============================================

// PARA: Mostrar todas las habitaciones del hotel en forma de tarjetas
// QUÉ: Lista que carga habitaciones de la API y las renderiza con sus detalles
// IMPACTO: Es la sección principal del dashboard donde el usuario ve el inventario

import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { fetchItems } from '../utils/api';

export const ItemList: React.FC = () => {
  // PARA: Guardar las habitaciones que llegan de la API
  // QUÉ: Array de Items que empieza vacío y se llena al cargar
  // IMPACTO: Cuando se actualiza, React renderiza las tarjetas de habitaciones
  const [items, setItems] = useState<Item[]>([]);

  // PARA: Mostrar indicador de carga mientras llegan los datos
  // QUÉ: Booleano que empieza en true y se pone en false al terminar
  // IMPACTO: Controla si se muestra "Cargando..." o la lista de habitaciones
  const [loading, setLoading] = useState<boolean>(true);

  // PARA: Mostrar un mensaje útil si algo sale mal
  // QUÉ: Guarda el mensaje de error si la petición falla
  // IMPACTO: El usuario sabe qué pasó en vez de ver una pantalla en blanco
  const [error, setError] = useState<string | null>(null);

  // PARA: Cargar las habitaciones al abrir el componente
  // QUÉ: useEffect con AbortController que llama a fetchItems
  // IMPACTO: Sin este efecto, nunca aparecerían habitaciones en la lista
  useEffect(() => {
    // PARA: Poder cancelar la petición si el usuario sale antes de que cargue
    // QUÉ: AbortController permite cancelar fetch en vuelo
    // IMPACTO: Evita errores de "can't update state on unmounted component"
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItems(controller.signal);
        setItems(data);
      } catch (err) {
        // Solo mostramos error si no fue una cancelación intencional
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    // PARA: Limpiar la petición al desmontar el componente
    // QUÉ: Cancela el fetch si el componente desaparece antes de que termine
    // IMPACTO: Previene memory leaks y errores en consola
    return () => {
      controller.abort();
    };
  }, []); // [] significa: ejecutar solo al montar

  if (loading) {
    return (
      <div className="item-list">
        <h2>Cargando habitaciones...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list error">
        <h2>Error al cargar habitaciones</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  // PARA: Mostrar el nombre bonito de cada categoría en las tarjetas
  // QUÉ: Objeto que mapea el valor interno a una etiqueta visual
  // IMPACTO: En vez de mostrar "familiar" se muestra "Familiar"
  const categoryLabel: Record<string, string> = {
    simple: 'Simple',
    doble: 'Doble',
    suite: 'Suite',
    familiar: 'Familiar',
  };

  return (
    <div className="item-list">
      <h2>🛏️ Habitaciones del Hotel</h2>

      {/* Resumen rápido de cuántas hay y cuántas están libres */}
      <p className="item-count">
        Total: {items.length} habitaciones &nbsp;|&nbsp;{' '}
        {items.filter((i) => i.available).length} disponibles
      </p>

      <ul className="items">
        {/* PARA: Mostrar una tarjeta por cada habitación
            QUÉ: .map() recorre el array y devuelve JSX por cada elemento
            IMPACTO: Si el array tiene 8 habitaciones, se renderizan 8 tarjetas */}
        {items.map((item) => (
          <li
            key={item.id} // key es obligatorio para que React identifique cada tarjeta
            className={`item-card ${!item.available ? 'item-occupied' : ''}`}
          >
            {/* Etiqueta con el tipo de habitación */}
            <div className="item-badge">{categoryLabel[item.category]}</div>

            <h3>{item.name}</h3>
            <p>{item.description}</p>

            {/* Detalles de capacidad y precio */}
            <div className="item-details">
              <span>👥 Capacidad: {item.capacity} personas</span>
              <span>
                💰 ${item.pricePerNight.toLocaleString('es-CO')} / noche
              </span>
            </div>

            {/* Lista de servicios incluidos */}
            <div className="item-amenities">
              {item.amenities.map((a) => (
                <span key={a} className="amenity-tag">
                  {a}
                </span>
              ))}
            </div>

            {/* Indicador visual de si está disponible u ocupada */}
            <div className={`item-status ${item.available ? 'available' : 'occupied'}`}>
              {item.available ? '✅ Disponible' : '🔴 Ocupada'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};