import React, { ReactElement } from 'react'
import '../app/App.css'
import CardItem from '../card-item/card-item'

interface Props {
    
}

export default function Categories({}: Props): ReactElement {
    return (
        <div className='cards'>
            <h1>Categories</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                        src='images/img-9.jpg'
                        text="People skdcbksd sdcbkjdhbc asjhdckjasbdc bcasdjhbcljsdbcla cdjsbcljhdsbcalj "
                        label='People'
                        path='people'
                        />
                        <CardItem 
                        src='images/img-2.jpg'
                        text='Things                                                                         '
                        label='Things'
                        path='things'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                        src='images/img-6.jpg'
                        text='Adventure'
                        label='Adventure'
                        path='adventure'
                        />
                        <CardItem 
                        src='images/img-3.jpg'
                        text='Arts'
                        label='Arts'
                        path='arts'
                        />
                        <CardItem 
                        src='images/img-4.jpg'
                        text='Cars'
                        label='cars'
                        path='cars'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}
