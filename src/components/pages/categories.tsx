import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { category } from '../../mock/categories-mock'
import '../app/App.css'
import { gsap } from 'gsap'
import CategoryItem from '../category-item/category-item'


interface Props {
    
}

export default function Categories({}: Props): ReactElement {

    const headRef = useRef(null);
    let textRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none', delay: 0.1})
    }, [headRef])

    useEffect(() => {
        gsap.from(textRef.current, {duration: 1, autoAlpha:0, ease: "power3.out", y: -64, stagger: {
            amount: 0.15
        }})
    }, [textRef])


    const elements = category.map((item: any) => {
      
        const { src, text,  label, category_id } = item;
        
          return ( <Link to={`categories/${category_id}`} key = {category_id} className="list-group-item">
                      <CategoryItem src={src} text = {text} label={label} category_id={category_id}  />
                  </Link>
            );
      })

    return (
        <>
        <div ref={headRef}>
            <h1 className="categories" ref={textRef}>CATEGORIES</h1>
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
