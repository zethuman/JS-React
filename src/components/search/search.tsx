import React, { ReactElement } from 'react';
import './search.css';

interface Props {
    products: any[];
    term: string
}

export default function Search({ products, term }: Props): ReactElement {

    const results = products
        .filter((val) => {
            if (val.text.toLowerCase().includes(term.toLowerCase())) {
                return val.text;
            }
        })
        .map((val, key) => {
            return <ul className="results-ul"><li>{val.text}</li></ul>
        });

    console.log("in search bar: ", results, term)

    return (
        <div className="results">
            {term === '' ? null : results}
        </div>
    )
}
