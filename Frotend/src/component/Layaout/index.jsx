import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router";
import './index.css';

const allNavItems = [
  { name: 'Dashboard', link: '/dashboard', icon: 'bi-app', roles: [1] },
  { name: 'Ventas', link: '/ventas', icon: 'bi-bag', roles: [1, 2] },
  { name: 'Usuarios', link: '/usuarios', icon: 'bi-person', roles: [1] },
];

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Obtener el usuario del localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const rolId = parseInt(user.rol_id, 10);
      setUserRole(rolId);

      // Filtrar los items del menú según el rol
      const filteredItems = allNavItems.filter(item =>
        item.roles.includes(rolId)
      );
      setNavItems(filteredItems);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <div className="layout-container">
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-inner">
          <header className="sidebar-header">
            <button
              type="button"
              className="sidebar-burger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
            </button>
          </header>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
            <button
              type="button"
              className="nav-button settings-button"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Cerrar sesión</span>
            </button>
          </nav>
        </div>
      </aside>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;