import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ age: "", gender: "", height: "", weight: "" });

  const token = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data.profile);
        setFormData(response.data.profile.profileDetails);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(
        "http://localhost:5000/api/user/update-profile", // Correct endpoint
        formData, // Send only profile details
        { headers: {  Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileDetails: response.data.profile, // Update only profileDetails
        }));
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {isEditing ? (
            <div>
              <label>Age: <input type="text" name="age" value={formData.age} onChange={handleInputChange} /></label><br/>
              <label>Gender: <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} /></label><br/>
              <label>Height: <input type="text" name="height" value={formData.height} onChange={handleInputChange} /></label><br/>
              <label>Weight: <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} /></label><br/>
              <button className="btn btn-success mt-2" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p><strong>Age:</strong> {profile.profileDetails.age}</p>
              <p><strong>Gender:</strong> {profile.profileDetails.gender}</p>
              <p><strong>Height:</strong> {profile.profileDetails.height}</p>
              <p><strong>Weight:</strong> {profile.profileDetails.weight}</p>
              <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;

