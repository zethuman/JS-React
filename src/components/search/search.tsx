import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import search from './search.module.css';

interface Props {
    products: any[];
    term: string
}

export default function Search({ products, term }: Props): ReactElement {
    const [searchTerms, setSearchTerms] = useState(term);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const history = useHistory();

    const results = useMemo(() => products
        .filter((val) => {
            if (val.text.toLowerCase().includes(term.toLowerCase())) {
                return val.text;
            }
        }), [term]
    );

    useEffect(() => {
        setSearchTerms(term)
    }, [term]);

    function onSearchHandle(id: number) {
        history.replace('/')
        history.push(`products/${id}`)
        setSearchTerms('');
    }


    console.log("in search bar: ", searchResults, term)
    const elements = results.map((val => {
        return (
            <li key={val.id} onClick={() => onSearchHandle(val.id)}>
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

