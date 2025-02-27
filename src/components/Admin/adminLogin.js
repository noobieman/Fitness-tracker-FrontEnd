import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Create this CSS file for custom styles

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login/Admin`,
        { email, password },
        { withCredentials: true } // Ensure cookies are sent
      );

      console.log("API Response:", response);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        alert("Login Successful!");
        navigate("/admin-home");
      } else {
        console.error("Unexpected API Response:", response);
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="admin-login-container">
      {/* Website Header */}
      <header className="website-header">
        <h1 className="website-name">Physicaa</h1>
      </header>

      {/* Login Form */}
      <div className="container content mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 login-card">
              <h2 className="text-center mb-4">Admin Login</h2>
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

export default AdminLogin;