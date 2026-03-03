# Proyecto Semana 04: Catálogo de Reservas Hoteleras — Bogotá

## 🎯 Descripción

Catálogo interactivo de hoteles en Bogotá que permite buscar, filtrar y ordenar reservas de habitaciones. Implementa renderizado condicional, listas con keys, filtrado por tipo de habitación, ordenamiento y búsqueda en tiempo real.

---

## 🏨 Dominio: Reservas Hoteleras

**Entidad principal**: `Hotel`

| Propiedad     | Tipo      | Descripción                          |
| ------------- | --------- | ------------------------------------ |
| `id`          | `number`  | Identificador único                  |
| `name`        | `string`  | Nombre del hotel                     |
| `location`    | `string`  | Barrio y ciudad (Bogotá)             |
| `category`    | `string`  | Tipo de habitación                   |
| `price`       | `number`  | Precio por noche (COP/USD)           |
| `rating`      | `number`  | Calificación del hotel               |
| `isAvailable` | `boolean` | Disponibilidad de la habitación      |
| `createdAt`   | `string`  | Fecha de registro                    |

**Tipos de habitación**: `individual` | `doble` | `suite` | `familiar`

---

## ✅ Funcionalidades Implementadas

### 1. Renderizado Condicional
- [x] Estado de carga (loading)
- [x] Mensaje de error
- [x] Estado vacío cuando no hay resultados
- [x] Contador de hoteles encontrados
- [x] Badge de disponible / no disponible por hotel

### 2. Listas con Keys
- [x] Lista de hoteles renderizada con `.map()`
- [x] Key única basada en `id` (no index)
- [x] Componente `ItemCard` para cada hotel
- [x] Acciones por hotel: ver detalles y eliminar

### 3. Filtrado
- [x] Filtro por tipo de habitación (individual, doble, suite, familiar)
- [x] Filtro de solo disponibles (checkbox)
- [x] Botón para limpiar todos los filtros

### 4. Ordenamiento
- [x] Nombre A-Z / Z-A
- [x] Precio menor a mayor / mayor a menor
- [x] Mejor valorados
- [x] Sin mutación del array original (`[...items]`)

### 5. Búsqueda en Tiempo Real
- [x] Búsqueda por nombre del hotel
- [x] Búsqueda por barrio/ubicación
- [x] Debounce de 300ms
- [x] Botón para limpiar búsqueda
- [x] Case-insensitive

---

## 📂 Estructura del Proyecto

```
starter/
├── src/
│   ├── components/
│   │   ├── Catalog.tsx        # Componente principal — orquesta todo
│   │   ├── ItemCard.tsx       # Tarjeta de cada hotel
│   │   ├── ItemList.tsx       # Lista de hoteles con renderizado condicional
│   │   ├── SearchBar.tsx      # Barra de búsqueda en tiempo real
│   │   ├── FilterPanel.tsx    # Filtros por tipo y disponibilidad
│   │   ├── SortSelector.tsx   # Selector de ordenamiento
│   │   └── EmptyState.tsx     # Estado vacío
│   ├── types/
│   │   └── index.ts           # Interface Hotel, Category, SortOption
│   ├── data/
│   │   └── items.ts           # 10 hoteles de Bogotá (mock)
│   ├── hooks/
│   │   └── useDebounce.ts     # Hook personalizado para debounce
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── index.html
└── package.json
```

---

## 🚀 Instrucciones de Ejecución

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abrir en el navegador: `http://localhost:5173`

---

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite 5
- CSS 
