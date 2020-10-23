import React, { ReactElement, useEffect, useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import '../cards/cards.css'
import  { gsap } from 'gsap';

interface Props {
    src: string, 
    text: string,
    label: string,
    path: string,
}

export default function CardItem({src, text, label, path}: Props): ReactElement {

    const match = useRouteMatch();
    const headRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none', delay: 0.1})
    }, [headRef])

    return (
        <>
            <li className="cards__item" ref={headRef}>
                <Link to= {path} className="cards__item__link">
                    <figure className='cards__item__pic-wrap' data-category={label}>
                        <img src={src} alt="Travel Image" className="cards__item__img"/>
                    </figure>
                    <div className="cards__item__info">
                        <h5 className="cards__item__text">{text}</h5>
                    </div>
                </Link>
            </li>   
        </>
    )
}
