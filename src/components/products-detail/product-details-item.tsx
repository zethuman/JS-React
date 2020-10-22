import React, { ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import '../cards/cards.css'
import Comments from '../comments/comments-list';

interface Props {
    src: string,
    text: string,
    label: string,
    description: string,
}

export default function ProductDetailsItem({src, text, label, description}: Props): ReactElement {

    const match = useRouteMatch();
    console.log(src)

    return (
        <>
        <li className="cards__item">
            <li className="cards__item__link">
                <figure className='cards__item__pic-wrap' data-category={label}>
                    <img src={`../../${src}`} alt="Lol" className="cards__item__img"/>
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{text}</h5>
                    <h5 className="cards__item__text">{description}</h5>
                </div>
            </li>
        </li>
    </>
    )
}
