import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserWorkoutPage = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/workout-plan`, {
        headers: { Authorization: `Bearer ${userId}` },
      })
      .then((response) => {
        console.log("Workout Plan Data:", response.data.workoutPlan);
        setWorkoutPlans(response.data.workoutPlan);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
        setError("Failed to fetch workout plans.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Workout Plan</h2>
      {loading ? (
        <p className="text-center">Loading workout plans...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : workoutPlans.length > 0 ? (
        <div className="row justify-content-center">
          {workoutPlans.map((plan, index) => (
            <div key={plan._id} className="col-md-6 mb-4">
              <div className="card shadow-lg border-0 rounded-lg">
                <div className="card-body">
                  <h5 className="card-title text-center">Plan {index + 1}</h5>
                  <p className="text-muted text-center">
                    Created on: {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                  <ul className="list-group list-group-flush">
                    {plan.exercises.map((exercise) => (
                      <li key={exercise._id} className="list-group-item">
                        <h6 className="mb-1">{exercise.name}</h6>
                        <p className="mb-0">
                          <strong>Reps:</strong> {exercise.reps}, <strong>Sets:</strong> {exercise.sets}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No workout plan assigned yet.</p>
      )}
    </div>
  );
};

export default UserWorkoutPage;
