// ============================================
// COMPONENTE: ItemCard
// ============================================
// Dominio: Reservas Hoteleras

import React from 'react';
import { Reservation } from '../types';

interface ItemCardProps {
  item: Reservation;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onView }) => {
  return (
    <div className="item-card">
      <h3>{item.reservationNumber}</h3>
      <p>
        <strong>Huésped:</strong> {item.guestName}
      </p>
      <p>
        <strong>Habitación:</strong> {item.roomType}
      </p>
      <p>
        <strong>Check-in:</strong> {item.checkIn}
      </p>
      <p>
        <strong>Check-out:</strong> {item.checkOut}
      </p>
      <p>
        <strong>Precio/noche:</strong> ${item.pricePerNight.toLocaleString()} COP
      </p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={`status ${item.status}`}>{item.status}</span>
      </p>
      <p>
        <strong>Desayuno:</strong>{' '}
        {item.isBreakfastIncluded ? '✅ Incluido' : '❌ No incluido'}
      </p>

      <div className="actions">
        {onView && (
          <button onClick={() => onView(item.id)}>Ver detalles</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(item.id)}>Eliminar</button>
        )}
      </div>
    </div>
  );
};
