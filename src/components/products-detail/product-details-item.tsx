import React, { ReactElement, useState } from 'react';
import '../cards/cards.css'
import './product-details.css'

interface Props {
    src: string,
    text: string,
    label: string,
    description: string,
}

export default function ProductDetailsItem({src, text, label, description}: Props): ReactElement {

    const [like, setLike] = useState(0)
    const [count, setCount] = useState(0)

    sessionStorage.setItem('rating', (like/count).toString())
    
    let rating = parseFloat(sessionStorage.getItem('rating') || '{}')

    const handleClick = (e:any) => {
        e.preventDefault();
        setLike(like+5); setCount(count + 1)
    }

    return (
        <>
            <div className="details">
                <img src={`../../${src}`} alt="Travel"/>
                <div className="box">
                    <div className="row">
                        <h2>{text}</h2>
                    </div>
                    <p>{description}</p>
                    <div className='download'>
                        <a href={`../../${src}`} download>
                            <p>Download <i className="fas fa-download"/> </p>
                        </a>
                    </div>
                    <div className="rate">
                    <i className="far fa-thumbs-up"  onClick={handleClick}></i>
                        <span className="rating">{rating ? (Math.ceil((rating)*100)/100): 0}</span>
                    <i className="far fa-thumbs-down" onClick={() => { setLike(like+0); setCount(count + 1)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}
