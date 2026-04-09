import { Reservation } from '../types';
import ReservationCard from './ReservationCard';

/**
 * PROPS: ReservationList
 */
interface ReservationListProps {
  reservations: Reservation[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ReservationList
 *
 * Renderiza la lista de reservas hoteleras usando .map()
 */
const ReservationList: React.FC<ReservationListProps> = ({ reservations, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (reservations.length === 0) {
    return (
      <div className="empty-state">
        <p>🏨 No hay reservas para mostrar</p>
        <p className="empty-state__hint">
          Agrega tu primera reserva usando el formulario de arriba
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE RESERVAS
  // ============================================
  return (
    <div className="item-list">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ReservationList;
