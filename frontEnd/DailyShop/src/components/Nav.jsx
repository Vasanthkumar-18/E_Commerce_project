import React from "react";
import CartBtn from "./cartBtn";
import { IoMdContact } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import "./css/Nav.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();

  const cartProducts = useSelector((state) => state.cart);

  return (
    <nav>
      <div className="logo">
        <h4 onClick={() => navigate("/")}>Daily Shop</h4>
      </div>
      <div className="serachsection">
        <IoSearchOutline className="searchIcon" />
        <input
          type="text"
          className="searchBox"
          placeholder="Search Laptop, Mobile, Fan, Tv......"
          onClick={() => navigate("/search")}
        />
      </div>
      <div className="rightSection">
        <div className="cartSection">
          <CartBtn />
          <p className="cartLength">{cartProducts.length}</p>
        </div>

        <div className="login">
          <IoMdContact className="icon" />
          <p>Register</p>
        </div>
        <div className="logout">
          <CiLogin className="icon" />
          <p>Logout</p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
