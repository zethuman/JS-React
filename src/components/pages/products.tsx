import { gsap } from 'gsap';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import '../../components/cards/cards.css';
import ProductItem from '../product-item/product-item';
import axios from '../api/axios';


interface Props{
    fetchUrl: string;
}

export default function Products({fetchUrl}: Props): ReactElement {

    const headRef = useRef(null);
    const textRef = useRef(null);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            console.log(result.data);
            setProducts([ ...result.data])
        }

        fetchData();
    }, []);

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
             <ProductItem key={uuid()}  src={src} product_id={product_id} text = {text} label={label} description={description} category_id={category_id}  />);
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
