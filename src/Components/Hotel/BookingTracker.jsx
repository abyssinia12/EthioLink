import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './HotelOfficer.module.css'

const BookingTracker = ({ hotelId }) => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    roomId: "",
    hotelName: "",
    roomType: "",
    customerName: "",
    amountPaid: "",
    totalAmount: "",
  });

  useEffect(() => {
    if (hotelId) {
      axios
        .get(`http://localhost:5000/api/hotels/${hotelId}/bookings`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error(err));
    }
  }, [hotelId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    const newBooking = {
      ...form,
      hotelId,
      hotelName,
      roomType,
      amountPaid: parseFloat(form.amountPaid),
      totalAmount: parseFloat(form.totalAmount),
    };

    const res = await axios.post(
      "http://localhost:5000/api/bookings",
      newBooking
    );
    setBookings([...bookings, res.data]);
    setForm({
      roomId: "",
      hotelName: "",
      roomType: "",
      customerName: "",
      amountPaid: "",
      totalAmount: "",
    });
  };

  return (
    <div className={classes.booking_tracker_container}>
      <h3>Book the room</h3>
      <div className={classes.booking_form}>
        <h2>Add New Booking</h2>
        <p>Enter the booking details below</p>
        <input
          name="roomId"
          placeholder="Room ID"
          value={form.roomId}
          onChange={handleChange}
        />
        <input
          name="hotelName"
          placeholder="Hotel Name"
          value={form.hotelName}
          onChange={handleChange}
        />
        <input
          name="roomType"
          placeholder="Room Type"
          value={form.roomType}
          onChange={handleChange}
        />
        <input
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
        />
        <input
          name="amountPaid"
          placeholder="Amount Paid"
          value={form.amountPaid}
          onChange={handleChange}
        />
        <input
          name="totalAmount"
          placeholder="Total Price"
          value={form.totalAmount}
          onChange={handleChange}
        />
        <button onClick={submitBooking}>Add Booking</button>
      </div>

      <div className={classes.recent_bookings}>
        <h2>Recent Bookings</h2>
        <p>Showing {bookings.length} bookings</p>
        {bookings.map((b) => (
          <div className={classes.booking_card} key={b.id}>
            <div className={classes.customer_info}>
              <h4>{b.customerName}</h4>
              <p>Room {b.roomId}</p>
            </div>
            <div className={classes.payment_progress}>
              <span>${b.amountPaid}</span> / ${b.totalAmount}
            </div>
          </div>
        ))}
      </div>

   
    </div>
  );
};

export default BookingTracker;

   {
     /* <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            {b.customerName} - Room {b.roomId} - {b.paymentStatus} ($
            {b.amountPaid} / ${b.totalAmount})
          </li>
        ))}
      </ul> */
   }
