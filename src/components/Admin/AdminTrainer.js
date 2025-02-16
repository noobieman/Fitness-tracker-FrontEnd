import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchUsers(token);
    fetchTrainers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users-with-trainers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data);
    } catch (error) {
      setError("Failed to fetch users with trainers");
    }
  };
  

  const fetchTrainers = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/admin/users?role=Trainer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrainers(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      setError("Failed to fetch trainers");
    }
  };

  const handleAssignTrainer = async (userId) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/assign-trainer`,
        { userId: userId,
            trainerId: selectedTrainer[userId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(token);
    } catch (error) {
      setError("Failed to assign trainer");
    }
  };

  //delete assigned trainer
  const handleRemoveTrainer = async (userId) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/remove-trainer/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(token); // Refresh user list after removal
    } catch (error) {
      setError("Failed to remove trainer");
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Users</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Assigned Trainer</th>
            <th>Edit Trainer</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.assignedTrainer ? user.assignedTrainer.name : "Not Assigned"}</td>
                <td>
  <select
    className="form-select"
    value={selectedTrainer[user._id] || ""}
    onChange={(e) =>
      setSelectedTrainer({ ...selectedTrainer, [user._id]: e.target.value })
    }
  >
    <option value="">Select Trainer</option>
    {trainers.map((trainer) => (
      <option key={trainer._id} value={trainer._id}>
        {trainer.name}
      </option>
    ))}
  </select>
  <button
    className="btn btn-primary btn-sm mt-2"
    onClick={() => handleAssignTrainer(user._id)}
  >
    Update Trainer
  </button>
  {user.assignedTrainer && (
    <button
      className="btn btn-danger btn-sm mt-2 ms-2"
      onClick={() => handleRemoveTrainer(user._id)}
    >
      Remove Trainer
    </button>
  )}
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

