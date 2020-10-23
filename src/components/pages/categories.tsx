import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { category } from '../../mock/categories-mock'
import '../app/App.css'
import { gsap } from 'gsap'


export default function Categories(): ReactElement {

    const headRef = useRef(null);
    let textRef = useRef(null);

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


      return (
        <>
        <div>
            <h1  className="categories" ref={headRef}>Categories</h1>
        </div>
        <div className='cards'>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        {
                            category.map(category=>(
                                <li key={category.category_id} className="cards__item">
                                    <Link to={`categories/${category.category_id}`} className="cards__item__link">
                                        <figure className='cards__item__pic-wrap' data-category={category.label}>
                                            <img src={`../${category.src}`} alt="Travel" className="cards__item__img"/>
                                        </figure>
                                        <div className="cards__item__info">
                                            <h5 className="cards__item__text">{category.text}</h5>
                                        </div>
                                    </Link>
                                </li>   
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
