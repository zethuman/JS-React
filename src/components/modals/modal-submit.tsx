import React, { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';

interface Props {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export default function ModalSubmit({ open, onClose, children }: Props): ReactElement {

    if (!open) return <></>;

    return createPortal(
        <>
            <div className="overlay_submit">
                <div className="form_submit">
                    {children}
                </div>
                <i className="fas fa-times x" onClick={onClose}></i>
            </div>
        </>,
        document.getElementById('portal-submit') as Element
    )
}

