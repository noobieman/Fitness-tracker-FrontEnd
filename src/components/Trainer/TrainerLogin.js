import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TrainerLogin.css"; // Create this CSS file for custom styles

const TrainerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login/Trainer`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/trainer/dashboard"); // Redirect to trainer dashboard
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="trainer-login-container">
      {/* Website Header */}
      <header className="website-header">
        <h1 className="website-name">Physicaa</h1>
      </header>

      {/* Login Form */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 login-card">
              <h2 className="text-center mb-4">Trainer Login</h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerLogin;