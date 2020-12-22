import React, { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classes from './modal.module.css';


interface Props {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export default function ModalShare({open, onClose, children}: Props): ReactElement {
    
    if(!open) return <></>;

    return createPortal(
        <>
            <div className={classes.overlay}>
                <div className={classes.form_share}>
                    {children}
                </div>
               <i className={`fas fa-times ${classes.x}`} onClick={onClose}></i>
            </div>       
        </>,
        document.getElementById('portal-share') as Element
    )
}


// {/* <button onClick={() => setIsOpen(true)} className="logo">Show</button>
// <div style={{zIndex: 1}}>
//   <Modal open={isOpen}  onClose={() => setIsOpen(false)} >
//   <div className="details">
//       <img src={`../../${src}`} alt="Travel"/>
//       <div className="box">
//           <div className="row">
//               <h2>{text}</h2>
//           </div>
//           <p>{description}</p>
//           <div className='download'>
//               <a href={`../../${src}`} download>
//                   <p>Download <i className="fas fa-download"/> </p>
//               </a>
//           </div>
//           <div className="rate">
//           <i className="far fa-thumbs-up"  onClick={handleClick}></i>
//               <span className="rating">{rating ? (Math.ceil((rating)*100)/100): 0}</span>
//           <i className="far fa-thumbs-down"  onClick={handleCount}></i>
//           </div>
//       </div>
//   </div>
//   </Modal>
// </div> */}