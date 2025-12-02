import React, { useState } from "react";
import Header from "./header";
import { useParams } from "react-router";
import fetch_item_price from "./fetch_item_price_func";

const ItemDetails = () => {
    const params = useParams();
    const itemName = params.item;
    const [itemPrice, setItemPrice] = useState('');
    fetch_item_price(itemName).then(result => setItemPrice(result.data));

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <h2 className="item__name">
                        {itemName}
                    </h2>
                    <>
                    {itemPrice.price_buy && itemPrice.price_buy !== '' &&
                         <p className="item__price">
                            Least buying price: {itemPrice.price_buy}
                        </p>   
                    }
                    </>
                    {itemPrice.price_sell && itemPrice.price_sell !== '' &&
                         <p className="item__price">
                            Least selling price: {itemPrice.price_sell}
                        </p>   
                    }
                    <>
                    {itemPrice.price_sell && itemPrice.price_sell !== '' && itemPrice.price_buy !== '' &&
                         <p className="item__price">
                            Potential profit: {parseInt(itemPrice.price_buy) - parseInt(itemPrice.price_sell)}
                        </p>   
                    }
                    </>
                </div>
            </main>
        </>
    );
};

export default ItemDetails;