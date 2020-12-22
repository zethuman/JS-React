import { gsap } from 'gsap';
import React, { lazy, ReactElement, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import axios from '../api/axios';
import classes from "../app/App.module.css";
import styles from '../product-item/product-item.module.css';

const ProductItem = lazy(() => import('../product-item/product-item'));

interface Props {
    fetchUrl: string;
}

export default function Products({ fetchUrl }: Props): ReactElement {

    const headRef = useRef(null);
    const textRef = useRef(null);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            console.log(result.data);
            setProducts([...result.data])
        }

        fetchData();
    }, []);

    useEffect(() => {
        gsap.from(headRef.current, {
            duration: 2, ease: "bounce.out", y: -154, stagger: {
                amount: 0.15
            }
        })
    }, [headRef])

    useEffect(() => {
        gsap.from(textRef.current, {
            duration: 1, autoAlpha: 0, ease: "power3.out", y: -64, stagger: {
                amount: 0.15
            }
        })
    }, [textRef])



    const elements = useMemo(() => products.map((item: any) => {

        const { src, id, text, label, description } = item;

        return (
            <ProductItem key={id} src={src} id={id} text={text} label={label} description={description} />);
    }), [products]
    );

    return (
        <>
            <div className={classes.products}>
                <h1 className={classes.h1} ref={headRef}>Products</h1>
            </div>
            <div id={styles.product}>
                <Suspense fallback={<h1>Loading products...</h1>}>
                    {elements}
                </Suspense>
            </div>
        </>
    )
}
