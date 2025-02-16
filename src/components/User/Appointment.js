import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAppointmentPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/user/users", {
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
    axios.get("http://localhost:5000/api/user//my-appointments", {
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
    axios.post("http://localhost:5000/api/user/book", {
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
    axios.delete(`http://localhost:5000/api/user/cancel/${appointmentId}`, {
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
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      {message && <p className="text-info">{message}</p>}
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
      <button className="btn btn-primary" onClick={handleBookAppointment}>Book Appointment</button>

      <h2 className="mt-4">Your Appointments</h2>
      <ul className="list-group">
        {appointments.map(appointment => (
          <li key={appointment._id} className="list-group-item d-flex justify-content-between align-items-center">
            Trainer: {appointment.trainer?.name || "Unknown"} | Date: {appointment.date}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppointmentPage;
