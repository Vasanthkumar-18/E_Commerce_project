import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/Cart.css";
import Nav from "./Nav";
import { removeItem } from "../redux/slice/cartSlice";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch()
  const countIncrease = () => {
    setCount(count + 1);
  };
  const countDecrease = () => {
    count > 1 && setCount(count - 1);
  };

  let removeCart = (itemId) => {
    dispatch(removeItem(itemId));
    
    
    
  };
  return (
    <>
      <Nav />
      <div className="cartContainer">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <div className="cartItems" key={product.id}>
              <div className="cartImage">
                <img src={product.image_url} alt="cartImage" />
              </div>
              <div className="cartDetails">
                <p className="cartTitle">{product.title}</p>
                <div className="cartCount">
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={countDecrease}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={countIncrease}
                  >
                    +
                  </button>
                  <p className="cartPrice">Total: {count * product.price}</p>
                  <button style={{ backgroundColor: "orange" }}>Payment</button>
                </div>

                <p className="removeCart" onClick={()=> removeCart(product.id)}>
                  X
                </p>
              </div>
            </div>
          ))
        ) : (
          <center>
            <p className="emptyCartMessage">Your cart is empty.</p>
          </center>
        )}
      </div>
    </>
  );
};

export default Cart;
