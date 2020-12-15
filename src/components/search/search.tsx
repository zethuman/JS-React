import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import search from './search.module.css';

interface Props {
    products: any[];
    term: string
}

export default function Search({ products, term }: Props): ReactElement {
    const [searchTerms, setSearchTerms] = useState(term);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isClicked, setIsClicked] = useState(false)
    const history = useHistory();

    useEffect(() => {
        const results = products
            .filter((val) => {
                if (val.text.toLowerCase().includes(term.toLowerCase())) {
                    return val.text;
                }
            });
        setSearchTerms(term)
        setSearchResults(results);
    }, [term]);

    function onSearchHandle(id: number) {
        history.push(`products/${id}`)
        setIsClicked(true);
        setSearchTerms('');
        
    }

    // const results = products
    //     .filter((val) => {
    //         if (val.text.toLowerCase().includes(term.toLowerCase())) {
    //             return val.text;
    //         }
    //     })
    //     .map((val, key) => {
    //         return (
    //             <li key={val.product_id} onClick={() => onSearchHandle(val.product_id)}>
    //                 {val.text}
    //             </li>)
    //     });

    console.log("in search bar: ", searchResults, term)
    const elements = searchResults.map((val => {
        return (
            <li key={val.product_id} onClick={() => onSearchHandle(val.product_id)}>
                {val.text}
            </li>
        )
    }))

    return (
        <div>
            <ul className={searchTerms === '' ? search.none : search.results_ul}>{elements}</ul>
        </div>
    )
}
