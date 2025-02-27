import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Create this CSS file for custom styles

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ age: "", gender: "", height: "", weight: "" });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProfile(response.data.profile);
        setFormData(response.data.profile.profileDetails);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/update-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileDetails: response.data.profile,
        }));
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="user-profile-container">
      <h2 className="profile-heading">User Profile</h2>
      {profile ? (
        <div className="profile-details">
          {/* Basic Info Section */}
          <div className="profile-section">
            <h3 className="section-title">Basic Information</h3>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>

          {/* Profile Details Section */}
          <div className="profile-section">
            <h3 className="section-title">Profile Details</h3>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Height:</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Weight:</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-success save-button" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="view-details">
                <p><strong>Age:</strong> {profile.profileDetails.age}</p>
                <p><strong>Gender:</strong> {profile.profileDetails.gender}</p>
                <p><strong>Height:</strong> {profile.profileDetails.height}</p>
                <p><strong>Weight:</strong> {profile.profileDetails.weight}</p>
                <button className="btn btn-primary edit-button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;