import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { category } from '../../mock/category'
import '../app/App.css'
import CategoryItem from '../category-item/category-item'


interface Props {
    
}

export default function Categories({}: Props): ReactElement {
    const elements = category.map((item: any) => {
      
        const { src, text,  label, category_id } = item;
        
          return ( <Link to={`categories/${category_id}`} key = {category_id} className="list-group-item">
                      <CategoryItem src={src} text = {text} label={label} category_id={category_id}  />
                  </Link>
            );
      })

    return (
        <>
        <div>
            <h1  className="categories">CATEGORIES</h1>
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
        </>
    )
}
