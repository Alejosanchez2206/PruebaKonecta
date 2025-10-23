import './index.css';

export default function HeaderSimple({ icon, title }) {
  return (
    <header className="app-header">
      <i className={`bi ${icon} header-icon`}></i>
      <span className="header-title">{title}</span>
    </header>
  );
}