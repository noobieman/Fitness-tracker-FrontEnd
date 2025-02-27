import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NutritionPlanPage = () => {
  const { clientId } = useParams();
  const [nutritionPlans, setNutritionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/trainer/user-diet/${clientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setNutritionPlans(response.data.nutritionPlans);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching nutrition plans:", error);
        setError("Failed to fetch nutrition plans.");
        setLoading(false);
      });
  }, [clientId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nutrition Plan</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading nutrition plans...</p>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : nutritionPlans.length > 0 ? (
        <div className="row">
          {nutritionPlans.map((plan, index) => (
            <div key={plan._id} className="col-md-6">
              <div className="card shadow-sm mb-4 border-0 rounded">
                <div className="card-body">
                  <h5 className="card-title">
                    Plan {index + 1} <small className="text-muted">({new Date(plan.createdAt).toLocaleDateString()})</small>
                  </h5>
                  {plan.meals.map((meal) => (
                    <div key={meal._id} className="mb-3">
                      <h6 className="text-primary">{meal.mealType}</h6>
                      <ul className="list-group">
                        {meal.foodItems.map((food) => (
                          <li key={food._id} className="list-group-item">
                            <strong>{food.name}</strong> - {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fats
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2"><strong>Total Calories:</strong> {meal.totalCalories} kcal</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No nutrition plan assigned yet.</p>
      )}
    </div>
  );
};

export default NutritionPlanPage;
