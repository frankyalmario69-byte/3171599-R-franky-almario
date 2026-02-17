// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================

/**
 * DOMINIO: Plataforma de reservas hoteleras
 */

// Tipos auxiliares
export type RoomType = 'standard' | 'deluxe' | 'suite' | 'presidencial';

/**
 * Interface principal: Reserva de hotel
 */
export interface Item {
  id: number;
  name: string; // Nombre del huésped
  email: string; // Email del huésped
  hotelName: string; // Nombre del hotel
  roomType: RoomType; // Tipo de habitación
  checkIn: string; // Fecha check-in (formato: YYYY-MM-DD)
  checkOut: string; // Fecha check-out (formato: YYYY-MM-DD)
  guests: number; // Número de huéspedes
}

/**
 * FormData sin el id (para creación de nuevas reservas)
 */
export interface FormData extends Omit<Item, 'id'> {}