import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/Cart.css";
import Nav from "./Nav";
import { removeItem } from "../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { cartQuantity } from "../redux/slice/paymentSlice";
import { MdDelete } from "react-icons/md";
import { setCartProducts } from "../redux/slice/paymentSlice"; // Import Redux action

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [count, setCount] = useState(
    cartProducts.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const countIncrease = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const countDecrease = (id) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] > 1 ? prevCounts[id] - 1 : 1,
    }));
  };
  const navigate = useNavigate();
  let removeCart = (itemId) => {
    dispatch(removeItem(itemId));
  };
  const handleCheckOut = (product) => {
    const orderDetails = {
      productId: product.id,
      title: product.title,
      quantity: count[product.id],
      totalPrice: count[product.id] * product.price,
      image_url: product.image_url,
      description: product.description,
    };

    // Store only the selected product in Redux
    dispatch(setCartProducts(orderDetails));
    navigate("/placeorder");
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
                    onClick={() => countDecrease(product.id)}
                  >
                    -
                  </button>
                  <p>{count[product.id]}</p>
                  <button
                    style={{ backgroundColor: "green" }}
                    onClick={() => countIncrease(product.id)}
                  >
                    +
                  </button>
                  <p className="cartPrice">
                    Total: {count[product.id] * product.price}
                  </p>
                  <button
                    style={{ backgroundColor: "orange" }}
                    onClick={() => handleCheckOut(product)}
                  >
                    Check Out
                  </button>
                </div>

                <p
                  className="removeCart"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You want to remove this item!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, remove it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeCart(product.id);
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your cart has been removed.",
                          icon: "success",
                        });
                      }
                    });
                  }}
                >
                  <MdDelete />
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
