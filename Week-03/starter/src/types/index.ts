// ============================================
// TIPOS Y INTERFACES DEL PROYECTO
// ============================================
// Dominio: Sistema de Reservas Hoteleras

/**
 * Interfaz principal: Reservation
 * Representa una reserva en el hotel.
 */
export interface Item {
  id: number;
  reservationNumber: string;
  guestName: string;
  roomType: 'single' | 'double' | 'suite' | 'deluxe';
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  checkIn: string;           // ISO date
  checkOut: string;          // ISO date
  pricePerNight: number;     // precio por noche en COP
  isBreakfastIncluded?: boolean;
  // description se mantiene para compatibilidad visual
  description?: string;
}

/**
 * Interfaz para estadísticas del dashboard hotelero
 */
export interface Stats {
  totalReservations: number;
  checkedIn: number;
  confirmed: number;
  confirmedPercentage: number; // 0-100
}

/**
 * Interfaz para datos en tiempo real
 * Representa las habitaciones ocupadas actualmente.
 */
export interface RealTimeData {
  value: number;        // número de habitaciones ocupadas ahora
  label: string;
  unit: string;         // ej: "habitaciones"
  lastUpdated: string;  // ISO timestamp
}

/**
 * Estado genérico para manejar peticiones asíncronas
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Tipo para filtros de búsqueda
 */
export interface SearchFilters {
  query: string;
}
