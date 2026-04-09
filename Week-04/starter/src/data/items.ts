// ============================================
// MOCK DATA PARA RESERVAS HOTELERAS
// ============================================
import { Reservation, ReservationStatus, RoomType, SortOption } from '../types';

export const items: Reservation[] = [
  {
    id: 1,
    reservationNumber: 'RES-2026-001',
    guestName: 'Carlos Pérez',
    roomType: 'double',
    status: 'checked-in',
    checkIn: '2026-04-08',
    checkOut: '2026-04-12',
    pricePerNight: 150000,
    isBreakfastIncluded: true,
  },
  {
    id: 2,
    reservationNumber: 'RES-2026-002',
    guestName: 'María García',
    roomType: 'suite',
    status: 'confirmed',
    checkIn: '2026-04-15',
    checkOut: '2026-04-20',
    pricePerNight: 350000,
    isBreakfastIncluded: true,
  },
  {
    id: 3,
    reservationNumber: 'RES-2026-003',
    guestName: 'Juan Rodríguez',
    roomType: 'single',
    status: 'checked-out',
    checkIn: '2026-04-01',
    checkOut: '2026-04-05',
    pricePerNight: 90000,
    isBreakfastIncluded: false,
  },
  {
    id: 4,
    reservationNumber: 'RES-2026-004',
    guestName: 'Ana Martínez',
    roomType: 'deluxe',
    status: 'pending',
    checkIn: '2026-04-20',
    checkOut: '2026-04-23',
    pricePerNight: 250000,
    isBreakfastIncluded: false,
  },
  {
    id: 5,
    reservationNumber: 'RES-2026-005',
    guestName: 'Luis Torres',
    roomType: 'double',
    status: 'cancelled',
    checkIn: '2026-04-18',
    checkOut: '2026-04-21',
    pricePerNight: 150000,
    isBreakfastIncluded: true,
  },
];

// Estados disponibles como categorías
export const categories: { value: ReservationStatus; label: string }[] = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'pending', label: '⏳ Pendiente' },
  { value: 'confirmed', label: '✅ Confirmada' },
  { value: 'checked-in', label: '🏨 En el hotel' },
  { value: 'checked-out', label: '🚪 Completada' },
  { value: 'cancelled', label: '❌ Cancelada' },
];

// Tipos de habitación para filtro
export const roomTypeOptions: { value: RoomType; label: string }[] = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'single', label: '🛏️ Individual' },
  { value: 'double', label: '🛏️🛏️ Doble' },
  { value: 'suite', label: '👑 Suite' },
  { value: 'deluxe', label: '⭐ Deluxe' },
];

// Opciones de ordenamiento
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'reservation-asc', label: 'Reserva (A-Z)' },
  { value: 'reservation-desc', label: 'Reserva (Z-A)' },
  { value: 'price-asc', label: 'Precio (menor a mayor)' },
  { value: 'price-desc', label: 'Precio (mayor a menor)' },
  { value: 'checkin-asc', label: 'Check-in (más antiguo)' },
  { value: 'checkin-desc', label: 'Check-in (más reciente)' },
];
