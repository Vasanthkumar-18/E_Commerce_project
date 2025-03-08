import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetails from "./components/ProductDetails";
import Serachbox from "./components/Searchbox";
import PlaceOrder from "./components/PlaceOrder";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Serachbox />} />
          <Route path="/placeorder" element={<PlaceOrder/>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
