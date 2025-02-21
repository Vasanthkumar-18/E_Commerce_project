import React from "react";
import { useSelector } from "react-redux";
import "./css/Cart.css";
import Nav from "./Nav";

const Cart = () => {
  let cartProducts = useSelector((state) => {
    return state.cart;
  });

  return (
    <>
      <Nav />
      <div className="cartContainer">
        {cartProducts.map((product) => {
          return (
            <>
              <div className="cartItems" key={product.id}>
                <img src={product.image_url} alt="" />
                <p className="cartTitle">{product.title}</p>
                <div className="cartCount">
                  <button>-</button>
                  <p>0</p>
                  <button style={{ backgroundColor: "green" }}>+</button>
                  <p>Total :{product.price} </p>
                </div>
                <button className="cartPayment">Payment</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
