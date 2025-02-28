import React, { useState } from "react";
import axios from "axios";
import "./css/AllProducts.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "./css/Searchbox.css";
import { useSelector } from "react-redux";

const Searchbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
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
      if(!token){
        navigate("/")
      }else{
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

                    <button
                      className="viewDetailbtn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      view Details
                    </button>
                    {/* <Link
                          className="viewDetailbtn"
                          to={"/product/" + product.id}
                        >
                          view Details
                        </Link> */}
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
