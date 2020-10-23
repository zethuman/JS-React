import React, { ReactElement } from 'react';
import '../cards/cards.css'
import './product-details.css'

interface Props {
    src: string,
    text: string,
    label: string,
    description: string,
}

export default function ProductDetailsItem({src, text, label, description}: Props): ReactElement {

    

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
                    <div>
                    <i className="far fa-thumbs-up" ></i>
                    
                    <i className="far fa-thumbs-down"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
