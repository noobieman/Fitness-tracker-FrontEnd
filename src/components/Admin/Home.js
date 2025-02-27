import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="container mt-5 admin-dashboard">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      
      <div className="row justify-content-center g-4">
        <div className="col-md-5">
          <div className="card p-4 shadow text-center">
            <h4>Manage Users</h4>
            <p>View, edit, or remove registered users.</p>
            <button className="btn btn-primary w-100" onClick={() => navigate("/admin/users")}>
              Go to Users
            </button>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card p-4 shadow text-center">
            <h4>Manage Trainers</h4>
            <p>Assign trainers and track their performance.</p>
            <button className="btn btn-primary w-100" onClick={() => navigate("/admin/trainers")}>
              Go to Trainers
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-danger px-4" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminHome;