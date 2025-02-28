import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TextField, Button } from "@mui/material";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slice/Auth";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios
        .post("http://localhost:4000/login", {
          email: userEmail,
          loginPassword: userPassword,
        })
        .then((res) => {
          dispatch(loginSuccess(res.data));

          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Have a Nice Day!",
          });
          setUserEmail("");
          setUserPassword("");
          navigate("/home");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Wrong password",
          });
        });
    } catch (err) {
      console.error("Error Response:", err);

      console.log(err);
    }
  };

  return (
    <div className="loginContainer">
      <form>
        <center>
          <h3>Login</h3>
        </center>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={userEmail}
          autoComplete="username"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          label="password"
          variant="outlined"
          autoComplete="password"
          value={userPassword}
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <div className="google-register">
          <Button variant="outlined" className="google-btn">
            <FcGoogle />
          </Button>
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
