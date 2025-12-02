import React from "react";
import api from "../api";

async function fetch_item_price(item) {
    try {
        const response = await api.get(`/items/${item}`);
        return response;
    }   catch (error) {
        console.error("Error fetching item price", error);
    };
}

export default fetch_item_price;