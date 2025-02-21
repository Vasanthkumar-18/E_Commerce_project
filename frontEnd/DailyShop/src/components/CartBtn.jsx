import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const CartBtn = () => {
  const navigate = useNavigate(); 
  return (
    <div>
      <span className="cartbtn">
        <CiShoppingCart
          size={26}
          className="icon"
          onClick={() => {
            navigate("/cart")
          }}
        />
      </span>
    </div>
  );
};

export default CartBtn;
