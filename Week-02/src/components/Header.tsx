/**
 * COMPONENTE: Header
 *
 * Muestra el título y descripción de la aplicación.
 * Dominio: Sistema de Reservas Hoteleras
 */

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>🏨 Sistema de Reservas Hoteleras</h1>
      <p>
        Gestiona reservas, huéspedes y habitaciones con React + TypeScript
      </p>
    </header>
  );
};

export default Header;
