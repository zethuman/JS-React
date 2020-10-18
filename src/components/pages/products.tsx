import React, { ReactElement } from 'react'
import '../app/App.css'
import Cards from '../cards/cards'

interface Props {
    
}

export default function Products({}: Props): ReactElement {
    return (
        <>
            <h1 className='products'>PRODUCTS</h1>
            <Cards />
        </>
    )
}
