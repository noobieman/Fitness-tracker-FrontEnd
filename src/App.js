import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import LoginSelection from "./components/login";
import AdminLogin from "./components/Admin/adminLogin";
import AdminHome from "./components/Admin/Home";
import AdminUsers from "./components/Admin/AdminUsers";
import UserTrainerPage from "./components/Admin/AdminTrainer";
import UserLogin from "./components/User/UserLogin";
import UserDashboard from "./components/User/UserDashboard"
import UserNavbar from "./components/User/UserNavbar";
import UserProfile from "./components/User/UserProfile";
import UserWorkoutPage from "./components/User/WorkOut"
import TrainerLogin from "./components/Trainer/TrainerLogin"
import TrainerHomePage from "./components/Trainer/home"
import WorkoutPlanPage from "./components/Trainer/WorkoutPlan"
import NutritionPlanPage from "./components/Trainer/NutritionPlan"
import UserAppointmentPage from "./components/User/Appointment"
import UserNutritionPage from "./components/User/Nutrition"

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          //type
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LoginSelection />} />
          <Route path="/login/admin" element={<AdminLogin />} />

          // Admin Routes
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/trainers" element={<UserTrainerPage />} />

          // User Routes
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/navbar" element={<UserNavbar />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/workout" element={<UserWorkoutPage />} />
          <Route path="/user/appointments" element={<UserAppointmentPage />} />
          <Route path="/user/nutrition" element={<UserNutritionPage />} />


          //Trainer Routes
          <Route path="/login/trainer" element={<TrainerLogin />} />
          <Route path="/trainer/dashboard" element={<TrainerHomePage />} />
          <Route path="/workout-plans/:clientId" element={<WorkoutPlanPage />} />
          <Route path="/nutrition-plans/:clientId" element={<NutritionPlanPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
