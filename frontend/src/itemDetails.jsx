import React, { useState } from "react";
import Header from "./components/header";
import { useParams } from "react-router";
import fetch_item_price from "./components/functions/fetch_item_price_func";
import api from "./api";

const ItemDetails = () => {
    const params = useParams();
    const itemName = params.item;
    const [itemPrice, setItemPrice] = useState('');
    const [isSet, setIsSet] = useState(false);

    fetch_item_price(itemName).then(function(result) {
        setItemPrice(result.data)
        if (result.data.items_in_set.length > 0) {
            setIsSet(true)
        }
    });

    async function fetch_tracked_item(item) {
        try {
            await api.post(`/tracking/${item}`);
        } catch (error) {
            console.error("Error fetching tracked item", error);
        };
    };

    function t() {
        var finalPrice = 0
        itemPrice.items_in_set.map(function(item) {
            finalPrice += parseInt(Object.values(item)[0].price_sell)
        })

        return (
            finalPrice
        )
    }

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    
                    <div className="item__inner">
                        <h2 className="item__name">
                            <a className="menu__item-link" href={"https://warframe.market/items/" + `${itemName}`} target="_blank">
                                {itemName}
                            </a>
                        </h2>
                    </div>

                    {itemPrice.price_buy && itemPrice.price_buy !== '' &&
                    <>
                        <p className="item__price">
                            minimum buy price: {itemPrice.price_buy}
                        </p>   
                        <p className="item__price">
                            minimum sell price: {itemPrice.price_sell}
                        </p>   
                        <p className="item__price">
                            potential profit: {parseInt(itemPrice.price_buy) - parseInt(itemPrice.price_sell)}
                        </p>
                    </>
                    }
                    <>
                        {isSet ?
                            <>
                                <div className="item__inner">
                                    items in set:
                                    <h3 className="item__name">
                                        {itemPrice.items_in_set.map((item, i) => (
                                            <li key={i}>
                                                {Object.keys(item)[0]}  
                                                <p className="item__price">
                                                    minimum sell price: {Object.values(item)[0].price_sell}
                                                </p>   
                                            </li>
                                        ))}
                                        <hr></hr>
                                        <p className="potential__profit">potential profit if buying items then selling as a set: {parseInt(itemPrice.price_sell) - t()}</p>
                                    </h3>
                                </div>
                            </>
                        : null}
                    </>

                    <button className="item__inner-track-item-btn" onClick={function(){fetch_tracked_item(itemName)}}>
                        track Item
                    </button>
                </div>
            </main>
        </>
    );
};

export default ItemDetails;