import React, { useRef } from "react";
import CartBtn from "./cartBtn";
import { IoMdContact } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import "./css/Nav.css";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();


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
        <CartBtn />

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
