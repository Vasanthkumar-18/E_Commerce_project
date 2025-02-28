import React, { useEffect, useState } from "react";
import Carousels from "./Carousels";
import { OrbitProgress } from "react-loading-indicators";
import { useNavigate, Link } from "react-router-dom";
import "./css/AllProducts.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const getAllProducts = async () => {
    await axios
      .get("http://localhost:4000/products/")
      .then((details) => {
        setProduct(details.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getAllProducts();
    }
  }, [navigate, token]);

  if (isLoad) {
    return (
      <div>
        <center>
          <h1
            style={{ height: "100vh", marginTop: " 100px" }}
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
      <>
        <Carousels />
        <div className="productContainer">
          {product &&
            product.map((product, index) => {
              if (product) {
                return (
                  <div className="cart" key={index}>
                    <img src={product.image_url} alt="productImages" />
                    <hr />
                    <p>{product.title}</p>
                    <p>
                      MRP : <span>₹</span> {product.price}
                    </p>
                    <button
                      className="viewDetailbtn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      view Details
                    </button>
                  </div>
                );
              } else {
                return "Internal Server Error";
              }
            })}
        </div>
        {error && (
          <center>
            <h2 style={{ marginBottom: "200px" }}> Server Error</h2>
          </center>
        )}
      </>
    );
  }
};

export default AllProducts;
