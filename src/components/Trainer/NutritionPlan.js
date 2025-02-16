import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <h2>Nutrition Plan</h2>
      {loading ? (
        <p>Loading nutrition plans...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : nutritionPlans.length > 0 ? (
        <div>
          {nutritionPlans.map((plan, index) => (
            <div key={plan._id} className="mb-3 border p-3">
              <h5>Plan {index + 1} (Created on: {new Date(plan.createdAt).toLocaleDateString()})</h5>
              {plan.meals.map((meal) => (
                <div key={meal._id} className="mb-2">
                  <h6>{meal.mealType}</h6>
                  <ul>
                    {meal.foodItems.map((food) => (
                      <li key={food._id}>
                        {food.name} - {food.calories} kcal, {food.protein}g protein, {food.carbs}g carbs, {food.fats}g fats
                      </li>
                    ))}
                  </ul>
                  <p><strong>Total Calories:</strong> {meal.totalCalories} kcal</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No nutrition plan assigned yet.</p>
      )}
    </div>
  );
};

export default NutritionPlanPage;