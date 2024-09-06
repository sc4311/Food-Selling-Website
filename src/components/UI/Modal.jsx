import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({children, open, className = ''}) {
    const dialog = useRef();

    useEffect(() => {
        const effect = dialog.current;
        if(open){
            effect.showModal();
        }

        return() => effect.close();
    }, [open]);
    return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>, 
    document.getElementById('modal')
    );
}