import React, { ReactElement, useEffect, useRef } from 'react';
import { skewGallery } from '../animation/skew-gallery';
import '../cards/cards.css';


interface Props {
    src: string, 
    text: string,
    label: string,
}

export default function CardItem({src, text, label}: Props): ReactElement {
    let skewImage = useRef(null);
  
    useEffect(() => {
        skewGallery(skewImage)
    }, []);
    
    return (
            <div className="cards__item" >
                <div className="cards__item__link">
                    <figure className='cards__item__pic-wrap' data-category={label}>
                        <img src={src} alt="Travel" className="cards__item__img" ref={(e: any) => {skewImage = e}}/>
                    </figure>
                    <div className="cards__item__info">
                        <h5 className="cards__item__text">{text}</h5>
                    </div>
                </div>
            </div>  
    )
}
