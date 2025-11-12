import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TourBookingList() {
  const [bookings, setBookings] = useState([]);
  const { tourId } = useParams();

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/tours/${tourId}/bookings`)
  //     .then((res) => res.json())
  //     .then(setBookings);
  // }, [tourId]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${tourId}/bookings`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched bookings:", data);
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error("Expected array but got:", data);
          setBookings([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBookings([]);
      });
      console.log("tourId from URL:", tourId);
  }, [tourId]);
  

  const updateStatus = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Email</th>
          <th>Status</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.id}>
            <td>{b.customer_name}</td>
            <td>{b.email}</td>
            <td>{b.status}</td>
            <td>
              <select
                onChange={(e) => updateStatus(b.id, e.target.value)}
                value={b.status}
              >
                <option>pending</option>
                <option>paid</option>
                <option>cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
