import React, { useState, useEffect } from "react";
import "./css/ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/slice/cartSlice";
import { OrbitProgress } from "react-loading-indicators";
import Nav from "./Nav";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Fetch product details
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (!token) {
      navigate("/");
    } else {
      getProduct();
    }
  }, [id]);

  // Check if the product is already in the cart
  const isInCart = cartItems.some((item) => item.id === product?.id);

  // Toggle Add/Remove from Cart
  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeItem(product.id));
    } else {
      dispatch(addItem(product));
    }
  };

  if (product) {
    return (
      <>
        <Nav />
        <div className="productDetail-container">
          <div className="part1">
            <img src={product.image_url} alt="productImage" />
          </div>
          <div className="part2">
            <h4>{product.title}</h4>
            <p className="productDetailID">
              Product ID: "{product.product_id}"
            </p>
            <div className="line"></div>

            <p>
              Price: <span>₹</span> {product.price}
            </p>

            <button
              className="ATCbtn"
              onClick={handleCartToggle}
              style={{ backgroundColor: isInCart ? "red" : "green" }}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <div className="line"></div>
            <h3>Description:</h3>
            <p className="productDetailDescription">{product.description}</p>
            <div className="line"></div>
            <h2>Sold by: DailyShop</h2>
          </div>
        </div>
      </>
    );
  } else {
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
  }
};

export default ProductDetails;
