// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('🏨 PROYECTO SEMANAL: MODELADO DE ENTIDADES\n');

// INSTRUCCIONES:
// Dominio: Sistema de Reservas Hoteleras
// Implementa las entidades, tipos y funciones siguiendo los TODOs y comentarios.
// Usa interfaces, types, type unions y literales. Comenta el código con qué/para/impacto.

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

// QUÉ: Representa una reserva en el hotel
// PARA: Modelar información básica de cada estancia
// IMPACTO: Permite gestionar el flujo de reservas del hotel
interface Reservation {
    id: string;
    reservationNumber: string;
    guest: Guest;
    room: Room;
    checkIn: string;
    checkOut: string;
    status: ReservationStatus;
}

// QUÉ: Representa al huésped que realiza la reserva
// PARA: Asociar la reserva con una persona
// IMPACTO: Facilita la gestión de clientes del hotel
interface Guest {
    name: string;
    email: string;
    phone: string;
}

// QUÉ: Representa una habitación del hotel
// PARA: Asignar el tipo de alojamiento a la reserva
// IMPACTO: Permite conocer qué habitación ocupa el huésped
interface Room {
    number: string;
    type: RoomType;
    pricePerNight: number;
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

// QUÉ: Estados posibles de una reserva
// PARA: Controlar el flujo del ciclo de vida de la reserva
// IMPACTO: Permite filtrar y gestionar reservas según su estado
type ReservationStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';

// QUÉ: Tipos de habitación disponibles en el hotel
// PARA: Diferenciar las categorías de alojamiento
// IMPACTO: Aporta flexibilidad al sistema de reservas
type RoomType = 'single' | 'double' | 'suite' | 'deluxe';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

// QUÉ: Crear una nueva reserva hotelera
// PARA: Simular la creación de reservas en el sistema
// IMPACTO: Permite inicializar datos de prueba
function createReservation(
  id: string,
  reservationNumber: string,
  guest: Guest,
  room: Room,
  checkIn: string,
  checkOut: string
): Reservation {
  return {
    id,
    reservationNumber,
    guest,
    room,
    checkIn,
    checkOut,
    status: 'pending',
  };
}

// QUÉ: Listar todas las reservas registradas
// PARA: Mostrar el inventario completo de reservas
// IMPACTO: Facilita la visualización del estado del hotel
function listReservations(reservations: Reservation[]): Reservation[] {
  return reservations;
}

// QUÉ: Filtrar reservas por estado
// PARA: Obtener solo las que cumplen cierta condición
// IMPACTO: Mejora la gestión operativa del hotel
function filterByStatus(reservations: Reservation[], status: ReservationStatus): Reservation[] {
  return reservations.filter((r) => r.status === status);
}

// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================

const sampleGuest: Guest = {
  name: 'Carlos Pérez',
  email: 'carlos@email.com',
  phone: '+57 300 123 4567',
};

const sampleRoom: Room = {
  number: '101',
  type: 'double',
  pricePerNight: 150000,
};

const suiteRoom: Room = {
  number: '305',
  type: 'suite',
  pricePerNight: 350000,
};

const res1 = createReservation('RES001', 'R-2026-001', sampleGuest, sampleRoom, '2026-04-10', '2026-04-15');
const res2 = createReservation('RES002', 'R-2026-002', sampleGuest, suiteRoom, '2026-04-12', '2026-04-14');
res2.status = 'confirmed';

const reservations = [res1, res2];

console.log('Todas las reservas:', listReservations(reservations));
console.log('Reservas confirmadas:', filterByStatus(reservations, 'confirmed'));
