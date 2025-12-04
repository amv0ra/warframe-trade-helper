import React, { useEffect, useState, Activity } from 'react';
import './App.css';
import closesvg from './assets/close.svg';
import Header from './components/header.jsx';
import api from './api.js';
import fetch_item_price from './components/fetch_item_price_func.jsx';

async function get_tracked_items() {
  try {
    const response = await api.get("/tracking");
    return response;
  } catch (error) {
    console.log("Error getting tracked items", error);
  };
};

function stop_tracking_item(item) {
  try {
    api.post(`/tracking/delete/${item}`)
  } catch (error) {
    console.log("Error deleting tracked item", error);
  };
};


class TrackedItem extends React.Component {
  
  state = {
    show: true,
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
    stop_tracking_item(this.props.name);
  };

  render() {
    return (
      <Activity mode={this.state.show ? "visible" : "hidden"}>
        <div className="tracked__item__box">
          <ul className="tracked__item-top">
            <li className="tracked__item-name">
              {this.props.name}
            </li>
            <li className="tracked__item-delete">
              <button onClick={this.handleClose}>
                <img src={closesvg}/>
              </button>
            </li>
          </ul>
          <ul className="tracked__item-main">
            <li className="tracked__item-price">
              <p>
                minimum buying price: {this.props.price_buy}
              </p>
              <p>
                minimum selling price: {this.props.price_sell}
              </p>
              <p>
                potential profit: {parseInt(this.props.price_buy) - parseInt(this.props.price_sell)}
              </p>
            </li>
          </ul>
        </div>
      </Activity>
    );
  }
}

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
            <p className='no-tracked-items'>tracked items will appear here</p>
            <ul className="tracked__list">
              {trackedItems.map((item, i) => (
                <li key={i} className="tracked__item">
                  <TrackedItem name={Object.keys(item)[0]} price_buy={Object.values(item)[0]["price_buy"]}
                     price_sell={Object.values(item)[0]["price_sell"]}/>
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