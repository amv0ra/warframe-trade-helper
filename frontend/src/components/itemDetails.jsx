import React, { useState } from "react";
import Header from "./header";
import { useParams } from "react-router";
import fetch_item_price from "./fetch_item_price_func";
import api from "../api";

const ItemDetails = () => {
    const params = useParams();
    const itemName = params.item;
    const [itemPrice, setItemPrice] = useState('');
    fetch_item_price(itemName).then(result => setItemPrice(result.data));

    async function fetch_tracked_item(item) {
        try {
            await api.post(`/tracking/${item}`);
        } catch (error) {
            console.error("Error fetching tracked item", error);
        };
    };

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
                    <>
                    {itemPrice.price_buy && itemPrice.price_buy !== '' &&
                         <p className="item__price">
                            minimum buy price: {itemPrice.price_buy}
                        </p>   
                    }
                    </>
                    {itemPrice.price_sell && itemPrice.price_sell !== '' &&
                         <p className="item__price">
                            minimum sell price: {itemPrice.price_sell}
                        </p>   
                    }
                    <>
                    {itemPrice.price_sell && itemPrice.price_sell !== '' && itemPrice.price_buy !== '' &&
                         <p className="item__price">
                            potential profit: {parseInt(itemPrice.price_buy) - parseInt(itemPrice.price_sell)}
                        </p>   
                    }
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