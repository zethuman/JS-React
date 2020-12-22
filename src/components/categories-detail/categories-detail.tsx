import React, { ReactElement, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from '../api/axios';
import styles from "../app/App.module.css";
// import classes from '../cards/cards.module.css';
import CategoriesDetailItem from './categories-detail-item';
import classes from './categories-detail.module.css';


interface Props {
    fetchUrl: string
}



export default function CategoriesDetail({ fetchUrl }: Props): ReactElement {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState(false)

    const match = useRouteMatch<{ category_id: string }>();

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            console.log(result.data);
            setProducts([...result.data])
            const check = [...result.data].find((item) => item.category_id === parseInt(match.params.category_id))
            setError(!check)
        }

        fetchData();
    }, []);

    if (error) {
        throw new Error("Test error")
    }


    const filteredElements = products.filter((item) =>
        item.category_id === parseInt(match.params.category_id)
    )

    const elements = filteredElements.map((item: any) => {

        const { id, text, label, src, description, category_id } = item;

        return (
            <CategoriesDetailItem src={src} id={id} text={text} label={label} description={description} category_id={category_id} />
        );
    })


    return (
        <>
            <div className={styles.products}>
                <h1 className={styles.h1}>Products</h1>
            </div>
            <div id={classes.product}>
                {elements}
            </div>
        </>
    )
}
