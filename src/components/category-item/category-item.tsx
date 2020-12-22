import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    src: string,
    text: string,
    label: string,
    category_id: number
}

export default function CategoryItem({ src, text, label, category_id }: Props): ReactElement {


    return (
        <li key={src}>
            <Link to={`categories/${category_id}`} className="cards__item__link">
                <figure className='cards__item__pic-wrap' data-category={label}>
                    <img src={`../${src}`} alt="Travel Image" className="cards__item__img" />
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{text}</h5>
                </div>
            </Link>
        </li>
    )
}
