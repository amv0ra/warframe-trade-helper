import React, { Activity } from "react";
import closesvg from "../assets/close.svg"
import api from "../api";

function stop_tracking_item(item) {
  try {
    api.post(`/tracking/delete/${item}`)
  } catch (error) {
    console.log("Error deleting tracked item", error);
  };
};

function t(itemPrice) {
  var finalPrice = 0
  itemPrice.map(function(item) {
      finalPrice += parseInt(Object.values(item)[0].price_sell)
  })

  return (
      finalPrice
  )
}

export default class TrackedItem extends React.Component {
  
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
    console.log(this.props.set_items)
    return (
      <Activity mode={this.state.show ? "visible" : "hidden"}>
        <div className="tracked__item__box">
          <ul className="tracked__item-top">
            <a className="tracked__item-name" href={"https://warframe.market/items/" + `${this.props.name}`} target="_blank">
              {this.props.name}
            </a>
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
              <p className="potential__profit">
                potential profit: {parseInt(this.props.price_buy) - parseInt(this.props.price_sell)}
              </p>
            </li>
          </ul>
          <ul className="tracked__set-items">
            {this.props.set_items.length > 0 &&
            <>
            <hr></hr>
            items in set:
            </>
            }
            {this.props.set_items.length > 0 &&
              this.props.set_items.map((item, i) => (
                <li key={i}>
                    <a href={"https://warframe.market/items/" + `${Object.keys(item)[0]}`} target="_blank" className="tracked__set-item-name">
                      {Object.keys(item)[0]}
                    </a>
                    <p className="item__price">
                        minimum sell price: {Object.values(item)[0].price_sell}
                    </p>
                </li>
              ))
            }
            {this.props.set_items.length > 0 &&
            <>
              <hr></hr>
              <p className="potential__profit">
                potential profit: {parseInt(this.props.price_sell) - t(this.props.set_items)}
              </p>
            </>
            }
            
          </ul>
        </div>
      </Activity>
    );
  }
}