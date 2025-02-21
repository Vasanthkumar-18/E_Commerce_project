import React, { useState, useEffect } from "react";
import "./css/ProductDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CartBtn from "./cartBtn";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slice/cartSlice";
import Nav from "./Nav";


const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [price, setPrice] = useState();
  const { id } = useParams();
  const getAllProducts = async () => {
    await axios.get("http://localhost:4000/products/" + id).then((details) => {
      setProduct(details.data);
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  // const navigate = useNavigate();
  let dispatch = useDispatch();

  

  let addItemToCart = (product) => {
    dispatch(addItem(product));
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
              produt ID : "{product.product_id}"
            </p>
            <div className="line"></div>

            <p>
              Price : <span> ₹</span> {product.price}
            </p>

            <button className="ATCbtn" onClick={() => addItemToCart(product)}>
              Add to Cart
            </button>

            <CartBtn />
            <div className="line"></div>
            <h3>Description :</h3>
            <p className="productDetailDescription">{product.description}</p>
            <div className="line"></div>
            <h2>Sold by: DailyShop</h2>
          </div>
        </div>
      </>
    );
  } else {
    <h1>No Product Selected</h1>;
  }
};

export default ProductDetails;
