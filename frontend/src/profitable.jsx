import React, { useEffect, useState } from "react";
import Header from "./components/header";
import api from "./api";

async function get_items_and_lowest_prices(primeOnly=false, quantity=0, limitTo=0) {
    try {
        const response = await api.post('/profitable', {data: {"primeOnly": primeOnly, "quantity": quantity, "limitTo": limitTo}})
        return response
    } catch (error) {
        console.error("Error fetching items", error);
    }
}

const Profitable = () => {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [onlyPrime, setOnlyPrime] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [limit, setLimit] = useState(0);

    function handleCalculate() {
        setShowInfo(true)
        get_items_and_lowest_prices(onlyPrime, quantity, limit).then((result) => {
            setItems(result.data.items);
            setShow(true)
            setShowInfo(false)
        })
    }

    function handleCheck() {
        setOnlyPrime((prev) => prev = !prev)
    }

    function handleInput(e) {
        setQuantity(e)
    }

    function handleLimit(e) {
        setLimit(e)
    }
 
    return (
        <>
            <Header />
            <main>
                <div className="container">

                    <ul>
                        {showInfo ? 
                            <p>calculating {quantity} most profitable sets to resell... it will take some time</p>
                        : 
                        <>
                            <li className="col">
                                <input type="checkbox" onClick={handleCheck}></input>
                                <p>only prime sets</p>
                            </li>
                            <li className="col">
                                <div className="quantity__input">
                                    <input type="number" placeholder="quantity to show (def: all)"
                                    onChange={(e) => handleInput(e.target.value)}></input>
                                </div>
                            </li>
                            <li className="col">
                                <div className="quantity__input">
                                    <input type="number" placeholder="limit search to (def: none)"
                                    onChange={(e) => handleLimit(e.target.value)}></input>
                                </div>
                            </li>
                            <li className="col">
                                <button onClick={handleCalculate} className="item__inner-track-item-btn">
                                    calculate
                                </button>
                            </li>
                        </>
                        }
                    </ul>
                    <p></p>
                    {show ?
                        items.map((item, i) => (
                            <li key={i}>
                                <a href={"https://warframe.market/items/" + `${Object.keys(item)[0]}`} target="_blank" className="tracked__set-item-name">
                                    {Object.keys(item)[0]}
                                </a>
                                <p className="item__price">
                                    potential profit: {Object.values(item)[0]}
                                </p>
                            </li>
                        ))
                    : null}
                </div>
            </main>
        </>
    )
};

export default Profitable;