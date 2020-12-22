import React, { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './modal.module.css';


interface Props {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export default function ModalLogin({ open, onClose, children }: Props): ReactElement {

    if (!open) return <></>;

    return createPortal(
        <>
            <div className={classes.overlay}>
                <div className={classes.form_login}>
                    {children}
                </div>
                <i className={`fas fa-times ${classes.x}`} onClick={onClose}></i>
            </div>
        </>,
        document.getElementById('portal-info') as Element
    )
}

