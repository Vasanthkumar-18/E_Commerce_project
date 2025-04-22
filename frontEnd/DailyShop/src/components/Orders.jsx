import React, { useEffect, useState } from "react";
import "./css/Orders.css";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import Swal from "sweetalert2";

const Orders = () => {
  const getUserEmail = localStorage.getItem("email");
  const [userOrders, setuserOrders] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  console.log(getUserEmail);
  const usersOrderDetails = () =>
    axios
      .get(`${import.meta.env.VITE_API_URL}/orderlists/${getUserEmail}`)
      .then((res) => {
        setuserOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  useEffect(() => {
    usersOrderDetails();
  }, []);
  const handleCancleOrder = (p) => {
    const stauts = p.status;
    const orderid = p.orderid;

    if (stauts) {
      Swal.fire({
        title: "Are you sure?",
        text: " Do You Want To Cancel This Item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel It!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (stauts) {
            axios
              .post(`${import.meta.env.VITE_API_URL}/cancel/order${orderid}`)
              .then((res) => {
                res.data;
                usersOrderDetails();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("no");
          }
          Swal.fire({
            title: "Canceled",
            text: "Your Order has been canceled.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Order Already Canceled",
      });
    }
  };

  if (isLoad) {
    return (
      <div>
        <center>
          <h1
            style={{ height: "50vh", marginTop: "30px" }}
            className="load-event"
          >
            <OrbitProgress
              color="lightgreen"
              size="small"
              text="Loading"
              textColor="black"
            />
          </h1>
        </center>
      </div>
    );
  } else {
    return (
      <div className="OrdersContainer">
        <div className="orders-nav">
          <h3> Orders Section</h3>
        </div>

        {userOrders.length > 0 ? (
          userOrders.map((p) => (
            <div className="ordersChild" key={p.orderid}>
              <div className="orderChild1">
                <img src={p.productimage} alt="ordersImages" />
                <p className="orderDescription">{p.productdescription}</p>
                {/* <p className="orderQuantity">{p.quantity}</p> */}
              </div>
              <div className="orderChild2">
                <p
                  className="orderQuantity"
                  style={p.status ? { color: "green" } : { color: "red" }}
                >
                  {p.status ? "Product On Processing" : "Order canceled"}
                </p>
                <button onClick={() => handleCancleOrder(p)}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <center> No Orders Left</center>
        )}
      </div>
    );
  }
};

export default Orders;
