# 🌍 Sistema de Turismo y Hospitalidad
## 📖 Descripción
Este proyecto modela un sistema simple de gestión de **turismo y hospitalidad** usando **TypeScript**.  
El objetivo es practicar la definición de entidades, tipos y funciones básicas para representar un dominio real.

## 🏨 Dominio

### Entidad principal
**Hotel** → representa un establecimiento con nombre, ciudad y calificación.

### Entidades relacionadas
**Room** → representa una habitación perteneciente a un hotel, con tipo, precio y disponibilidad.
**Guest** → representa un huésped o cliente.
**Booking** → representa una reserva que asocia un huésped con una habitación y fechas específicas.

---

## ⚙️ Funcionalidades

- Crear hoteles → `createHotel`
- Crear habitaciones → `createRoom`
- Crear reservas → `createBooking`
- Listar hoteles → `listHotels`
- Listar habitaciones disponibles → `listAvailableRooms`
- Filtrar reservas por estado → `filterBookingsByStatus`



## 🧠 Decisiones de diseño

**Type unions** usados para:
Tipo de habitación → `single | double | suite | family`
Estado de la reserva → `pending | confirmed | checked-in | checked-out | cancelled`

IDs incrementales**:
Usados para simplificar la creación de entidades en memoria.

Comentarios en español**:
Formato **QUÉ / PARA / IMPACTO** para explicar cada parte del código.



## 🚀 Ejecución

### 1. Instalar dependencias
bash
pnpm install


### Ejecutar el proyecto
  pnpm dev
