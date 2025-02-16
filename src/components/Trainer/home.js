import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrainerHomePage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trainer/clients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setClients(response.data.clients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients.");
        setLoading(false);
      });
  }, []);

  const handleViewWorkout = (clientId) => {
    navigate(`/workout-plans/${clientId}`);
  };

  const handleViewNutrition = (clientId) => {
    navigate(`/nutrition-plans/${clientId}`);
  }

  const handleLogout = () => {    
    localStorage.removeItem("userToken");
    navigate("/login");
  };
  
  return (
    <div className="container mt-4">
      <h2>Trainer Dashboard</h2>
      {loading ? (
        <p>Loading clients...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : clients.length > 0 ? (
        <div>
          <h3>Assigned Clients</h3>
          <ul className="list-group">
            {clients.map((client) => (
              <li key={client._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>Name:</strong> {client.name} <br />
                  <strong>Email:</strong> {client.email} <br />
                  <strong>Age:</strong> {client.profileDetails?.age || "N/A"} <br />
                  <strong>Gender:</strong> {client.profileDetails?.gender || "N/A"} <br />
                  <strong>Height:</strong> {client.profileDetails?.height || "N/A"} <br />
                  <strong>Weight:</strong> {client.profileDetails?.weight || "N/A"}
                </div>
                <button className="btn btn-primary" onClick={() => handleViewWorkout(client._id)}>
                  View Workout Plans
                </button>
                <button className="btn btn-secondary" onClick={() => handleViewNutrition(client._id)}>
                  View Workout Plans
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>No clients assigned yet.</p>
      )}
    </div>
  );
};

export default TrainerHomePage;

