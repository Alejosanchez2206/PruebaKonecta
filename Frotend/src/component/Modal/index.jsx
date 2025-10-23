import { useEffect, useRef } from "react";
import "./modal.css";
export function Modal({ isOpen, onClose, title, children}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Abrir o cerrar el modal según el estado
    if (isOpen) {
      dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }

    // Cerrar con tecla ESC
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Cerrar cuando se haga clic fuera del contenido (backdrop)
  const handleBackdropClick = (e) => {
    const dialog = dialogRef.current;
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!clickedInDialog) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onCancel={onClose}
      onClick={handleBackdropClick}
    >
      <div className="modal-content">
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </header>
        <section className="modal-body">{children}</section>
      </div>
    </dialog>
  );
}
