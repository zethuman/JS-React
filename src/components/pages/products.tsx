import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { products } from '../../mock/products-mock';
import '../../components/cards/cards.css'
import ProductItem from '../product-item/product-item';
import { gsap } from 'gsap'


interface Props {
    
}

export default function Products({}: Props): ReactElement {

    const headRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none', delay: 1})
    }, [headRef])

    useEffect(() => {
        gsap.from(textRef.current, {duration: 1, autoAlpha:0, ease: "power3.out", y: -64, stagger: {
            amount: 0.15
        }})
    }, [textRef])



    const elements = products.map((item: any) => {
      
        const { src, product_id,  text,  label, description, category_id } = item;
        
          return ( 
                      <ProductItem src={src} product_id={product_id} text = {text} label={label} description={description} category_id={category_id}  />);
      })

    return (
        <>
        <div>
            <h1  className="products" ref={textRef}>Products</h1>
        </div>
        <div className='cards'>
            <div className="cards__container">
                <div className="cards__wrapper" ref={headRef}>
                    <ul className="cards__items">
                        {elements}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
