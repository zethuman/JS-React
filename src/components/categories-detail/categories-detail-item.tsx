import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
// import classes from '../cards/cards.module.css';
import classes from './categories-detail.module.css';


interface Props {
    src: string,
    id: number,
    text: string,
    label: string,
    description: string,
    category_id: number,
}

export default function CategoriesDetailItem({ src, id, text, label, description }: Props): ReactElement {


    return (
        <li className={classes.card} key={id}>
            <Link to={`products/${id}`} >
                <img src={`${src}`} alt="Travel" />
            </Link>
            <div className={classes.content}>
                <span>{label}</span>
                <h3>
                    <Link to={`products/${id}`}>{text}</Link>
                </h3>
                <p>{description}</p>
            </div>
        </li>
    )
}
