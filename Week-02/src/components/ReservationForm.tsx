import { useState, useEffect } from 'react';
import { Reservation } from '../types';

/**
 * PROPS: ReservationForm
 */
interface ReservationFormProps {
  onAdd: (reservation: Omit<Reservation, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Reservation>) => void;
  editingReservation?: Reservation;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: ReservationForm
 *
 * Formulario para agregar o editar reservas hoteleras.
 * Se adapta automáticamente según si hay una reserva siendo editada.
 */
const ReservationForm: React.FC<ReservationFormProps> = ({
  onAdd,
  onUpdate,
  editingReservation,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================
  const initialState: Omit<Reservation, 'id'> = {
    reservationNumber: '',
    guestName: '',
    roomType: 'single',
    status: 'pendiente',
    checkIn: '',
    checkOut: '',
    pricePerNight: 0,
  };

  const [formData, setFormData] = useState<Omit<Reservation, 'id'>>(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================
  useEffect(() => {
    if (editingReservation) {
      const { id, ...rest } = editingReservation;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingReservation]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'pricePerNight' ? Number(value) : value });
  };

  const validate = (): boolean => {
    if (!formData.reservationNumber.trim()) {
      alert('El número de reserva es requerido');
      return false;
    }
    if (!formData.guestName.trim()) {
      alert('El nombre del huésped es requerido');
      return false;
    }
    if (!formData.checkIn) {
      alert('La fecha de check-in es requerida');
      return false;
    }
    if (!formData.checkOut) {
      alert('La fecha de check-out es requerida');
      return false;
    }
    if (formData.pricePerNight <= 0) {
      alert('El precio por noche debe ser mayor a 0');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingReservation) {
      onUpdate(editingReservation.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="form-container">
      <h2>{editingReservation ? '✏️ Editar Reserva' : '➕ Agregar Reserva'}</h2>

      <form onSubmit={handleSubmit} className="item-form">
        {/* Número de reserva */}
        <div className="form-group">
          <label htmlFor="reservationNumber">Número de Reserva *</label>
          <input
            type="text"
            id="reservationNumber"
            name="reservationNumber"
            value={formData.reservationNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nombre del huésped */}
        <div className="form-group">
          <label htmlFor="guestName">Nombre del Huésped *</label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tipo de habitación */}
        <div className="form-group">
          <label htmlFor="roomType">Tipo de Habitación *</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          >
            <option value="single">Individual</option>
            <option value="double">Doble</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="status">Estado *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="confirmada">Confirmada</option>
            <option value="en curso">En curso</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        {/* Check-in */}
        <div className="form-group">
          <label htmlFor="checkIn">Fecha de Check-in *</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </div>

        {/* Check-out */}
        <div className="form-group">
          <label htmlFor="checkOut">Fecha de Check-out *</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        {/* Precio por noche */}
        <div className="form-group">
          <label htmlFor="pricePerNight">Precio por Noche (COP) *</label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            min={1}
            step={1000}
            required
          />
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingReservation ? 'Actualizar' : 'Agregar'}
          </button>

          {editingReservation && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
