import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import classes from './product-item.module.css';

interface Props {
    src: string,
    id: number,
    text: string,
    label: string,
    description: string,
}

export default function ProductItem({ src, id, text, label, description }: Props): ReactElement {

    return (
        <React.Fragment key={uuid()}>
            <li className={classes.card} key={id}>
                <Link to={`products/${id}`}>
                    <img src={`${src}`} alt="Travel" />
                    <div className={classes.content}>
                        <span>{label}</span>
                        <h3>
                            {text}
                        </h3>
                        <p>{description}</p>
                    </div>
                </Link>
            </li>
        </React.Fragment>
    )
}
