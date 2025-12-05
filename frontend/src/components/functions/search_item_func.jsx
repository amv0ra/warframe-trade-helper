import React from 'react';
import api from '../../api.js';

var items;
fetch_items().then(function(result) {
    items = result.data.items;
});

async function fetch_items() {
    try {
        const response = await api.get('/items');
        return response;

    }   catch (error) {
        console.error("Error fetching items", error);
    };

};

async function search_item(key) {
    var result = [];
    for (let item of items) {
        
        if (item.toLowerCase().includes(key.toLowerCase())) {
            result.push(item);
            
        }
        if (result.length > 5) {
            break
        }
    };
    return result;
};

export default search_item;