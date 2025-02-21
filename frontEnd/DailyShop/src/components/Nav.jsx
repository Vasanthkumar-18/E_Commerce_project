import React, { useRef } from "react";
import CartBtn from "./cartBtn";
import { IoMdContact } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import "./css/Nav.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { queryValue } from "../redux/slice/searchQuerySlice";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch(queryValue(searchRef.current.value.toLowerCase()));
  };
  const searchRef = useRef();
  return (
    <nav>
      <div className="logo">
        <h4 onClick={() => navigate("/")}>Daily Shop</h4>
      </div>
      <div className="serachsection">
        <IoSearchOutline className="searchIcon"  onClick={handleSearch} />
        <input
          ref={searchRef}
          type="search"
          className="searchBox"
          placeholder="Search Laptop, Mobile, Fan, Tv......"
          
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
