import React, { useState, useRef } from "react";
import axios from "axios";
import "./css/AllProducts.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./css/Searchbox.css";
import { useSelector } from "react-redux";

const Searchbox = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const navigate = useNavigate();
  const searchRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value.trim();
    try {
      const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/search/product`, {
          query: searchValue,
        })
        .finally(() => {
          setIsLoad(false);
        });
      if (!token) {
        navigate("/");
      } else {
        setSearchResult(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchNav">
        <form onSubmit={handleSearch}>
          <IoMdArrowBack
            className="backIcon"
            onClick={() => navigate("/home")}
          />
          <input
            type="search"
            ref={searchRef}
            placeholder="Search Iphone Sony Headset........"
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
          {searchResult.length > 0 ? (
            searchResult.map((product) => {
              if (product) {
                return (
                  <div className="cart" key={product.id}>
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
            })
          ) : (
            <p> No Items Left</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbox;
