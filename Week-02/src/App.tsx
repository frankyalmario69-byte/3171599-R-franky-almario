import { useState } from 'react';
import { Reservation } from './types';
import Header from './components/Header';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';

/**
 * COMPONENTE PRINCIPAL: App
 *
 * Gestiona el estado global de la aplicación de reservas hoteleras
 * y coordina la comunicación entre componentes hijos.
 */
const App = () => {
  // ============================================
  // ESTADO PRINCIPAL
  // ============================================

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ============================================
  // FUNCIONES CRUD
  // ============================================

  /**
   * Agregar nueva reserva
   */
  const addReservation = (reservation: Omit<Reservation, 'id'>): void => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now(),
    };
    setReservations([...reservations, newReservation]);
  };

  /**
   * Actualizar reserva existente
   */
  const updateReservation = (id: number, updates: Partial<Reservation>): void => {
    setReservations(
      reservations.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  /**
   * Eliminar reserva
   */
  const deleteReservation = (id: number): void => {
    setReservations(reservations.filter((r) => r.id !== id));
  };

  /**
   * Preparar reserva para edición
   */
  const startEdit = (id: number): void => {
    setEditingId(id);
  };

  /**
   * Cancelar edición
   */
  const cancelEdit = (): void => {
    setEditingId(null);
  };

  // ============================================
  // ELEMENTO SIENDO EDITADO
  // ============================================

  const reservationToEdit = editingId
    ? reservations.find((r) => r.id === editingId)
    : undefined;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      <Header />

      <div className="container">
        <ReservationForm
          onAdd={addReservation}
          onUpdate={updateReservation}
          editingReservation={reservationToEdit}
          onCancelEdit={cancelEdit}
        />

        <ReservationList
          reservations={reservations}
          onDelete={deleteReservation}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;
