import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RoomForm from "./RoomForm";
import RoomBookings from "./RoomBookings";
import SendRequestForm from "./SendRequestForm";
import classes from "./ReceptionDashboard.module.css";
import { Bell, UserCircle } from "lucide-react";

export default function ReceptionDashboard() {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [hotelName, setHotelName] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const hotelId = localStorage.getItem("hotel_id");
  const navigate = useNavigate();

  // Fetch hotel details to get hotel name
  const fetchHotelDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/officer/hotels/${hotelId}`
      );
      setHotelName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch hotel details", err);
    }
  };

  // Fetch rooms on load or after save
  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reception/rooms/${hotelId}`
      );
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
    fetchRooms();
  }, [hotelId]);

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/reception/room/${id}`);
      fetchRooms();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFormClose = () => {
    setEditingRoom(null);
    setShowForm(false);
    fetchRooms();
  };

  const toggleBookings = (roomId) => {
    setSelectedRoomId((prev) => (prev === roomId ? null : roomId));
  };

  // Logout function
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("hotel_id");
    localStorage.removeItem("session");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Receptionist Dashboard</h2>
        <div className={classes.actions}>
          <button
            className={classes.notification_button}
            aria-label="Notifications"
          >
            <Bell className={classes.icon} />
            <span className={classes.notification_badge}>3</span>
          </button>
          <div className={classes.user_info}>
            <UserCircle className={classes.user_icon} />
            <span className={classes.user_name}>Reception</span>
          </div>
          <button onClick={handleLogout} className={classes.logoutButton}>
            Logout
          </button>
        </div>
      </div>
      <p>Managing Rooms for {hotelName || `Hotel ID: ${hotelId}`}</p>

      <button onClick={() => setShowRequestForm(true)}>📩 Send Request</button>

      {showRequestForm && (
        <SendRequestForm
          hotelId={hotelId}
          onClose={() => setShowRequestForm(false)}
        />
      )}

      <div className={classes.roomList}>
        {rooms.map((room) => (
          <div key={room.id} className={classes.roomCard}>
            <h3>{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>Room Number: {room.room_number ?? "-"}</p>
            <p>Floor Number: {room.floor_number ?? "-"}</p>
            <p>Price: {room.price}ETB</p>
            <p>Status: {room.available ? "Available" : "Booked"}</p>
            <div className={classes.buttonGroup}>
              <button onClick={() => handleEdit(room)}>✏️ Edit</button>
              <button onClick={() => handleDelete(room.id)}>🗑 Delete</button>
              <button onClick={() => toggleBookings(room.id)}>
                {selectedRoomId === room.id ? "Hide Bookings" : "View Bookings"}
              </button>
            </div>
            {selectedRoomId === room.id && <RoomBookings roomId={room.id} />}
          </div>
        ))}
      </div>
    </div>
  );
}
