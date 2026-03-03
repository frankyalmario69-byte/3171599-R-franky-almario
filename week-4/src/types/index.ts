// ============================================
// TIPOS E INTERFACES
// ============================================

// Qué: defino la forma de un hotel con sus propiedades
// Para: que TypeScript sepa qué datos tiene cada objeto hotel
// Impacto: si intento usar una propiedad que no existe, TypeScript me avisa
export interface Hotel {
  id: number;
  name: string;
  // Qué: agrego la ubicación del hotel
  // Para: mostrar el barrio de Bogotá donde está
  // Impacto: puedo buscar hoteles también por barrio
  location: string;
  category: string; // tipo de habitación
  price: number;    // precio por noche
  rating: number;
  isAvailable: boolean;
  createdAt: string;
}

// Qué: defino los valores válidos para el filtro de categoría
// Para: que solo se puedan usar los tipos de habitación que existen
// Impacto: evita errores como escribir 'Suite' con mayúscula o 'triple' que no existe
export type Category = 'all' | 'individual' | 'doble' | 'suite' | 'familiar';

// Opciones de ordenamiento
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating';

// Estado de los filtros
export interface FilterState {
  searchTerm: string;
  category: Category;
  showOnlyAvailable: boolean;
  sortBy: SortOption;
  minPrice?: number;
  maxPrice?: number;
}
