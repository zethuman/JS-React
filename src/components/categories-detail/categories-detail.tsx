import React, { ReactElement } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { products } from '../../mock/products-mock';
import CategoriesDetailItem from './categories-detail-item';
import './categories-detail.css';


export default function CategoriesDetail(): ReactElement {

    const match = useRouteMatch<{category_id: string}>();

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
