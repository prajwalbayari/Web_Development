import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);
  
  const handleClose = () => {
    setIsClosing(true);
    // Wait for the animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280); // Slightly less than animation duration
  };
  
  if (!isOpen) {
    return null;
  }
  
  // Prevent clicks inside the modal body from closing the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return createPortal(
    <div className={`modal ${isClosing ? "closing" : ""}`}>
      <div className="overlay" onClick={handleClose}></div>
      <div className="modal-body" onClick={handleModalClick}>
        {children}
      </div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
}
