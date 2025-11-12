import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RoomForm({ room, onSave, hotelId }) {
  const [name, setName] = useState(room?.name || "");
  const [type, setType] = useState(room?.type || "");
  const [price, setPrice] = useState(room?.price || "");
  const [status, setStatus] = useState(room?.status || "available");
  const [roomNumber, setRoomNumber] = useState(room?.room_number || "");
  const [floorNumber, setFloorNumber] = useState(room?.floor_number || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      type,
      price,
      status,
      hotel_id: hotelId,
      room_number: roomNumber,
      floor_number: floorNumber,
    };

    try {
      if (room) {
        await axios.put(
          `http://localhost:5000/api/reception/room/${room.id}`,
          data
        );
      } else {
        await axios.post("http://localhost:5000/api/reception/room", data);
      }
      onSave();
    } catch (err) {
      console.error("Error saving room:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{room ? "Edit" : "Add"} Room</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Room name"
        required
      />
      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type (Single, Double)"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="booked">Booked</option>
      </select>
      <input
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        placeholder="Room Number (e.g., 101)"
        required
      />
      <input
        type="number"
        value={floorNumber}
        onChange={(e) => setFloorNumber(e.target.value)}
        placeholder="Floor Number"
        required
      />
      <button type="submit">{room ? "Update" : "Add"}</button>
    </form>
  );
}
