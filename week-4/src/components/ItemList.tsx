// ============================================
// COMPONENTE: ItemList
// ============================================
// Renderiza la lista de elementos

import React from 'react';
import { Hotel } from '../types';
import { ItemCard } from './ItemCard';
import { EmptyState } from './EmptyState';

interface ItemListProps {
  items: Hotel[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onClearFilters?: () => void;
}

/**
 * Lista de elementos del catálogo
 */
export const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading = false,
  error = null,
  onDelete,
  onView,
  onClearFilters,
}) => {
  // 1. Si está cargando, mostrar spinner
  if (isLoading) {
    return <div className="loading">⏳ Cargando hoteles...</div>;
  }

  // 2. Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <div className="error">
        <p>❌ {error}</p>
      </div>
    );
  }

  // 3. Si no hay items, mostrar estado vacío
  if (items.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  // 4. Renderizar lista con .map() y keys únicas
  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};
