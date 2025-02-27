/**
 * The `WorkoutPlanPage` component in React fetches, displays, adds, and edits workout plans for a
 * specific client using data from an API.
 * @returns The `WorkoutPlanPage` component is being returned. It contains JSX elements for displaying
 * workout plans, client information, adding new workout plans, editing existing workout plans, and
 * listing workout plans with options to edit them. The component fetches data from an API using Axios
 * and manages state using React's `useState` and `useEffect` hooks.
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkoutPlanPage = () => {
  const { clientId } = useParams();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientInfo, setClientInfo] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newWorkout, setNewWorkout] = useState({ exercises: [{ name: "", sets: "", reps: "", duration: "", weight: "" }] });
  const [adding, setAdding] = useState(false);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/trainer/${clientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setWorkoutPlans(response.data.workoutPlans);
        if (response.data.workoutPlans.length > 0) {
          setClientInfo(response.data.workoutPlans[0].client);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
        setError("Failed to fetch workout plans.");
        setLoading(false);
      });
  }, [clientId]);

  const handleAddWorkout = () => {
    setAdding(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/trainer/workout`, {
        clientId,
        exercises:[...newWorkout.exercises],
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setWorkoutPlans([...workoutPlans, response.data.workoutPlan]);
        setNewWorkout({ exercises: [{ name: "", sets: "", reps: "", duration: "", weight: "" }] });
        setAdding(false);
      })
      .catch((error) => {
        console.error("Error adding workout plan:", error);
        setError("Failed to add workout plan.");
        setAdding(false);
      });
  };


/**
 * The function `handleDeleteWorkout` sends a DELETE request to a specified endpoint to delete a
 * workout plan based on its ID.
 * @param planId - The `planId` parameter in the `handleDeleteWorkout` function represents the unique
 * identifier of the workout plan that is being deleted. This identifier is used to make a DELETE
 * request to the server to delete the specific workout plan with that ID.
 */
  const handleDeleteWorkout = (planId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/trainer/${planId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setWorkoutPlans(workoutPlans.filter(plan => plan._id !== planId));
      })
      .catch((error) => {
        console.error("Error deleting workout plan:", error);
        setError("Failed to delete workout plan.");
      });
  };

/**
 * The `handleEditWorkout` function sets the editing plan based on the plan ID, and the
 * `handleSaveEdit` function sends a PUT request to update the workout plan with error handling.
 * @param planId - The `planId` parameter in the `handleEditWorkout` function is used to find a
 * specific workout plan from the `workoutPlans` array based on its `_id` property. This plan is then
 * set as the `editingPlan` state.
 */
  const handleEditWorkout = (planId) => {
    setEditingPlan(workoutPlans.find(plan => plan._id === planId));
  };

  const handleSaveEdit = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/trainer/${editingPlan._id}`,  editingPlan, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setWorkoutPlans(workoutPlans.map(plan => plan._id === editingPlan._id ? response.data.workoutPlan : plan));
        setEditingPlan(null);
      })
      .catch((error) => {
        console.error("Error updating workout plan:", error);
        setError("Failed to update workout plan.");
      });
  };

  /* The above code is a React component that displays workout plans for a client. Here is a breakdown
  of its functionality: */
  return (
    <div className="container mt-4">
      <h2>Workout Plans</h2>
      {loading ? (
        <p>Loading workout plans...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          {clientInfo && (
            <div className="mb-3">
              <h4>Client: {clientInfo.name}</h4>
              <p>Email: {clientInfo.email}</p>
            </div>
          )}
          <div className="mb-3">
            <h4>Add New Workout Plan</h4>
            {newWorkout.exercises.map((exercise, index) => (
              <div key={index} className="mb-2">
                <input type="text" placeholder="Exercise Name" value={exercise.name} onChange={(e) => {
                  const updatedExercises = [...newWorkout.exercises];
                  updatedExercises[index].name = e.target.value;
                  setNewWorkout({ ...newWorkout, exercises: updatedExercises });
                }} />
               <input
  type="number"
  min="1"
  placeholder="Sets"
  value={exercise.sets}
  onChange={(e) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index].sets = e.target.value.replace(/\D/, ""); // Allow only numbers
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  }}
  onKeyDown={(e) => {
    if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
<input
  type="number"
  min="1"
  placeholder="Reps"
  value={exercise.reps}
  onChange={(e) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index].reps = e.target.value.replace(/\D/, ""); // Allow only numbers
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  }}
  onKeyDown={(e) => {
    if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
<input
  type="number"
  min="1"
  placeholder="Duration"
  value={exercise.duration}
  onChange={(e) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index].duration = e.target.value.replace(/\D/, ""); // Allow only numbers
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  }}
  onKeyDown={(e) => {
    if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
<input
  type="number"
  min="1"
  placeholder="Weight"
  value={exercise.weight}
  onChange={(e) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index].weight = e.target.value.replace(/\D/, ""); // Allow only numbers
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  }}
  onKeyDown={(e) => {
    if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
      e.preventDefault();
    }
  }}
/>
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleAddWorkout} disabled={adding}>Add Workout</button>
          </div>
          {editingPlan && (
            <div className="mb-3">
              <h4>Edit Workout Plan</h4>
              {editingPlan.exercises.map((exercise, index) => (
                <div key={index} className="mb-2">
                  <input type="text" value={exercise.name} onChange={(e) => {
                    const updatedExercises = [...editingPlan.exercises];
                    updatedExercises[index].name = e.target.value;
                    setEditingPlan({ ...editingPlan, exercises: updatedExercises });
                  }} />
                   <input type="number" placeholder="Sets" value={exercise.sets} onChange={(e) => {
                    const updatedExercises = [...editingPlan.exercises];
                    updatedExercises[index].sets = e.target.value;
                    setEditingPlan({ ...editingPlan, exercises: updatedExercises });
                  }} />
                  <input type="number" placeholder="Reps" value={exercise.reps} onChange={(e) => {
                    const updatedExercises = [...editingPlan.exercises];
                    updatedExercises[index].reps = e.target.value;
                    setEditingPlan({ ...editingPlan, exercises: updatedExercises });
                  }} />
                  <input type="text" placeholder="Duration" value={exercise.duration} onChange={(e) => {
                    const updatedExercises = [...editingPlan.exercises];
                    updatedExercises[index].duration = e.target.value;
                    setEditingPlan({ ...editingPlan, exercises: updatedExercises });
                  }} />
                  <input type="number" placeholder="Weight" value={exercise.weight} onChange={(e) => {
                    const updatedExercises = [...editingPlan.exercises];
                    updatedExercises[index].weight = e.target.value;
                    setEditingPlan({ ...editingPlan, exercises: updatedExercises });
                  }} />
                </div>
              ))}
              <button className="btn btn-success" onClick={handleSaveEdit}>Save</button>
            </div>
          )}
          {workoutPlans.length > 0 ? (
            <ul className="list-group">
              {workoutPlans.map((plan) => (
                <li key={plan._id} className="list-group-item">
                  <h5>Workout Plan</h5>
                  <ul>
                    {plan.exercises.map((exercise) => (
                      <li key={exercise._id}>{exercise.name} - {exercise.sets} sets, {exercise.reps} reps</li>
                    ))}
                  </ul>
                  <button className="btn btn-danger" onClick={() => handleDeleteWorkout(plan._id)}>Delete</button>
                  <button className="btn btn-warning" onClick={() => handleEditWorkout(plan._id)}>Edit</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No workout plans available for this client.</p>
          )}
        </>
      )}
    </div>
  );
};

export default WorkoutPlanPage;
