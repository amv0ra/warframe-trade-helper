import React, {useRef, useEffect, createElement, useState} from "react";
import '../App.css';
import search_item from "./functions/search_item_func";

const Search = () => {

    const [query, setQuery] = useState("");
    const [links, setLinks] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const hide_results = (event) => {
        if (event.relatedTarget == null) {
            setShowResults(false);
        }
        
    }

    useEffect(() => {
        if (!query) {
            setLinks([]);
            return;
        }

        search_item(query).then((results) => {
            setLinks(results.slice(0, 5));
            setShowResults(true);
        })
    }, [query]);

    return (
        <li className="menu__item-search">
            <div className="menu__item-search-bar">
                <div className="menu__item-search-bar-box">
                    <div className="menu__item-search-bar-field">
                        <input 
                        type="text"
                        onChange={(e) => {setQuery(e.target.value),setShowResults(true)}}
                        onFocus={() => query && setShowResults(true)}
                        onBlur={(e) => hide_results(e)}
                        placeholder="search"
                        />
                    </div>
                </div>
            </div>


            { showResults ? 
                <ul className="menu__item-search-result">
                    {links.map((url, i) => (
                        <li key={i}>
                            <a href={url} className="menu__item-search-result-item-link">
                                {url}
                            </a>
                        </li>
                    ))}
                </ul>
            : null}
        </li>
    );
};

export default Search;