import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAppointmentPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/user/users`, {
      params: { role: "Trainer" },
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(response => {
      setTrainers(response.data.data);
    })
    .catch(error => {
      console.error("Error fetching trainers:", error);
      setMessage("Failed to fetch trainers.");
    });
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/my-appointments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(response => {
      setAppointments(response.data.appointments);
    })
    .catch(error => {
      console.error("Error fetching appointments:", error);
      setMessage("Error fetching appointments.");
    });
  };

  const handleBookAppointment = () => {
    if (!selectedTrainer || !date) {
      setMessage("Please select a trainer and date.");
      return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/book`, {
      trainerId: selectedTrainer,
      date,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(response => {
      setMessage(response.data.message);
      fetchAppointments();
    })
    .catch(error => {
      console.error("Error booking appointment:", error);
      setMessage("Failed to book appointment.");
    });
  };

  const handleDeleteAppointment = (appointmentId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/cancel/${appointmentId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
    .then(() => {
      setMessage("Appointment deleted successfully.");
      fetchAppointments();
    })
    .catch(error => {
      console.error("Error deleting appointment:", error);
      setMessage("Failed to delete appointment.");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book an Appointment</h2>
      {message && <p className="text-info text-center">{message}</p>}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-lg p-4">
            <div className="mb-3">
              <label className="form-label">Select Trainer</label>
              <select 
                className="form-select" 
                value={selectedTrainer} 
                onChange={(e) => setSelectedTrainer(e.target.value)}
              >
                <option value="">Choose a trainer</option>
                {trainers.map(trainer => (
                  <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleBookAppointment}>Book Appointment</button>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-5">Your Appointments</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ul className="list-group">
            {appointments.map(appointment => (
              <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span><strong>Trainer:</strong> {appointment.trainerId?.name || "Unknown"} | <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString("en-GB")}</span>

                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentPage;
