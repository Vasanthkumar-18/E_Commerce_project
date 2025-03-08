import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import "./css/placeorder.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { ImSmile2 } from "react-icons/im";
import { IoIosHome } from "react-icons/io";

const PlaceOrder = () => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const navigate = useNavigate();
  // Using refs to avoid re-renders while typing
  const nameRef = useRef();
  const mobileNumRef = useRef();
  const pincodeRef = useRef();
  const stateRef = useRef();
  const addressRef = useRef();
  const landmarkRef = useRef();

  const [userExistAddress, setUserExistAddress] = useState(null);
  const [isPaymentSelected, setisPaymentSelected] = useState(false);
  const [isAddressSelected, setisAddressSelected] = useState(false);
  const [orderMessage, setOrderMessage] = useState(false);
  // Memoized function to avoid unnecessary re-renders
  const checkUserAddress = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/address`, {
        params: { email: userEmail },
      })
      .then((res) => {
        if (res.data?.address.states) {
          setUserExistAddress(res.data);
        } else {
          setUserExistAddress(null);
        }
      })
      .catch((err) => console.error(err));
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      checkUserAddress();
    }
  }, [userEmail, checkUserAddress]);

  // Submit Address Function
  const sendUserAddress = (e) => {
    e.preventDefault();
    const name = nameRef.current.value.trim();
    const mobileNum = mobileNumRef.current.value.trim();
    const pincode = pincodeRef.current.value.trim();
    const state = stateRef.current.value.trim();
    const address = addressRef.current.value.trim();
    const landmark = landmarkRef.current.value.trim();

    if (name && mobileNum && pincode && state && address && landmark) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/user/address`, {
          addressname: name,
          mobileno: mobileNum,
          pincode,
          states: state,
          address,
          landmark,
          email: userEmail,
        })
        .then(() => {
          Swal.fire({ icon: "success", title: "Updated Your Address" });
          checkUserAddress(); // Refresh address after submission
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({ icon: "error", title: "Something went wrong" });
        });
    } else {
      Swal.fire({ icon: "error", title: "Please enter all details" });
    }
  };

  // Handle Payment Click
  const handlePayment = () => {
    if (isPaymentSelected && isAddressSelected) {
      Swal.fire({ icon: "success", title: "Your order has been placed!" });
      setOrderMessage(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please select  Payment & Address!",
      });
    }
  };

  const orderDetails = useSelector((state) => state.paymentProduct.products);
  return (
    <>
      <div className="placeorderNav">
        <h4 onClick={() => navigate("/home")}>Daily Shop</h4>
        <h4>Check-Out</h4>
      </div>
      <br />
      <br />
      <div className="placeorderContainer">
        <div className="section1">
          <div className="backIcons">
            <IoIosHome onClick={() => navigate("/home")} />
            <IoMdArrowBack onClick={() => navigate("/cart")} />
          </div>

          <div className="addressDetails">
            {userExistAddress ? (
              <div className="userAddressDetails">
                <h3>Delivery Address</h3>
                <p>
                  <input
                    type="radio"
                    name="address"
                    onChange={() => setisAddressSelected(true)}
                  />
                  {`${userExistAddress.address.name}, ${userExistAddress.address.address}, 
                  ${userExistAddress.address.pincode}, ${userExistAddress.address.states}, 
                  ${userExistAddress.address.mobilenum}, ${userExistAddress.address.landmark}`}
                </p>
              </div>
            ) : (
              <form onSubmit={sendUserAddress}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Name</label>
                        <input type="text" ref={nameRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Mobile number</label>
                        <input type="text" ref={mobileNumRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>PinCode</label>
                        <input type="text" ref={pincodeRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>State</label>
                        <input type="text" ref={stateRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Address</label>
                        <input type="text" ref={addressRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Landmark</label>
                        <input type="text" ref={landmarkRef} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <center>
                          <button type="submit">Submit</button>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            )}
          </div>

          <div className="payment">
            <h3>Payment</h3>
            <div className="cashOnDelivery">
              <p>
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setisPaymentSelected(true)}
                />
                Cash On Delivery /Pay On Delivery
              </p>
            </div>
          </div>
        </div>

        <div className="section2">
          {orderMessage === false ? (
            <div className="orderProducts">
              <div className="orderSummary">
                <h3>Order Summary</h3>
                {orderDetails.length > 0 ? (
                  orderDetails.map((product) => (
                    <div key={product.productId} className="productContent">
                      <center>
                        <img src={product.image_url} alt="Order image" />
                      </center>
                      <hr />
                      <p>
                        <strong>Product:</strong> {product.title}
                      </p>
                      <hr />

                      <p >
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <hr />
                      <p >
                        <strong>Total Price:</strong> ₹{product.totalPrice}
                      </p>
                      <hr />
                      <center>
                        <button onClick={handlePayment}>Place Order</button>
                      </center>
                    </div>
                  ))
                ) : (
                  <p>No products selected for checkout.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="orderMessageContainer">
              <h3> The Item Will Be Delivered in 2 Days</h3>
              <h4>
                Happy Shopping <ImSmile2 />
              </h4>
              <div className="orderTruck">
                <CiDeliveryTruck className="deliverTruck" />
                <div className="truckLine"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
