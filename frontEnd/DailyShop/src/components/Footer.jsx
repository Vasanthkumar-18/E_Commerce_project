import React from "react";
import { CiInstagram } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import "./css/footer.css";
import Nav from "./Nav";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>

      <Nav/>
      
      <div className="footer-container">
        <div className="footer1">
          <h3>ABOUT US</h3>
          <p>
            As industry experts with (4) years of experience, we curate the best
            products/categories for our customers. At Daily-Shop, you'll find
            carefully selected products, in-depth product knowledge, and
            personalized recommendations. Shop with confidence and trust our
            expertise.
          </p>
        </div>
        <div className="footer2">
          <h3>Contact Us</h3>
          <p style={{ fontSize: "12px" }}>Email:dailyshop@company.com</p>
          <p>Ph no: +12 34567890</p>
          <p>Address: 12, KK Nagar ,Chennai,India.</p>
        </div>

        <div className="footer3">
          <h3>FOLLOW US</h3>

          <div className="icons">
            <a href="#" style={{ color: "pink" }}>
              <CiInstagram className="ficon" />
            </a>
            <a href="#">
              <AiOutlineFacebook className="ficon" style={{ color: "blue" }} />
            </a>
            <a href="#">
              <FaTwitter className="ficon" style={{ color: "blue" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer4">
        <p>Copyright © {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
