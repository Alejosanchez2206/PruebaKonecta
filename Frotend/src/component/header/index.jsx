import './index.css';

export default function Header({ icon, title, actionsNew, nameAction }) {
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
          {nameAction || 'Nuevo'}
        </button>
      </div>
    </header>
  );
}