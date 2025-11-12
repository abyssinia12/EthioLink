import React, { useState } from "react";
import axios from "axios";
import classes from "./ReceptionDashboard.module.css";

export default function SendRequestForm({ hotelId, onClose }) {
  const [type, setType] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await axios.post("http://localhost:5000/api/reception/request", {
        hotel_id: hotelId,
        type,
        room,
        description,
        priority,
      });
      setSuccess(true);
      setType("");
      setRoom("");
      setDescription("");
      setPriority("Medium");
      if (onClose) onClose();
    } catch (err) {
      setError("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.roomCard}
      style={{ maxWidth: 400, margin: "1rem auto" }}
    >
      <h3>Send Request to Tour Officer</h3>
      <label>
        Request Type
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select type</option>
          <option value="Room Unavailable">Room Unavailable</option>
          <option value="Need New Room">Need New Room</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Room Number/Name (optional)
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room number or name"
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue or request"
          required
          rows={3}
        />
      </label>
      <label>
        Priority
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Sending..." : "Send Request"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Request sent successfully!</p>}
      <button
        type="button"
        onClick={onClose}
        style={{ marginTop: 8, background: "#ccc", color: "#222" }}
      >
        Cancel
      </button>
    </form>
  );
}
