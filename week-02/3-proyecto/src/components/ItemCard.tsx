import { Item } from '../types';

/**
 * PROPS: ItemCard
 *
 * QUÉ: Defino qué datos recibe este componente (item y funciones).
 * PARA: Poder usar la tarjeta con info de cada reserva.
 * IMPACTO: Hace que el componente sea reutilizable y dinámico.
 */
interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * QUÉ: Es una tarjeta que muestra un elemento (en este caso una reserva).
 * PARA: Ver la info de cada reserva y poder editar/eliminar.
 * IMPACTO: Organiza la información en un formato visual más bonito.
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  // QUÉ: Función que se ejecuta cuando quiero borrar una reserva.
  // PARA: Llamar la función onDelete con el id del item.
  // IMPACTO: Permite eliminar reservas de la lista.
  const handleDelete = () => {
    // Aquí podría poner un confirm() para preguntar antes de borrar
    // if (window.confirm(`¿Eliminar "${item.name}"?`)) {
    //   onDelete(item.id);
    // }

    onDelete(item.id);
  };

  // RENDER

  return (
    <div className="item-card">
      {/* QUÉ: Encabezado de la tarjeta con el nombre */}
      {/* PARA: Mostrar el título principal de la reserva */}
      {/* IMPACTO: Da contexto rápido al usuario */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.name}</h3>

        {/* QUÉ: Aquí podría ir una etiqueta extra */}
        {/* PARA: Mostrar estado o categoría según el dominio */}
        {/* IMPACTO: Hace más visual la información */}
        {/* Ejemplo: Disponible / Ocupado, Categoría, Activo/Inactivo */}
      </div>

      {/* QUÉ: Cuerpo de la tarjeta */}
      {/* PARA: Mostrar más detalles de la reserva */}
      {/* IMPACTO: Da información completa al usuario */}
      <div className="item-card__body">
        {/* Aquí se pueden poner propiedades específicas del dominio */}
        {/* Ejemplo para hotel: habitación, fechas, cliente, precio */}
        <p className="item-card__placeholder">
          TODO: Agregar propiedades de tu dominio aquí
        </p>
      </div>

      {/* QUÉ: Botones de acción */}
      {/* PARA: Editar o eliminar la reserva */}
      {/* IMPACTO: Permite gestionar la información directamente */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item.id)}
          aria-label={`Editar ${item.name}`}>
          ✏️ Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.name}`}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
