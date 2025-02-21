import React from "react";
import Footer from "./Footer";
import "./css/Home.css";
import Nav from "./Nav";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div>
      <Nav />
      <AllProducts/>
      <Footer />
    </div>
  );
};

export default Home;
