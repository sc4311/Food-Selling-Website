import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={handleClose}>
            {children}
        </dialog>,
        document.getElementById('modal') // Assuming there's a div with id="modal" in your HTML
    );
}
