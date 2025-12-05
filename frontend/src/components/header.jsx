import React, {useEffect, useRef} from "react";
import '../App.css';
import Search from "./search.jsx";


const Header = () => {


    return (
        <header className="header">
            <div className="container">
                <div className="header__top">
                    <h1>
                        warframe-trade-helper
                    </h1>
                    <nav className="menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <a href="/" className="menu__item-link">main</a>
                            </li>
                            <li className="menu__item">
                                <a href="/profitable" className="menu__item-link">most profitable sets</a>
                            </li>
                            <Search />
                        </ul>
                    </nav>
                </div>
            </div>
      </header>
    );
};

export default Header;