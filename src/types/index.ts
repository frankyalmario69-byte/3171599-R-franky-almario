// ============================================
// TIPOS Y INTERFACES - PLATAFORMA DE RESERVAS HOTELERAS
// ============================================

// PARA: Definir la estructura de los datos que usa la app
// QUÉ: Interfaces TypeScript para habitaciones, stats y datos en tiempo real
// IMPACTO: Sin estos tipos, TypeScript no sabe qué forma tienen los datos

// Interface principal para cada habitación del hotel
export interface Item {
  id: number;
  name: string;           // Nombre de la habitación
  description: string;    // Descripción corta
  category: 'simple' | 'doble' | 'suite' | 'familiar'; // Tipo de habitación
  pricePerNight: number;  // Precio por noche en COP
  available: boolean;     // Si está disponible o no
  capacity: number;       // Cuántas personas puede alojar
  amenities: string[];    // Lista de servicios incluidos
}

// Interface para las estadísticas del dashboard
export interface Stats {
  total: number;              // Total de habitaciones
  active: number;             // Habitaciones disponibles
  percentage: number;         // % de disponibilidad
  reservationsToday: number;  // Reservas hechas hoy
  revenue: number;            // Ingresos del día en COP
}

// Interface para el dato que se actualiza en tiempo real
export interface RealTimeData {
  value: number;        // El número que se muestra
  label: string;        // Descripción del dato
  unit: string;         // Unidad de medida (ej: "habitaciones")
  lastUpdated: string;  // Cuándo se actualizó por última vez
}

// Interface genérica para manejar estados de carga (no modificar)
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}