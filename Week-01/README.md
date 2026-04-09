## Sistema de Reservas Hoteleras
## Descripción
Este proyecto modela un sistema simple de reservas hoteleras usando TypeScript.
El objetivo es practicar la definición de entidades, tipos y funciones básicas para representar un dominio real.

## Dominio
Entidad principal: Reservation → representa una reserva con huésped, habitación, fechas de check-in/check-out y estado.

Entidades relacionadas:

Guest → define al huésped que realiza la reserva (nombre, email, teléfono).

Room → representa la habitación asignada (número, tipo, precio por noche).

## Funcionalidades
Crear nuevas reservas (createReservation)

Listar todas las reservas (listReservations)

Filtrar reservas por estado (filterByStatus)

## Decisiones
ID como string: porque los códigos de reserva reales suelen ser alfanuméricos (ejemplo: RES001).

Type unions: usados para el estado de la reserva (pending | confirmed | checked-in | checked-out | cancelled) y el tipo de habitación (single | double | suite | deluxe).

Comentarios: escritos en español con formato QUÉ, PARA, IMPACTO para explicar cada parte del código.

## Ejecución
bash
pnpm install
pnpm start

## Checklist
[] Definí interfaces para las entidades principales

[] Usé type unions y literales

[] Implementé funciones tipadas para operaciones básicas

[] Probé el código con datos de ejemplo

[] El proyecto compila y se ejecuta sin errores