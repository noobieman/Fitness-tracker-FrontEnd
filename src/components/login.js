import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select Your Login</h2>
      <div className="row">
        {/* User Login Card */}
        <div className="col-md-4 mb-3">
          <div
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login/user')}
          >
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="card-img-top"
              alt="User Login"
            />
            <div className="card-body text-center">
              <h5 className="card-title">User Login</h5>
              <p className="card-text">Sign in as a User</p>
            </div>
          </div>
        </div>
        {/* Admin Login Card */}
        <div className="col-md-4 mb-3">
          <div
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login/admin')}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1678567671940-64eeefe22e5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="card-img-top"
              alt="Admin Login"
            />
            <div className="card-body text-center">
              <h5 className="card-title">Admin Login</h5>
              <p className="card-text">Sign in as an Admin</p>
            </div>
          </div>
        </div>
        {/* Trainer Login Card */}
        <div className="col-md-4 mb-3">
          <div
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login/trainer')}
          >
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="card-img-top"
              alt="Trainer Login"
            />
            <div className="card-body text-center">
              <h5 className="card-title">Trainer Login</h5>
              <p className="card-text">Sign in as a Trainer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
