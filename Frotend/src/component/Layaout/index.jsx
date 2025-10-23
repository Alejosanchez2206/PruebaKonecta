import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import './index.css';

const navItems = [
  { name: 'Dashboard', link: '/dashboard', icon: 'bi-app' },
  { name: 'Ventas', link: '/ventas', icon: 'bi-bag' },
  { name: 'Usuarios', link: '/usuarios', icon: 'bi-person' },
  { name : 'Empresa', link: '/empresas', icon: 'bi-building' }
];

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <button type="button" 
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