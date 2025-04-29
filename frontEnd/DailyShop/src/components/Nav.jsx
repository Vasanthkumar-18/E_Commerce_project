import React, { useEffect, useState } from "react";
import CartBtn from "./cartBtn";
import { IoMdContact } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import "./css/Nav.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdThumbsUpDown } from "react-icons/md";
import { logout } from "../redux/slice/Auth";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [user, setUser] = useState("");
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const getUserName = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: { Authorization: token },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getUserName();
    }
  }, [navigate, token]);
  return (
    <nav>
      <div className="logo">
        <h4 onClick={() => navigate("/home")}>Daily Shop</h4>
        <p onClick={() => navigate("/home")}>{user && user}</p>
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

        <div className="profile">
          <button className="dropdownBtn" onClick={() => setIsOpen(!isOpen)}>
            Profile {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          {isOpen && (
            <ul className="dropdown">
              <li>
                <IoMdContact
                  className="icon"
                  onClick={() => navigate("/register")}
                />
                <p>Register</p>
              </li>
              <hr />
              <li>
                <CiLogin className="icon" onClick={() => navigate("/")} />
                <p>Login</p>
              </li>
              <hr />
              <li>
                <MdThumbsUpDown
                  className="icon"
                  onClick={() => navigate("/orders")}
                />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <CiLogout className="icon" onClick={handleLogOut} />
                <p>Logout</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
