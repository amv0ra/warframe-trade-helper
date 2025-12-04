import React, { useEffect, useState, Activity } from 'react';
import './App.css';
import Header from './components/header.jsx';
import api from './api.js';
import TrackedItem from './components/tracked_item.jsx';

async function get_tracked_items() {
  try {
    const response = await api.get("/tracking");
    return response;
  } catch (error) {
    console.log("Error getting tracked items", error);
  };
};



const App = () => {

  const [trackedItems, setTrackedItems] = useState([]);

  useEffect(() => {
    get_tracked_items().then((result) => setTrackedItems(result.data.items));
  }, [])
  
  return (
    <div className="App" >
      <Header />
      <main className='main'>
        <section className="tracked-items">
          <div className="container">
            {trackedItems.length == 0 ?
              <p className='no-tracked-items'>tracked items will appear here</p>  
            : null}
            <ul className="tracked__list">
              {trackedItems.map((item, i) => (
                <li key={i} className="tracked__item">
                  <TrackedItem name={Object.keys(item)[0]} price_buy={Object.values(item)[0]["price_buy"]}
                     price_sell={Object.values(item)[0]["price_sell"]} set_items={Object.values(item)[0]["items_in_set"]}/>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};



export default App;