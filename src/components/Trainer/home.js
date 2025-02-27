import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TrainerHomePage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/trainer/clients`, {
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
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Trainer Dashboard</h2>
      {loading ? (
        <p className="text-center">Loading clients...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : clients.length > 0 ? (
        <div>
          <h3 className="mb-3">Assigned Clients</h3>
          <ul className="list-group">
            {clients.map((client) => (
              <li
                key={client._id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3 border rounded shadow-sm mb-3"
              >
                <div className="mb-3 mb-md-0">
                  <h5 className="mb-1">{client.name}</h5>
                  <p className="mb-1"><strong>Email:</strong> {client.email}</p>
                  <p className="mb-1"><strong>Age:</strong> {client.profileDetails?.age || "N/A"}</p>
                  <p className="mb-1"><strong>Gender:</strong> {client.profileDetails?.gender || "N/A"}</p>
                  <p className="mb-1"><strong>Height:</strong> {client.profileDetails?.height || "N/A"}</p>
                  <p className="mb-1"><strong>Weight:</strong> {client.profileDetails?.weight || "N/A"}</p>
                </div>
                <div className="d-flex flex-column flex-md-row gap-2">
                  <button className="btn btn-primary" onClick={() => handleViewWorkout(client._id)}>
                    View Workout Plans
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleViewNutrition(client._id)}>
                    View Nutrition Plans
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center mt-4">
            <button className="btn btn-danger px-4" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">No clients assigned yet.</p>
      )}
    </div>
  );
};

export default TrainerHomePage;
