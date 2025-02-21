import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AllProducts.css";
import { Link } from "react-router-dom";
import './css/Searchbox.css'
const Searchbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("search query", searchQuery);
    try {
      const response = await axios.post(
        "http://localhost:4000/search/product",
        {
          query: searchQuery,
        }
      );
      console.log("response", response.data);
      setSearchResult(response.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="searchNav">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Laptop, Iphone, Tv, Camera........"
        />
        <button type="submit">Search</button>
      </form>
      <div className="productContainer">
        {searchResult &&
          searchResult.map((product, index) => {
            if (product) {
              return (
                <div className="cart" key={index}>
                  <img src={product.image_url} alt="productImages" />
                  <hr />
                  <p>{product.title}</p>
                  <p>
                    MRP : <span>₹</span> {product.price}
                  </p>
                  <Link className="viewDetailbtn" to={"/product/" + product.id}>
                    view Details
                  </Link>
                </div>
              );
            } else {
              return "Internal Server Error";
            }
          })}
      </div>
    </div>
  );
};

export default Searchbox;
