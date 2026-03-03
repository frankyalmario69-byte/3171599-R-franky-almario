// ============================================
// COMPONENTE: ItemCard
// ============================================
// Muestra una tarjeta con la información de un elemento
// TODO: Adaptar a tu dominio

import React from 'react';
import { Hotel } from '../types';

interface ItemCardProps {
  item: Hotel;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

/**
 * Tarjeta de elemento del catálogo
 * TODO: Personalizar según tu dominio
 */
export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDelete,
  onView,
}) => {
  // TODO: Implementar el componente
  // 1. Mostrar nombre del elemento
  // 2. Mostrar categoría con badge de color
  // 3. Mostrar precio formateado
  // 4. Mostrar rating con estrellas
  // 5. Mostrar estado de disponibilidad (condicional)
  // 6. Botones de acción (ver, eliminar)

  return (
    <div className="item-card">
      <h3>{item.name}</h3>

      <p className="location">📍 {item.location}</p>

      <span className={`badge ${item.category}`}>{item.category}</span>

      <p className="price">${item.price.toFixed(2)} / noche</p>

{item.isAvailable ? (
        <span className="status available">✅ Disponible</span>
      ) : (
        <span className="status unavailable">❌ No disponible</span>
      )}

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
