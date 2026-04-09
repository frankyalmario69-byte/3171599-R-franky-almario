// ============================================
// COMPONENTE: FilterPanel
// ============================================
// Dominio: Reservas Hoteleras

import React from 'react';
import { ReservationStatus, RoomType } from '../types';
import { categories, roomTypeOptions } from '../data/items';

interface FilterPanelProps {
  selectedStatus: ReservationStatus;
  onStatusChange: (status: ReservationStatus) => void;
  selectedRoomType: RoomType;
  onRoomTypeChange: (roomType: RoomType) => void;
  showOnlyBreakfast: boolean;
  onBreakfastChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedStatus,
  onStatusChange,
  selectedRoomType,
  onRoomTypeChange,
  showOnlyBreakfast,
  onBreakfastChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as ReservationStatus)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="roomType">Habitación:</label>
        <select
          id="roomType"
          value={selectedRoomType}
          onChange={(e) => onRoomTypeChange(e.target.value as RoomType)}
        >
          {roomTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={showOnlyBreakfast}
            onChange={(e) => onBreakfastChange(e.target.checked)}
          />
          {' '}Solo con desayuno incluido
        </label>
      </div>

      <button onClick={onClearFilters} className="btn-clear">
        🔄 Limpiar filtros
      </button>
    </div>
  );
};
