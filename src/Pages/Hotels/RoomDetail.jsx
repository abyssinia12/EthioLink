import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Hotel.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { ChevronLeft } from "lucide-react";

export default function HotelDetails() {
  const { id } = useParams(); // hotelId
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const [roomDetails, setRoomDetails] = useState({});
  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: null,
  });
  const navigate = useNavigate();

  // Fetch hotel & rooms
  useEffect(() => {
    const fetchHotelAndDetails = async () => {
      try {
        const hotelRes = await axios.get(
          `http://localhost:5000/api/customer/hotels/${id}`
        );
        setHotel(hotelRes.data);

        // For each room, fetch features and policies
        const roomDetailsMap = {};
        await Promise.all(
          hotelRes.data.rooms.map(async (room) => {
            const [featuresRes, policiesRes] = await Promise.all([
              axios.get(
                `http://localhost:5000/api/customer/rooms/${room.id}/features`
              ),
              axios.get(
                `http://localhost:5000/api/customer/rooms/${room.id}/policies`
              ),
            ]);
            roomDetailsMap[room.id] = {
              features: featuresRes.data,
              policies: policiesRes.data,
            };
          })
        );

        setRoomDetails(roomDetailsMap);
      } catch (err) {
        console.error("Error fetching room info:", err);
      }
    };

    fetchHotelAndDetails();
  }, [id]);

  const startBooking = (roomId) => {
    setBookingInfo({ fullName: "", email: "", phone: "", roomId });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    const { roomId, fullName, email, phone } = bookingInfo;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/customer/hotels/${id}/book`,
        { roomId, fullName, email, phone }
      );
      const { checkout_url } = res.data;
      checkout_url
        ? (window.location.href = checkout_url)
        : setMessage("Booking created, but payment URL not found.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking or payment failed.");
    }
  };

  const handleBack = () => navigate("/HotelList");

  if (!hotel) return <p>Loading...</p>;

  return (
    <LayOut>
      <div className={classes.detail_container}>
        <button onClick={handleBack}>
          <ChevronLeft color="gray" />
        </button>
        <h2>{hotel.name}</h2>
        <img
          className={classes.hotel_image}
          src={hotel.image_url}
          alt={hotel.name}
        />
        <p className={classes.location}>Location: {hotel.location}</p>

        <h3>Rooms</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {hotel.rooms.map((room) => (
          <div key={room.id} className={classes.room_container}>
            <div className={classes.room_details}>
              <img
                className={classes.room_image}
                src={room.image_url}
                alt={room.type}
              />
              <div className={classes.room_info}>
                <p className={classes.room_type}>{room.type}</p>
                <p>Type: {room.type}</p>
                <p>Price: {room.price} Per Night</p>
                <p>Room Number: {room.room_number || "N/A"}</p>
                <p>Floor: {room.floor_number || "N/A"}</p>
                <p
                  className={
                    room.available
                      ? classes.availability
                      : `${classes.availability} ${classes.not_available}`
                  }
                >
                  {room.available ? "Available" : "Not Available"}
                </p>

                {room.available && bookingInfo.roomId !== room.id && (
                  <button
                    className={classes.book_button}
                    onClick={() => startBooking(room.id)}
                  >
                    Book Room
                  </button>
                )}
              </div>
            </div>

            {/* Features Section */}
            <h4>Room Features</h4>
            <ul>
              {roomDetails[room.id]?.features.map((f) => (
                <li key={f.id}>
                  <strong>{f.title}</strong>: {f.description}
                </li>
              ))}
            </ul>

            {/* Policies Section */}
            <h4>Room Policies</h4>
            <ul>
              {roomDetails[room.id]?.policies.map((p) => (
                <li key={p.id}>
                  <span>{p.icon}</span> <strong>{p.title}</strong>:{" "}
                  {p.description}
                </li>
              ))}
            </ul>

            {/* Booking Form */}
            {bookingInfo.roomId === room.id && (
              <form className={classes.booking_form} onSubmit={submitBooking}>
                <input
                  className={classes.input_field}
                  type="text"
                  placeholder="Full Name"
                  value={bookingInfo.fullName}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, fullName: e.target.value })
                  }
                  required
                />
                <input
                  className={classes.input_field}
                  type="email"
                  placeholder="Email"
                  value={bookingInfo.email}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, email: e.target.value })
                  }
                  required
                />
                <input
                  className={classes.input_field}
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingInfo.phone}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, phone: e.target.value })
                  }
                  required
                />
                <div className={classes.button_group}>
                  <button type="submit" className={classes.confirm_button}>
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    className={classes.cancel_button}
                    onClick={() =>
                      setBookingInfo({ ...bookingInfo, roomId: null })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
        </div>

        {message && <div className={classes.message}>{message}</div>}
      </div>
    </LayOut>
  );
}
