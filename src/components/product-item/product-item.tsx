import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom'
import './product-item.css'

interface Props {
    src: string, 
    product_id: number,
    text: string,
    label: string,
    description: string,
    category_id: number
}

export default function ProductItem({src, product_id, text, label, description}: Props): ReactElement {

    return (
        <li className="card" key={product_id}>
            <Link to={`products/${product_id}`}>
                    <img src={`../../${src}`} alt="Travel"/>
                <div className="content">
                    <span>{label}</span>
                    <h3>
                        <Link to={`products/${product_id}`}>{text}</Link>
                    </h3>
                    <p>{description}</p>
                </div>
            </Link>
        </li>
    )
}
