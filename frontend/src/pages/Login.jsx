import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Login.css";
import { MdWavingHand } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username && !password){
      setError("Username and Passowrd fields are empty")
    } else if(!username){
      setError("Please enter username")
    } else if(!password){
      setError("Please enter the password")
    } else {
      setLoading(true);
      try {
        const response = await api.post("/auth/login/", { username, password });
        const { access, refresh } = response.data;
        const profileResponse = await api.get("/auth/profile/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        login(profileResponse.data, access, refresh);
        navigate("/");
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Invalid username or password')
        } else if (err.response?.status === 500) {
          setError('Server error, please try again later')
        } else if (!err.response) {
          // setError('Network error, please check your connection')
          console.log(err)
        } else {
          setError('Something went wrong, please try again')
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-head">
          <h1>Staff Leave Management</h1>
        </div>
        <div className="login-box">
          <h2>
            Welcome back!!! <MdWavingHand />{" "}
          </h2>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label className="form-label">Password</label>
            <div className="mb-3" style={{ position: "relative" }}>
              <input 
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div> */}
            <button
              type="submit"
              className={loading ? "btn btn-secondary" : "btn btn-primary"}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}> {error} </p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
