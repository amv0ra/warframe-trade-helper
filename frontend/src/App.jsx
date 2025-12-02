import React from 'react';
import './App.css';
import closesvg from './assets/close.svg';
import Header from './components/header.jsx';


const App = () => {

  return (
    <div className="App" >
      <Header />
      <main className='main'>
        <section className="tracked-items">
          <div className="container">
            <p className="no-tracked-items">tracked items will appear here</p>
            <ul className="tracked__list">
              <li className="tracked__item">
                <div className="tracked__item__box">
                  <ul className="tracked__item-top">
                    <li className="tracked__item-name">
                      Revenant Prime Chassis
                    </li>
                    <li className="tracked__item-delete">
                      <button>
                        <img src={closesvg}/>
                      </button>
                    </li>
                  </ul>
                  <ul className="tracked__item-main">
                    <li className="tracked__item-price">
                      <p>Price: 10 plat.</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};



export default App;