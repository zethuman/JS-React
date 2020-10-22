import React, { ReactElement } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { products } from '../../mock/products';
import Comments from '../comments/comments';
import ProductDetailsItem from './product-details-item';

interface Props {

}

export default function ProductDetails({}: Props): ReactElement {

    const match = useRouteMatch<{product_id: string}>();
    console.log(match.params.product_id)

     const filteredElements = products.filter((item)=>
          item.product_id === parseInt(match.params.product_id)
    )

      const elements = filteredElements.map((item: any) => {
      
        const { src, product_id, text, label, description, category_id } = item;
        
          return ( <li key = {product_id} className="list-group-item">
                      <ProductDetailsItem src={src} product_id={product_id} text = {text} label={label} description={description} category_id={category_id}  />
                  </li>
            );
      })


    return (
        <>
        <div>
            <h1  className="categories">Products</h1>
        </div>
        <div className='cards'>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        {elements}
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <Comments /> 
        </div>
        </>
    )
}
