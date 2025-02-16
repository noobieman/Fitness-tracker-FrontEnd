import React, { useState, useEffect } from "react";
import axios from "axios";

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
        setWorkoutPlans(response.data.workoutPlan); // Use the array directly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
        setError("Failed to fetch workout plans.");
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="container mt-4">
      <h2>Workout Plan</h2>
      {loading ? (
        <p>Loading workout plans...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : workoutPlans.length > 0 ? (
        <div>
          {workoutPlans.map((plan, index) => (
            <div key={plan._id} className="mb-3 border p-3">
              <h5>Plan {index + 1} (Created on: {new Date(plan.createdAt).toLocaleDateString()})</h5>
              {plan.exercises.map((exercise) => (
                <div key={exercise._id} className="mb-2">
                  <h6>{exercise.name}</h6>
                  <p>
                    <strong>Reps:</strong> {exercise.reps}, <strong>Sets:</strong> {exercise.sets}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No workout plan assigned yet.</p>
      )}
    </div>
  );
};

export default UserWorkoutPage;
