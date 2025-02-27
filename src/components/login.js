import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import './LoginSelection.css'; // Create this CSS file for custom styles


const LoginSelection = () => {
  const navigate = useNavigate();

  

  return (
<>


    <div className="login-selection-container">
      {/* Website Name */}
      <header className="website-header">
        <h1 className="website-name">Physicaa</h1>
        <div className="d-flex justify-content-end">
  <button className="btn btn-primary" onClick={() => navigate('/signup')}>
    Register
  </button>
</div>

      </header>
{/* Carousel start */}
<Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Get personalized diet plans for a healthier you!</h3>
          <p>"Our experienced diet coach will guide you in choosing the right nutrients and creating a personalized diet plan for a healthier lifestyle!"</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Get expert coaching from experienced trainers for the right workout! </h3>
          <p>Train with experienced coaches who will guide you through the right workouts tailored to your fitness goals. Achieve results with expert support!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Start your fitness journey with Physicaa today! </h3>
          <p>
          Kickstart your fitness journey with Physicaa! Get expert coaching, personalized workouts, and the right nutrition to achieve your health goals.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    {/* carousel end */}

      {/* Main Content */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Select Your Login</h2>
        <div className="row">
          {/* User Login Card */}
          <div className="col-md-4 mb-3">
            <div
              className="card login-card"
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
              className="card login-card"
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
              className="card login-card"
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
    </div>
    </>
  );
};

export default LoginSelection;