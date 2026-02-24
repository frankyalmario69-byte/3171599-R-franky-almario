// ============================================
// FUNCIONES DE API Y DATOS MOCK
// PLATAFORMA DE RESERVAS HOTELERAS
// ============================================

// PARA: Proveer los datos que usan los componentes
// QUÉ: Funciones que simulan llamadas a una API con datos de habitaciones
// IMPACTO: Si estas funciones fallan, los componentes no tienen datos que mostrar

import type { Item, Stats, RealTimeData } from '../types';

// PARA: Simular el tiempo que tarda una API real en responder
// QUÉ: Pausa la ejecución por los milisegundos indicados
// IMPACTO: Permite ver los estados de "cargando..." en los componentes
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// PARA: Tener datos de prueba sin necesitar una API real
// QUÉ: Lista de habitaciones del hotel con sus propiedades
// IMPACTO: Es lo que se muestra en el ItemList del dashboard
const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Habitación Simple Vista al Mar',
    description: 'Acogedora habitación con vista panorámica al océano.',
    category: 'simple',
    pricePerNight: 150000,
    available: true,
    capacity: 1,
    amenities: ['WiFi', 'TV', 'Aire acondicionado'],
  },
  {
    id: 2,
    name: 'Suite Presidencial',
    description: 'Nuestra suite más lujosa con jacuzzi y sala privada.',
    category: 'suite',
    pricePerNight: 850000,
    available: false,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Jacuzzi', 'Minibar', 'Sala'],
  },
  {
    id: 3,
    name: 'Habitación Doble Estándar',
    description: 'Habitación amplia ideal para parejas.',
    category: 'doble',
    pricePerNight: 220000,
    available: true,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar'],
  },
  {
    id: 4,
    name: 'Habitación Familiar',
    description: 'Espaciosa habitación con dos camas dobles para familias.',
    category: 'familiar',
    pricePerNight: 380000,
    available: true,
    capacity: 4,
    amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Cuna disponible'],
  },
  {
    id: 5,
    name: 'Suite Junior',
    description: 'Suite intermedia con sala de estar y balcón privado.',
    category: 'suite',
    pricePerNight: 520000,
    available: true,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Balcón', 'Minibar', 'Sala'],
  },
  {
    id: 6,
    name: 'Habitación Doble Vista Jardín',
    description: 'Habitación doble con vista a los jardines del hotel.',
    category: 'doble',
    pricePerNight: 195000,
    available: false,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Aire acondicionado'],
  },
  {
    id: 7,
    name: 'Habitación Simple Económica',
    description: 'Habitación cómoda y asequible para viajeros.',
    category: 'simple',
    pricePerNight: 110000,
    available: true,
    capacity: 1,
    amenities: ['WiFi', 'TV'],
  },
  {
    id: 8,
    name: 'Suite Penthouse',
    description: 'El máximo lujo en el último piso con terraza privada.',
    category: 'suite',
    pricePerNight: 1200000,
    available: true,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Terraza', 'Jacuzzi', 'Minibar', 'Cocina', 'Sala'],
  },
];

// PARA: Cargar la lista de habitaciones en el componente ItemList
// QUÉ: Retorna todas las habitaciones mock después de un delay simulado
// IMPACTO: Si falla, ItemList muestra el mensaje de error
export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  await delay(1000);
  // Si el usuario navegó a otra página antes de que cargara, cancelamos
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return MOCK_ITEMS;
};

// PARA: Mostrar los números clave en el componente StatsCard
// QUÉ: Calcula y retorna las estadísticas del hotel
// IMPACTO: Si falla, StatsCard no muestra ningún número
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);

  const total = MOCK_ITEMS.length;
  const active = MOCK_ITEMS.filter((item) => item.available).length;
  // Calculamos el porcentaje de disponibilidad
  const percentage = Math.round((active / total) * 100);

  return {
    total,
    active,
    percentage,
    reservationsToday: 12,  // Dato fijo de ejemplo
    revenue: 4850000,        // Ingresos del día en COP
  };
};

// PARA: Actualizar el indicador de ocupación en tiempo real
// QUÉ: Retorna cuántas habitaciones están ocupadas en este momento
// IMPACTO: Se llama cada 5 segundos desde RealTimeIndicator para mostrar datos frescos
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);

  const occupied = MOCK_ITEMS.filter((item) => !item.available).length;

  return {
    value: occupied,
    label: 'Habitaciones Ocupadas Ahora',
    unit: 'habitaciones',
    lastUpdated: new Date().toISOString(), // Guardamos cuándo se actualizó
  };
};