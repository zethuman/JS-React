import { stringify } from 'querystring';
import React, { ReactElement, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { products } from '../../mock/products-mock';
import { Comments } from '../../modules/comments';
import CommentsShow from '../comments-show/comments-show';
import CommentsList from '../comments/comments-list';
import { Context } from '../contexts/context';
import ProductDetailsItem from './product-details-item';

interface Props {

}

export default function ProductDetails({}: Props): ReactElement {

    const initComments: Comments[] = [];

    const match = useRouteMatch<{product_id: string}>();
    console.log(match.params.product_id)

     const filteredElements = products.filter((item)=>
          item.product_id === parseInt(match.params.product_id)
    )

      const elements = filteredElements.map((item: any) => {
      
        const { src, product_id, text, label, description, category_id } = item;
        
          return ( <li key = {product_id} className="list-group-item">
                      <ProductDetailsItem src={src} text = {text} label={label} description={description} />
                  </li>
            );
      })

      const [comments, setComments] = useState(initComments)
      
      const onChange = (comment: Comments) => {
            setComments([...comments, comment])
      }

      const commentsElements = comments.map((item: any) => {
      
        const { comments_id, comment, username, product_id} = item;
        
          return ( <li key = {product_id} className="list-group-item">
                      <CommentsShow comment={comment} username={username}  />
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
            <CommentsList onChange={onChange} product_id={parseInt(match.params.product_id)}/> 
        </div>

        <div>
           {commentsElements}
        </div>
        </>
    )
}
