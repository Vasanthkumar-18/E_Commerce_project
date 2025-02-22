import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AllProducts.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./css/Searchbox.css";
const Searchbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("search query", searchQuery);
    try {
      const response = await axios
        .post("http://localhost:4000/search/product", {
          query: searchQuery,
        })
        .finally(() => {
          setIsLoad(false);
        });
      console.log("response", response.data);
      setSearchResult(response.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchNav">
        <form onSubmit={handleSearch}>
          <IoMdArrowBack className="backIcon" onClick={()=> navigate("/")}/>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Laptop, Iphone, Tv, Camera........"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {isLoad ? (
        <div>
          <center>
            <h5
              style={{ height: "100vh", marginTop: " 100px" }}
              className="load-event"
            >
              Search Any Products...
            </h5>
          </center>
        </div>
      ) : (
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
                    <Link
                      className="viewDetailbtn"
                      to={"/product/" + product.id}
                    >
                      view Details
                    </Link>
                  </div>
                );
              } else {
                return "Internal Server Error";
              }
            })}
        </div>
      )}
    </div>
  );
};

export default Searchbox;
