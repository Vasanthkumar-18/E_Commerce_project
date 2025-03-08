import React, { useRef } from "react";
// import { FcGoogle } from "react-icons/fc";
import { TextField, Button } from "@mui/material";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getUserEmail, loginSuccess } from "../redux/slice/Auth";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const userEmail = emailRef.current.value.trim();
    const userPassword = passwordRef.current.value.trim();

    axios
      .post(`${import.meta.env.VITE_API_URL}/login`, {
        email: userEmail,
        loginPassword: userPassword,
      })
      .then((res) => {
        dispatch(loginSuccess(res.data));
        dispatch(getUserEmail(userEmail));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Have a Nice Day!",
        });

        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/home");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Wrong password",
        });
      });
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin}>
        <center>
          <h3>Login</h3>
        </center>
        <p> sample : dailyshop@gmail.com </p>
        <p>pass : dailyshop</p>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          inputRef={emailRef}
          autoComplete="username"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passwordRef}
          autoComplete="current-password"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <div className="google-register">
          {/* <Button variant="outlined" className="google-btn">
            <FcGoogle />
          </Button> */}
          <Button
            variant="contained"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
