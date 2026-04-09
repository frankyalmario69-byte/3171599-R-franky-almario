// ============================================
// FUNCIONES DE API Y DATOS MOCK
// ============================================
// Dominio: Sistema de Reservas Hoteleras

import type { Item, Stats, RealTimeData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK - RESERVAS HOTELERAS
// ============================================

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    reservationNumber: 'RES-2026-001',
    guestName: 'Carlos Pérez',
    roomType: 'double',
    status: 'checked-in',
    checkIn: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0],
    pricePerNight: 150000,
    isBreakfastIncluded: true,
    description: 'Habitación doble con vista al jardín',
  },
  {
    id: 2,
    reservationNumber: 'RES-2026-002',
    guestName: 'María García',
    roomType: 'suite',
    status: 'confirmed',
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    pricePerNight: 350000,
    isBreakfastIncluded: true,
    description: 'Suite presidencial piso 10',
  },
  {
    id: 3,
    reservationNumber: 'RES-2026-003',
    guestName: 'Juan Rodríguez',
    roomType: 'single',
    status: 'checked-out',
    checkIn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
    checkOut: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().split('T')[0],
    pricePerNight: 90000,
    isBreakfastIncluded: false,
    description: 'Habitación individual estándar',
  },
  {
    id: 4,
    reservationNumber: 'RES-2026-004',
    guestName: 'Ana Martínez',
    roomType: 'deluxe',
    status: 'pending',
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString().split('T')[0],
    pricePerNight: 250000,
    isBreakfastIncluded: false,
    description: 'Habitación deluxe con jacuzzi',
  },
  {
    id: 5,
    reservationNumber: 'RES-2026-005',
    guestName: 'Luis Torres',
    roomType: 'double',
    status: 'cancelled',
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString().split('T')[0],
    pricePerNight: 150000,
    isBreakfastIncluded: true,
    description: 'Reserva cancelada por el huésped',
  },
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene la lista de reservas
 */
export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  return new Promise<Item[]>(async (resolve, reject) => {
    if (signal?.aborted) {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      return reject(err);
    }

    const onAbort = () => {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      reject(err);
    };

    signal?.addEventListener?.('abort', onAbort);

    try {
      await delay(900);
      resolve(MOCK_ITEMS);
    } catch (e) {
      reject(e);
    } finally {
      signal?.removeEventListener?.('abort', onAbort);
    }
  });
};

/**
 * Obtiene estadísticas del hotel
 */
export const fetchStats = async (): Promise<Stats> => {
  await delay(600);

  const total = MOCK_ITEMS.length;
  const checkedIn = MOCK_ITEMS.filter((r) => r.status === 'checked-in').length;
  const confirmed = MOCK_ITEMS.filter((r) => r.status === 'confirmed').length;
  const confirmedPercentage = total > 0 ? Math.round(((checkedIn + confirmed) / total) * 100) : 0;

  return {
    totalReservations: total,
    checkedIn,
    confirmed,
    confirmedPercentage,
  };
};

/**
 * Obtiene datos en tiempo real: habitaciones ocupadas actualmente
 */
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(400);

  const checkedIn = MOCK_ITEMS.filter((r) => r.status === 'checked-in').length;
  const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
  const value = Math.max(0, checkedIn + variation);

  return {
    value,
    label: 'Habitaciones ocupadas',
    unit: 'habitaciones',
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Busca reservas por query
 */
export const searchItems = async (query: string): Promise<Item[]> => {
  await delay(600);

  if (!query.trim()) {
    return MOCK_ITEMS;
  }

  return MOCK_ITEMS.filter((item) =>
    (item.reservationNumber + ' ' + item.guestName + ' ' + (item.description || '') + ' ' + item.roomType)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
};
