import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomBookings({ roomId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reception/room/${roomId}/bookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, [roomId]);

  return (
    <div>
      <h4>Bookings</h4>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              {b.customer_name} | {b.check_in} - {b.check_out} | {b.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
