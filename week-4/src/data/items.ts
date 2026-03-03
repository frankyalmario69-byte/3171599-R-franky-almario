// ============================================
// DATOS MOCK — Reservas Hoteleras
// ============================================

// Qué: importo el tipo Hotel que definí en types
// Para: que cada objeto del array tenga exactamente las propiedades correctas
// Impacto: TypeScript me marca error si le falta un campo a algún hotel
import { Hotel } from '../types';

// Qué: creo un array con 10 hoteles reales de Bogotá
// Para: tener datos de prueba sin necesitar una base de datos
// Impacto: la app muestra información real desde el primer momento
export const items: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Casa Medina',
    // Qué: ubico cada hotel en un barrio específico de Bogotá
    // Para: que el usuario sepa exactamente dónde está el hotel
    // Impacto: también se puede buscar por barrio en la barra de búsqueda
    location: 'Chapinero, Bogotá',
    category: 'suite',
    price: 350,
    rating: 4.8,
    isAvailable: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Hotel GHL Comfort',
    location: 'Candelaria, Bogotá',
    category: 'doble',
    price: 180,
    rating: 4.6,
    isAvailable: true,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'Hotel Sofitel Bogotá Victoria Regia',
    location: 'Chico, Bogotá',
    category: 'suite',
    price: 420,
    rating: 4.7,
    isAvailable: false,
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    name: 'Hotel Four Seasons Bogotá',
    location: 'Zona Rosa, Bogotá',
    category: 'suite',
    price: 550,
    rating: 4.9,
    isAvailable: true,
    createdAt: '2024-03-05',
  },
  {
    id: 5,
    name: 'Hotel Ibis Bogotá Museo',
    location: 'La Candelaria, Bogotá',
    category: 'individual',
    price: 95,
    rating: 4.1,
    isAvailable: true,
    createdAt: '2024-02-15',
  },
  {
    id: 6,
    name: 'Hotel Then Bogotá',
    location: 'Usaquén, Bogotá',
    category: 'familiar',
    price: 280,
    rating: 4.5,
    isAvailable: false,
    createdAt: '2024-01-25',
  },
  {
    id: 7,
    name: 'Hotel Estelar La Fontana',
    location: 'Chico Norte, Bogotá',
    category: 'individual',
    price: 110,
    rating: 3.9,
    isAvailable: true,
    createdAt: '2024-03-10',
  },
  {
    id: 8,
    name: 'Hotel NH Collection Royal',
    location: 'El Nogal, Bogotá',
    category: 'doble',
    price: 140,
    rating: 4.3,
    isAvailable: true,
    createdAt: '2024-02-28',
  },
  {
    id: 9,
    name: 'Hotel W Bogotá',
    location: 'Zona Rosa, Bogotá',
    category: 'suite',
    price: 890,
    rating: 5.0,
    isAvailable: true,
    createdAt: '2024-03-01',
  },
  {
    id: 10,
    name: 'Hotel Bogotá Plaza',
    location: 'Niza, Bogotá',
    category: 'familiar',
    price: 195,
    rating: 4.4,
    isAvailable: true,
    createdAt: '2024-02-10',
  },
];

// Qué: defino las categorías con su valor interno y su etiqueta visible
// Para: llenar el selector de filtro con los tipos de habitación del dominio
// Impacto: el usuario ve nombres amigables en vez de strings crudos
export const categories = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'individual', label: '🛏 Individual' },
  { value: 'doble', label: '🛏🛏 Doble' },
  { value: 'suite', label: '👑 Suite' },
  { value: 'familiar', label: '👨‍👩‍👧 Familiar' },
];

// Opciones de ordenamiento
export const sortOptions = [
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
  { value: 'price-asc', label: 'Precio (menor a mayor)' },
  { value: 'price-desc', label: 'Precio (mayor a menor)' },
  { value: 'rating', label: 'Mejor valorados' },
];
