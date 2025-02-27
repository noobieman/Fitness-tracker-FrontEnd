import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserLogin.css"; // Create this CSS file for custom styles

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login/User`, {
        email,
        password,
      });

      const token = response.data.token;
      const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode

      if (decodedToken.role !== "User") {
        setError("Only users are allowed to log in.");
        return;
      }

      localStorage.setItem("userToken", token);
      navigate("/user/dashboard"); // Redirect to user dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="user-login-container">
      {/* Website Header */}
      <header className="website-header">
        <h1 className="website-name">Physicaa</h1>
      </header>

      {/* Login Form */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 login-card">
          <h2 className="text-center mb-4">User Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 primary-button">
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;