import React, { ReactElement, useEffect, useRef } from 'react'
import { products } from '../../mock/products-mock';
import '../../components/cards/cards.css'
import ProductItem from '../product-item/product-item';
import { gsap } from 'gsap'

export default function Products(): ReactElement {

    const headRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 2, ease: "bounce.out", y: -154, stagger: {
            amount: 0.15
        }})
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
            <div ref={headRef}>
                <h1  className="products">Products</h1>
            </div>
            <div id="product">
                {elements}
            </div>
        </>
    )
}
