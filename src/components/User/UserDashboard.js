import React from "react";
import UserNavbar from "./UserNavbar";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {    
        localStorage.removeItem("userToken");
        navigate("/");
    };
  
    return (
      <div>
        {/* Navbar */}
        <UserNavbar handleLogout={handleLogout} />
  
        {/* Dashboard Content */}
        <div className="container mt-5">
          <h2 className="text-center mb-4">User Dashboard</h2>
  
          <div className="row justify-content-center">
            {/* Workout Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  className="card-img-top"
                  alt="Workout"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Workout</h5>
                  <p className="card-text">View your workout plan.</p>
                  <button onClick={() => navigate('/user/workout')} className="btn btn-primary w-100">View Workout</button>
                </div>
              </div>
            </div>
  
            {/* Appointment Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1672862927484-cfc92dd88081?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  className="card-img-top"
                  alt="Appointment"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Appointment</h5>
                  <p className="card-text">Manage your appointments.</p>
                  <button onClick={() => navigate('/user/appointments')} className="btn btn-primary w-100">View Appointments</button>
                </div>
              </div>
            </div>
  
            {/* Nutrition Card */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  className="card-img-top"
                  alt="Nutrition"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Nutrition</h5>
                  <p className="card-text">Check your nutrition plan.</p>
                  <button onClick={() => navigate('/user/nutrition')} className="btn btn-primary w-100">View Nutrition</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserDashboard;
