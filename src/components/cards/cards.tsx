import React, { ReactElement } from 'react'
import CardItem from '../card-item/card-item'
import './cards.css'


export default function Cards(): ReactElement {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                        src='images/img-9.jpg'
                        text='Waterfalls'
                        label='mortals'
                        />
                        <CardItem 
                        src='images/img-2.jpg'
                        text='Beaches'
                        label='adventure'
                  
                        />
                    </ul>
                    <ul className="cards__items small">
                        <CardItem 
                        src='images/img-6.jpg'
                        text='Cultures'
                        label='culture'
                   
                        />
                        <CardItem 
                        src='images/img-3.jpg'
                        text='Seas'
                        label='adventure'
                      
                        />
                        <CardItem 
                        src='images/img-4.jpg'
                        text='Islands'
                        label='adventure'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}