import React, { ReactElement, useEffect, useRef } from 'react';
import { skewGallery } from '../animation/skew-gallery';
import classes from '../cards/cards.module.css'

interface Props {
    src: string, 
    text: string,
    label: string,
}

export default function CardItem({src, text, label}: Props): ReactElement {
    // let skewImage = useRef(null);
    // ref={(e: any) => {skewImage = e}}
  
    // useEffect(() => {
    //     skewGallery(skewImage)
    // }, []);
    
    return (
            <div className={classes.cards__item} >
                <div className={classes.cards__item__link}>
                    <figure className={classes.cards__item__pic_wrap} data-category={label}>
                        <img src={src} alt="Travel" className={classes.cards__item__img} />
                    </figure>
                    <div className={classes.cards__item__info}>
                        <h5 className={classes.cards__item__text}>{text}</h5>
                    </div>
                </div>
            </div>  
    )
}
