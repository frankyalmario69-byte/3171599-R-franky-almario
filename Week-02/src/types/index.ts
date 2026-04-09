// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Dominio: Sistema de Reservas Hoteleras

/**
 * Interface principal: Reservation
 * Representa una reserva dentro del sistema hotelero.
 */
export interface Reservation {
  id: number;                // Identificador único
  reservationNumber: string; // Número de reserva (ej: R-2026-001)
  guestName: string;         // Nombre del huésped
  roomType: 'single' | 'double' | 'suite' | 'deluxe'; // Tipo de habitación
  status: 'pendiente' | 'confirmada' | 'en curso' | 'completada' | 'cancelada'; // Estado
  checkIn: string;           // Fecha de entrada (YYYY-MM-DD)
  checkOut: string;          // Fecha de salida (YYYY-MM-DD)
  pricePerNight: number;     // Precio por noche en COP
}

/**
 * Interface para datos de formulario
 * Igual que Reservation pero sin el id (se genera automáticamente al agregar).
 */
export type ReservationFormData = Omit<Reservation, 'id'>;
