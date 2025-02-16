import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data);
    } catch (error) {
      setError("Failed to fetch users");
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedData({ name: user.name, email: user.email, role: user.role }); // Ensure role is included
  };

  const handleInputChange = (e, field) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }

      console.log("Updating user:", editedData); // Debugging: Check request payload

      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`,
        { ...editedData }, // Send full edited data including role
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditingUserId(null);
      fetchUsers(token); // Refresh users list
    } catch (error) {
      console.error("Update failed:", error.response ? error.response.data : error);
      setError("Failed to update user");
    }
  };
// Delete User
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("adminToken");

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted user from the list without re-fetching
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user");
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
            <th>Actions</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                
                {/* Name column */}
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(user)}>{user.name}</span>
                  )}
                </td>

                {/* Email column */}
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="form-control"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(user)}>{user.email}</span>
                  )}
                </td>

                {/* Role column */}
                <td>
                  {editingUserId === user._id ? (
                    <select
                      value={editedData.role}
                      onChange={(e) => handleInputChange(e, "role")}
                      className="form-control"
                    >
                      <option value="User">User</option>
                      <option value="Trainer">Trainer</option>
                    </select>
                  ) : (
                    <span onClick={() => handleEditClick(user)}>{user.role}</span>
                  )}
                </td>

                {/* Save button */}
                <td>
                  {editingUserId === user._id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleSave(user._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                {/* delete button */}
                <td>
                  <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
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




