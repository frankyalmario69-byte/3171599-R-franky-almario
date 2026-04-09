import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { fetchItems } from '../utils/api';

// ============================================
// COMPONENTE: ItemList
// Muestra la lista de reservas hoteleras
// ============================================

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItems(controller.signal);
        setItems(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="item-list">
        <h2>Cargando reservas...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list error">
        <h2>Error al cargar datos</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="item-list">
      <h2>Lista de Reservas</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="item-count">Total: {items.length} reservas</p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por número, huésped o habitación..."
          style={{ padding: 6, borderRadius: 6 }}
        />
      </div>

      <ul className="items">
        {items
          .filter((it) => {
            if (!query.trim()) return true;
            const text = (
              it.reservationNumber + ' ' +
              it.guestName + ' ' +
              it.roomType + ' ' +
              (it.description || '')
            ).toLowerCase();
            return text.includes(query.toLowerCase());
          })
          .map((item) => (
            <li key={item.id} className="item-card" style={{ border: '1px solid #eee' }}>
              <h3>{item.reservationNumber} — {item.status}</h3>
              <p style={{ margin: '6px 0' }}><strong>Huésped:</strong> {item.guestName}</p>
              <p style={{ margin: '4px 0' }}><strong>Habitación:</strong> {item.roomType}</p>
              <p style={{ margin: '4px 0', fontSize: 12, color: '#555' }}>
                Check-in: {item.checkIn} ➜ Check-out: {item.checkOut}
              </p>
              <p style={{ margin: '4px 0', fontSize: 12, color: '#777' }}>
                ${item.pricePerNight.toLocaleString()} COP/noche
                {item.isBreakfastIncluded ? ' · Desayuno incluido' : ''}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
