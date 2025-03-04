import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TrainerAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/trainer/appointments`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                if (Array.isArray(response.data.appointments)) {
                    setAppointments(response.data.appointments);
                } else {
                    setAppointments([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
                setError("Failed to fetch appointments.");
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment._id === id ? { ...appointment, status: newStatus } : appointment
            )
        );
    };

    const updateStatus = (id, newStatus) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/api/trainer/appointments/${id}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            )
            .then((response) => {
                console.log("Status updated:", response.data);
                alert("Status updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating status:", error);
                alert("Failed to update status.");
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Appointments</h2>
            <ul className="list-group">
                {appointments.map((appointment) => (
                    <li className="list-group-item" key={appointment._id}>
                        <strong>Client Name:</strong> {appointment.userId?.name}
                        <br />
                        <strong>Email:</strong> {appointment.userId?.email}
                        <br />
                        <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                        <br />
                        <strong>Status:</strong>
                        <select
                            value={appointment.status}
                            onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                            className="btn btn-primary btn-sm ms-2"
                            onClick={() => updateStatus(appointment._id, appointment.status)}
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerAppointment;
