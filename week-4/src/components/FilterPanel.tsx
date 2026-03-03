// ============================================
// COMPONENTE: FilterPanel
// ============================================
// Panel con todos los filtros

import React from 'react';
import { Category } from '../types';
import { categories } from '../data/items';

interface FilterPanelProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  showOnlyAvailable: boolean;
  onAvailableChange: (value: boolean) => void;
  onClearFilters: () => void;
}

/**
 * Panel de filtros del catálogo
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onCategoryChange,
  showOnlyAvailable,
  onAvailableChange,
  onClearFilters,
}) => {
  // TODO: Implementar los filtros

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="category">Tipo de habitación:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => onAvailableChange(e.target.checked)}
          />
          Solo disponibles
        </label>
      </div>

      <button onClick={onClearFilters} className="btn-clear">
        🔄 Limpiar filtros
      </button>
    </div>
  );
};
