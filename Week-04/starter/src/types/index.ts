// ============================================
// TIPOS E INTERFACES
// ============================================
// Dominio: Sistema de Reservas Hoteleras

export interface Reservation {
  id: number;
  reservationNumber: string;  // ej: RES-2026-001
  guestName: string;          // nombre del huésped
  roomType: RoomType;
  status: ReservationStatus;
  checkIn: string;            // ISO date
  checkOut: string;           // ISO date
  pricePerNight: number;      // precio en COP
  isBreakfastIncluded: boolean;
}

// estados de reserva (incluye 'all' para el filtro "todos")
export type ReservationStatus =
  | 'all'
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'checked-out'
  | 'cancelled';

// tipos de habitación (incluye 'all' para el filtro "todos")
export type RoomType =
  | 'all'
  | 'single'
  | 'double'
  | 'suite'
  | 'deluxe';

// opciones de ordenamiento en el catálogo
export type SortOption =
  | 'reservation-asc'
  | 'reservation-desc'
  | 'price-asc'
  | 'price-desc'
  | 'checkin-asc'
  | 'checkin-desc';

// Estado de los filtros
export interface FilterState {
  searchTerm: string;
  status: ReservationStatus;
  roomType: RoomType;
  showOnlyBreakfast: boolean;
  sortBy: SortOption;
  minPrice?: number;
  maxPrice?: number;
}
