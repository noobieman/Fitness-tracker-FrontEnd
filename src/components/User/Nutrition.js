import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown'; // Correct import
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UserNutritionPage = () => {
  const [mealType, setMealType] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [message, setMessage] = useState("");
  const [meals, setMeals] = useState([]);
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/my-meals`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(response => {
      setMeals(response.data.meals);
    })
    .catch(error => {
      console.error("Error fetching meals:", error);
      setMessage("Failed to fetch meals.");
    });
  };

  const handleMealTypeSelect = (eventKey) => {
    setMealType(eventKey);
  };

  const handleAddFoodItem = () => {
    if (!newFoodItem.name || !newFoodItem.calories || !newFoodItem.protein || !newFoodItem.carbs || !newFoodItem.fats) {
      setMessage("Please fill in all fields for the food item.");
      return;
    }
    setFoodItems([...foodItems, newFoodItem]);
    setNewFoodItem({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    setMessage("Food item added successfully.");
  };

  const handleCreateMeal = () => {
    if (!mealType || foodItems.length === 0) {
      setMessage("Please select a meal type and add at least one food item.");
      return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/add-meal`, { mealType, foodItems }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(response => {
      setMessage("Meal created successfully.");
      setMealType("");
      setFoodItems([]);
      fetchMeals();
    })
    .catch(error => {
      console.error("Error creating meal:", error);
      setMessage("Failed to create meal.");
    });
  };

  const handleDeleteMeal = (mealId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/delete-meal/${mealId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(() => {
      setMessage("Meal deleted successfully.");
      fetchMeals();
    })
    .catch(error => {
      console.error("Error deleting meal:", error);
      setMessage("Failed to delete meal.");
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create a Meal</h2>
      {message && <p className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>{message}</p>}

      {/* Meal Type Dropdown */}
      <div className="mb-3">
        <label className="form-label">Meal Type</label>
        <Dropdown onSelect={handleMealTypeSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-meal-type">
            {mealType || "Select Meal Type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Breakfast">Breakfast</Dropdown.Item>
            <Dropdown.Item eventKey="Lunch">Lunch</Dropdown.Item>
            <Dropdown.Item eventKey="Dinner">Dinner</Dropdown.Item>
            <Dropdown.Item eventKey="Snack">Snack</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Add Food Items */}
      <h4>Add Food Items</h4>
      <div className="mb-3">
        <input type="text" placeholder="Name" className="form-control mb-2" value={newFoodItem.name} onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })} />
        <input type="number" placeholder="Calories" className="form-control mb-2" value={newFoodItem.calories} onChange={(e) => setNewFoodItem({ ...newFoodItem, calories: e.target.value })} />
        <input type="number" placeholder="Protein (g)" className="form-control mb-2" value={newFoodItem.protein} onChange={(e) => setNewFoodItem({ ...newFoodItem, protein: e.target.value })} />
        <input type="number" placeholder="Carbs (g)" className="form-control mb-2" value={newFoodItem.carbs} onChange={(e) => setNewFoodItem({ ...newFoodItem, carbs: e.target.value })} />
        <input type="number" placeholder="Fats (g)" className="form-control mb-2" value={newFoodItem.fats} onChange={(e) => setNewFoodItem({ ...newFoodItem, fats: e.target.value })} />
        <button className="btn btn-secondary" onClick={handleAddFoodItem}>Add Food Item</button>
      </div>

      {/* Display Added Food Items */}
      <h4>Food Items</h4>
      <ul className="list-group">
        {foodItems.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name} - {item.calories} cal, {item.protein}g Protein, {item.carbs}g Carbs, {item.fats}g Fats
          </li>
        ))}
      </ul>

      {/* Create Meal Button */}
      <button className="btn btn-primary mt-3" onClick={handleCreateMeal}>Create Meal</button>

      {/* Display User's Meals */}
      <h2 className="mt-4">My Meals</h2>
      <ul className="list-group">
        {meals.map((meal, index) => (
          <li key={index} className="list-group-item">
            <strong>{meal.mealType}</strong>
            <ul>
              {meal.meals && meal.meals.length > 0 ? (
                meal.meals.map((m, i) => (
                  m.foodItems.map((item, j) => (
                    <li key={`${i}-${j}`}>{item.name} - {item.calories} cal, {item.protein}g Protein, {item.carbs}g Carbs, {item.fats}g Fats</li>
                  ))
                ))
              ) : (
                <li>No food items available</li>
              )}
              
            </ul>
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNutritionPage;