import { Reservation } from '../types';

/**
 * PROPS: ReservationCard
 */
interface ReservationCardProps {
  reservation: Reservation;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ReservationCard
 *
 * Tarjeta individual para mostrar una reserva hotelera.
 */
const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar reserva ${reservation.reservationNumber}?`)) {
      onDelete(reservation.id);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">🏨 {reservation.reservationNumber}</h3>

        {/* Badge de estado */}
        <span
          className={`badge badge--${
            reservation.status === 'completada'
              ? 'success'
              : reservation.status === 'en curso'
              ? 'info'
              : reservation.status === 'cancelada'
              ? 'danger'
              : 'warning'
          }`}
        >
          {reservation.status}
        </span>
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        <p><strong>Huésped:</strong> {reservation.guestName}</p>
        <p><strong>Habitación:</strong> {reservation.roomType}</p>
        <p><strong>Check-in:</strong> {reservation.checkIn}</p>
        <p><strong>Check-out:</strong> {reservation.checkOut}</p>
        <p><strong>Precio/noche:</strong> ${reservation.pricePerNight.toLocaleString()} COP</p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(reservation.id)}
          aria-label={`Editar reserva ${reservation.reservationNumber}`}
        >
          Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar reserva ${reservation.reservationNumber}`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
