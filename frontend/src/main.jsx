import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import ItemDetails from './itemDetails.jsx';
import Profitable from './profitable.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:item" element={<ItemDetails />} />
      <Route path="/profitable" element={<Profitable />} />
    </Routes>
  </BrowserRouter>,
)