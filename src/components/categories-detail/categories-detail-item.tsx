import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../contexts/context';
import './categories-detail.css';


interface Props {
    src: string,
    product_id: number,
    text: string,
    label: string,
    description: string,
    category_id: number,
}

export default function CategoriesDetailItem({src, product_id, text, label, description}: Props): ReactElement {

    const context = useContext(Context)

    return (
        <li className="card">
            <Link to={`products/${product_id}`}>
                    <img src={`../${src}`} alt="Travel"/>
            </Link>
            <div className="content">
                <span>{label}</span>
                <h3>
                    <Link to={`products/${product_id}`}>{text}</Link>
                </h3>
                <p>{description}</p>
            </div>
        </li>
    )
}
