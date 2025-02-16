import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-5">
      <h2>Admin Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
