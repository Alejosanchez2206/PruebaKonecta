import './index.css';

export default function Header({ icon, title  , actionsNew}) {
  return (
    <header className="app-header">
      <i className={`bi ${icon} header-icon`}></i>
      <span className="header-title">{title}</span>
      <div className="header-actions">
        {/* Future action buttons can be added here */}
        <button
          className="header-action-button"
          onClick={actionsNew}
        >
          <i className="bi bi-plus"></i>
          Nuevo
        </button>
      </div>
    </header>
  );
}