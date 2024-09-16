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
        if (onClose && typeof onClose === 'function') {
            onClose(); // Ensure onClose is a function before calling it
        } else {
            console.error("onClose is not a valid function.");
        }
    };

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
            <div>
                {children}
            </div>
            {/* Add a close button to explicitly close the modal */}
            
        </dialog>,
        document.getElementById('modal') // Assuming there's a div with id="modal" in your HTML
    );
}
