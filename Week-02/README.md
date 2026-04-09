
# 🏨 Sistema de Reservas Hoteleras

Proyecto CRUD desarrollado en **React + TypeScript** como parte del bootcamp.  
El dominio asignado es **Reservas Hoteleras**, enfocado en la gestión de reservas, huéspedes y habitaciones.

---

## 🎯 Objetivos del Proyecto

- Construir una aplicación completa con operaciones **CRUD** (Create, Read, Update, Delete).
- Practicar conceptos clave de React:
  - Componentes funcionales con TypeScript
  - Props tipados con interfaces
  - Estado local con `useState`
  - Renderizado de listas con `.map()`
  - Manejo de eventos (`onClick`, `onChange`, `onSubmit`)
  - Formularios controlados
  - Renderizado condicional
  - Composición de componentes
  - Inmutabilidad en operaciones de estado

---

## 📚 Funcionalidades

- **Visualizar lista de reservas** con sus propiedades principales:
  - Número de reserva
  - Nombre del huésped
  - Tipo de habitación (`single`, `double`, `suite`, `deluxe`)
  - Estado (`pendiente`, `confirmada`, `en curso`, `completada`, `cancelada`)
  - Fechas de check-in y check-out
  - Precio por noche
- **Agregar nuevas reservas** mediante formulario controlado.
- **Editar reservas existentes** con pre-llenado de datos.
- **Eliminar reservas** con confirmación.
- **Indicadores visuales** de estado mediante badges.

---

## Estructura de Componentes

```
App (componente principal con estado)
├── Header (título y descripción del sistema)
├── ReservationForm (formulario agregar/editar)
├── ReservationList (lista de reservas)
│   └── ReservationCard × N (tarjeta individual)
```

---

## Requisitos Técnicos

- **TypeScript**: interfaces para la entidad `Reservation`.
- **React**: componentes funcionales con props tipadas.
- **Inmutabilidad**: uso de `map()`, `filter()`, `spread operator`.
- **Validación**: campos requeridos y valores válidos (precio > 0).
- **UI/UX**: mensajes de estado vacío, botones con acciones claras.

---

## Instalación y Ejecución

1. Instalar dependencias:

```bash
cd Week-02
pnpm install
```

2. Ejecutar en desarrollo:

```bash
pnpm dev
```

3. Build para producción:

```bash
pnpm build
```
