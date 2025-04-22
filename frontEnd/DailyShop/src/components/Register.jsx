import React, { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import "./css/login.css";
import axios from "axios";
import Swal from "sweetalert2";
// import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const userNameRef = useRef(null);
  const userEmailRef = useRef(null);
  const userPasswordRef = useRef(null);
  const userRenterPasswordRef = useRef(null);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current?.value.trim();
    const userEmail = userEmailRef.current?.value.trim();
    const userPassword1 = userPasswordRef.current?.value.trim();
    const userPassword2 = userRenterPasswordRef.current?.value.trim();

    console.log(userPassword1);
    console.log(userPassword2);

    let userPassword;

    const checkPassword = userPassword1 === userPassword2;
    console.log(checkPassword);

    if (checkPassword) {
      userPassword = userPassword1;
    } else {
      console.log("Passwords do not match!");
    }
    setLoad(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name: userName,
        email: userEmail,
        password: userPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: res.data,
      });
      userNameRef.current.value = "";
      userEmailRef.current.value = "";
      userPasswordRef.current.value = "";
      userRenterPasswordRef.current.value = "";
      navigate("/");
    } catch (err) {
      console.error("Error Response:", err);
      Swal.fire({
        icon: "error",
        title: "Required Somthing",
        text: "Already email Exist or PassWord Not Matchh",
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleRegister}>
        <center>
          <h3>Register</h3>
        </center>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          inputRef={userNameRef}
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          autoComplete="username"
          inputRef={userEmailRef}
        />
        <TextField
          type="password"
          label="password"
          variant="outlined"
          inputRef={userPasswordRef}
        />
        <TextField
          type="password"
          label="ReEnterPassword"
          variant="outlined"
          inputRef={userRenterPasswordRef}
        />
        <Button variant="contained" type="submit" disabled={load}>
          {load ? <div className="spinner"></div> : "Submit"}
        </Button>
        <div className="google-register">
          {/* <Button variant="outlined" className="google-btn">
            <FcGoogle />
          </Button> */}
          <Button
            variant="contained"
            className="register-btn"
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
