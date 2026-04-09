// ============================================
// COMPONENTE: Catalog (Principal)
// ============================================
// Dominio: Sistema de Reservas Hoteleras

import React, { useState, useMemo } from 'react';
import { Reservation, ReservationStatus, RoomType, SortOption } from '../types';
import { items as initialItems } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ItemList } from './ItemList';

export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================

  const [items, setItems] = useState<Reservation[]>(initialItems);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus>('all');
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>('all');
  const [showOnlyBreakfast, setShowOnlyBreakfast] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('reservation-asc');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO DE DATOS
  // ============================================

  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. búsqueda en varios campos
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((r) =>
        r.reservationNumber.toLowerCase().includes(term) ||
        r.guestName.toLowerCase().includes(term) ||
        r.roomType.toLowerCase().includes(term)
      );
    }

    // 2. filtro por estado
    if (selectedStatus !== 'all') {
      result = result.filter((r) => r.status === selectedStatus);
    }

    // 3. filtro por tipo de habitación
    if (selectedRoomType !== 'all') {
      result = result.filter((r) => r.roomType === selectedRoomType);
    }

    // 4. filtro por desayuno incluido
    if (showOnlyBreakfast) {
      result = result.filter((r) => r.isBreakfastIncluded);
    }

    // 5. ordenamiento
    switch (sortBy) {
      case 'reservation-asc':
        result.sort((a, b) => a.reservationNumber.localeCompare(b.reservationNumber));
        break;
      case 'reservation-desc':
        result.sort((a, b) => b.reservationNumber.localeCompare(a.reservationNumber));
        break;
      case 'price-asc':
        result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-desc':
        result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'checkin-asc':
        result.sort((a, b) =>
          new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
        );
        break;
      case 'checkin-desc':
        result.sort((a, b) =>
          new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
        );
        break;
    }

    return result;
  }, [items, debouncedSearchTerm, selectedStatus, selectedRoomType, showOnlyBreakfast, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleDelete = (id: number): void => {
    if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
      setItems((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleView = (id: number): void => {
    const reservation = items.find((r) => r.id === id);
    if (reservation) {
      alert(`Reserva: ${reservation.reservationNumber}\nHuésped: ${reservation.guestName}\nEstado: ${reservation.status}`);
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedRoomType('all');
    setShowOnlyBreakfast(false);
    setSortBy('reservation-asc');
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>🏨 Catálogo de Reservas</h1>
      </header>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por número, huésped o tipo de habitación..."
      />

      <div className="controls">
        <FilterPanel
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedRoomType={selectedRoomType}
          onRoomTypeChange={setSelectedRoomType}
          showOnlyBreakfast={showOnlyBreakfast}
          onBreakfastChange={setShowOnlyBreakfast}
          onClearFilters={clearFilters}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      <p className="results-count">
        Mostrando {processedItems.length} de {items.length} reservas
        {debouncedSearchTerm && ` para "${debouncedSearchTerm}"`}
      </p>

      <ItemList
        items={processedItems}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;
