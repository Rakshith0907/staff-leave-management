import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from '../api/axios'
import "../styles/Login.css"
import { MdWavingHand } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth()
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login/", { username, password });
      const { access, refresh } = response.data;
      const profileResponse = await api.get("/auth/profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      login(profileResponse.data, access, refresh)
      navigate("/");
    } catch (err) {
      console.log(err)
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-head">
          <h3>Staff Leave Management</h3>
        </div>
        <div className="login-box">
          <h5>Welcome back!!! <MdWavingHand /> </h5>
          <form method="POST" onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}> {error} </p>}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
