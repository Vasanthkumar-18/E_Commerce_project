import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./css/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios
        .post("http://localhost:4000/register", {
          name: userName,
          email: userEmail,
          password: userPassword,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: res.data,
          });
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          navigate("/login");
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Please Try Again",
          })
        );
    } catch (err) {
      console.error("Error Response:", err);
    }
  };

  return (
    <div className="loginContainer">
      <form>
        <center>
          <h3>Register</h3>
        </center>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          autoComplete="username"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="password"
          variant="outlined"
          value={userPassword}
          autoComplete="current-password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleRegister}>
          Submit
        </Button>
        <div className="google-register">
          <Button variant="outlined" className="google-btn">
            <FcGoogle />
          </Button>
          <Button
            variant="contained"
            className="register-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
