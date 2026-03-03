import { Item } from '../types';
import ItemCard from './ItemCard';

/**
 * PROPS: ItemList
 *
 * QUÉ: Define qué datos recibe este componente.
 * PARA: Pasar la lista de reservas y funciones de edición/eliminación.
 * IMPACTO: Hace que la lista sea dinámica y controlada desde afuera.
 */
interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemList
 *
 * QUÉ: Renderiza una lista de reservas usando .map().
 * PARA: Mostrar todas las reservas creadas en tarjetas.
 * IMPACTO: Permite ver y gestionar varias reservas a la vez.
 */
const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  // QUÉ: Si no hay reservas, muestro un mensaje vacío.
  // PARA: Que el usuario sepa que aún no hay datos.
  // IMPACTO: Mejora la experiencia y no deja la pantalla en blanco.
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Realiza tu primera reserva.</p>
        <p className="empty-state__hint">
          @2026 Sistema de Reservas Hoteleras.
        </p>
      </div>
    );
  }

  // RENDER: LISTA DE ELEMENTOS

  return (
    <div className="item-list">
      {/* QUÉ: Uso .map() para recorrer la lista de reservas */}
      {/* PARA: Crear un ItemCard por cada reserva */}
      {/* IMPACTO: Hace que la lista se muestre automáticamente según los datos */}
      {items.map((item) => (
        <ItemCard
          key={item.id} // QUÉ: key única
          item={item}   // PARA: pasar los datos de la reserva
          onDelete={onDelete} // IMPACTO: permite borrar desde la tarjeta
          onEdit={onEdit}     // IMPACTO: permite editar desde la tarjeta
        />
      ))}
    </div>
  );
};

export default ItemList;
