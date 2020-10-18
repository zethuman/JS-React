import React, { ReactElement } from 'react'
import CardItem from '../card-item/card-item'
import './cards.css'

interface Props {
    
}


export default function Cards({}: Props): ReactElement {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                        src='images/img-9.jpg'
                        text='Waterfall sd,cbsdj csd ckjsdkc c skdbjckjdsncj sdjcsdkjb'
                        label='Adventure'
                        path='services'
                        />
                        <CardItem 
                        src='images/img-2.jpg'
                        text='Bali sd,cbsdj csd ckjsdkc c skdbjckjdsncj sdjcsdkjb'
                        label='Adventure'
                        path='services'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                        src='images/img-6.jpg'
                        text='Waterfall sd,cbsdj csd ckjsdkc c skdbjckjdsncj sdjcsdkjb'
                        label='Adventure'
                        path='services'
                        />
                        <CardItem 
                        src='images/img-3.jpg'
                        text='Bali sd,cbsdj csd ckjsdkc c skdbjckjdsncj sdjcsdkjb'
                        label='Adventure'
                        path='services'
                        />
                        <CardItem 
                        src='images/img-4.jpg'
                        text='Bali sd,cbsdj csd ckjsdkc c skdbjckjdsncj sdjcsdkjb'
                        label='Adventure'
                        path='services'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
