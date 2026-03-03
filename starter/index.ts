// QUÉ: Implementación de ejemplo para el dominio "Turismo y Hospitalidad"
// PARA: Mostrar entidades y operaciones básicas
// IMPACTO: Plantilla que demuestra tipos, unions/literals y funciones CRUD simples


type RoomType = 'single' | 'double' | 'suite' | 'family';

// QUÉ: Tipos para estados de reserva
// PARA: Modelar el ciclo de vida de una reserva
// IMPACTO: Facilita filtrado y lógica por estado
type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';

// QUÉ: Representa un hotel
// PARA: Agrupar metadatos del establecimiento donde hay habitaciones
// IMPACTO: Permite buscar/hacer filtros por ciudad o rating
interface Hotel {
	id: number;
	name: string;
	city: string;
	rating?: number;
}

// QUÉ: Representa una habitación perteneciente a un hotel
// PARA: Guardar tipo, precio y disponibilidad
// IMPACTO: Base para búsquedas y reservas
interface Room {
	id: number;
	hotelId: number;
	number: string;
	type: RoomType;
	pricePerNight: number;
	available: boolean;
}

// QUÉ: Representa un huésped/cliente
// PARA: Asociar reservas a una persona identificable
// IMPACTO: Soporte para notificaciones y comunicación
interface Guest {
	id: number;
	name: string;
	email: string;
}

// QUÉ: Modelo de reserva que asocia huésped con habitación y fechas
// PARA: Registrar el ciclo de vida de una reserva
// IMPACTO: Permite gestionar disponibilidad y estados administrativos
interface Booking {
	id: number;
	roomId: number;
	guest: Guest;
	checkIn: string;
	checkOut: string;
	status: BookingStatus;
}

let _nextId = 1;
const hotels: Hotel[] = [];
const rooms: Room[] = [];
const bookings: Booking[] = [];

// QUÉ: Generador simple de IDs incrementales en memoria
// PARA: Evitar colisiones de IDs en el ejemplo de arranque
// IMPACTO: No es robusto para producción; en proyectos reales usar UUID o DB autoincrement
function nextId(): number {
	return _nextId++;
}

// QUÉ: Crea un nuevo `Hotel` y lo añade al repositorio en memoria
// PARA: Proveer datos iniciales para pruebas y demostraciones
// IMPACTO: Simplifica el flujo de creación
function createHotel(data: Omit<Hotel, 'id'>): Hotel {
	const h: Hotel = { id: nextId(), ...data };
	hotels.push(h);
	return h;
}

// QUÉ: Crea una `Room` para un `Hotel` dado
// PARA: Registrar disponibilidad y precio por noche
// IMPACTO: Permite luego listar habitaciones disponibles por hotel
function createRoom(data: Omit<Room, 'id'>): Room {
	const r: Room = { id: nextId(), ...data };
	rooms.push(r);
	return r;
}

// QUÉ: Crea una `Booking` y opcionalmente actualiza disponibilidad
// PARA: Registrar reservas con estado inicial
// IMPACTO: Cambia `room.available` cuando la reserva se confirma
function createBooking(data: Omit<Booking, 'id' | 'status'>, initialStatus: BookingStatus = 'pending'): Booking {
	const inDate = new Date(data.checkIn);
	const outDate = new Date(data.checkOut);
	if (isNaN(inDate.getTime()) || isNaN(outDate.getTime()) || inDate >= outDate) {
		throw new Error('Fechas inválidas: checkIn debe ser anterior a checkOut y en formato ISO.');
	}

	const roomExists = rooms.some((r) => r.id === data.roomId);
	if (!roomExists) throw new Error('Room no encontrada para roomId especificado.');

	const b: Booking = { id: nextId(), status: initialStatus, ...data };
	bookings.push(b);
	if (initialStatus === 'confirmed') {
		const room = rooms.find((r) => r.id === b.roomId);
		if (room) room.available = false;
	}
	return b;
}

// QUÉ: Devuelve copia del repositorio de hoteles
// PARA: Evitar que consumidores muten el arreglo original
// IMPACTO: Seguridad básica contra efectos colaterales
function listHotels(): Hotel[] {
	return [...hotels];
}

// QUÉ: Lista habitaciones disponibles, opcionalmente filtradas por `hotelId`
// PARA: Soportar búsquedas de disponibilidad por hotel
// IMPACTO: Base para mostrar opciones al usuario antes de reservar
function listAvailableRooms(hotelId?: number): Room[] {
	return rooms.filter((r) => r.available && (hotelId ? r.hotelId === hotelId : true));
}

// QUÉ: Filtra reservas por su estado
// PARA: Informes y operaciones administrativas
// IMPACTO: Permite tomar acciones en masa sobre reservas filtradas
function filterBookingsByStatus(status: BookingStatus): Booking[] {
	return bookings.filter((b) => b.status === status);
}
