import { useState, useEffect } from 'react';
import { Item } from '../types';

/**
 * PROPS: ItemForm
 *
 * QUÉ: Define qué recibe este formulario (funciones y datos).
 * PARA: Poder agregar o editar reservas hoteleras.
 * IMPACTO: Hace que el formulario sea flexible y reutilizable.
 */
interface ItemFormProps {
  onAdd: (item: Omit<Item, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Item>) => void;
  editingItem?: Item;
  onCancelEdit: () => void;
}


// ESTADO INICIAL

const initialState: Omit<Item, 'id'> = {
  name: '',
  email: '',
  hotelName: '',
  roomType: 'standard',
  checkIn: '',
  checkOut: '',
  guests: 1,
};

/**
 * COMPONENTE: ItemForm
 *
 * QUÉ: Formulario para agregar o editar reservas.
 * PARA: Capturar datos de huéspedes y reservas.
 * IMPACTO: Permite gestionar la información del hotel.
 */
const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  onUpdate,
  editingItem,
  onCancelEdit,
}) => {
  // ESTADO DEL FORMULARIO
  const [formData, setFormData] = useState<Omit<Item, 'id'>>(initialState);

  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      alert('El nombre del huésped es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      alert('El email es requerido');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('El email no es válido');
      return false;
    }
    if (!formData.hotelName.trim()) {
      alert('El nombre del hotel es requerido');
      return false;
    }
    if (!formData.checkIn || !formData.checkOut) {
      alert('Las fechas de check-in y check-out son requeridas');
      return false;
    }
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert('La fecha de check-out debe ser posterior al check-in');
      return false;
    }
    if (formData.guests < 1) {
      alert('Debe haber al menos 1 huésped');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingItem) {
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }
    setFormData(initialState);
  };

  // RENDER
  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Editar Reserva' : '➕ Agregar Reserva'}</h2>

      <form onSubmit={handleSubmit} className="item-form">
        {/* Nombre del huésped */}
        <div className="form-group">
          <label htmlFor="name">Nombre del huésped *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
            required
          />
        </div>

        {/* Hotel */}
        <div className="form-group">
          <label htmlFor="hotelName">Hotel *</label>
          <input
            type="text"
            id="hotelName"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            placeholder="Ej: Hotel Paraíso"
            required
          />
        </div>

        {/* Tipo de habitación */}
        <div className="form-group">
          <label htmlFor="roomType">Tipo de habitación *</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleSelectChange}
          >
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="presidencial">Presidencial</option>
          </select>
        </div>

        {/* Check-in */}
        <div className="form-group">
          <label htmlFor="checkIn">Check-in *</label>
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
          <label htmlFor="checkOut">Check-out *</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>

        {/* Número de huéspedes */}
        <div className="form-group">
          <label htmlFor="guests">Número de huéspedes *</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Actualizar' : 'Agregar'}
          </button>

          {editingItem && (
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

export default ItemForm;
