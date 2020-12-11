import React, { ReactElement, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import CategoriesDetailItem from './categories-detail-item';
import './categories-detail.css';
import axios from '../api/axios';

interface Props{
  fetchUrl: string
}



export default function CategoriesDetail({fetchUrl}: Props): ReactElement {
    const [products, setProducts] = useState<any[]>([]);

    const match = useRouteMatch<{category_id: string}>();

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            console.log(result.data);
            setProducts([ ...result.data])
        }
    
        fetchData();
    }, []);
    

     const filteredElements = products.filter((item)=>
          item.category_id === parseInt(match.params.category_id)
    )

      const elements = filteredElements.map((item: any) => {
      
        const { product_id, text, label, src,  description, category_id } = item;
        
          return (
                      <CategoriesDetailItem src={src} product_id={product_id} text = {text} label={label} description={description} category_id={category_id}  />
            );
      })


    return (
        <>
            <div>
                <h1  className="products">Products</h1>
            </div>
            <div id="product">
                {elements}
            </div>
        </>
    )
}
