import React, { ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import '../cards/cards.css'
import Comments from '../comments/comments';

interface Props {
    src: string,
    product_id: number,
    text: string,
    label: string,
    description: string,
    category_id: number,
}

export default function ProductDetailsItem({src, product_id, text, label, description, category_id}: Props): ReactElement {

    const match = useRouteMatch();

    return (
        <>
        <li className="cards__item">
                <figure className='cards__item__pic-wrap' data-category={label}>
                    <img src={src} alt="Travel Image" className="cards__item__img"/>
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{text}</h5>
                    <h5 className="cards__item__text">{description}</h5>
                </div>
        </li>
    </>
    )
}
