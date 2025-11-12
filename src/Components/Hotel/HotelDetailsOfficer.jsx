import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./HotelOfficer.module.css";
import RoomManagement from "./RoomManagement";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingTracker from "./BookingTracker";

function HotelDetailOfficer() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/officer/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Error loading hotel", err));
  }, [id]);

  if (!hotel)
    return (
      <p className={classes.load} style={{ color: "red" }}>
        Loading...
      </p>
    );

  const handleBack = async () => {
    navigate("/tour/manage-hotel");
  };

  return (
    <>
      <div className={classes.hotel_detail_container}>
        <button className={classes.back_link} onClick={handleBack}>
          Back to Hotels list
        </button>

        <h1 className={classes.hotel_title}>{hotel.name} - Rooms</h1>
        <div className={classes.hotel_meta}>
          <span className={classes.hotel_location}>{hotel.location}</span>
        </div>

        <div className={classes.hotel_image_carousel}>
          <img
            src={hotel.image}
            alt={hotel.name}
            className={classes.main_image}
          />
        </div>
        <p className={classes.hotel_description}>
          Experience luxury and comfort in the heart of the city. Our hotel
          offers spectacular views and world-class amenities.
        </p>

        <h2 className={classes.room_section_title}> Available Rooms</h2>
        <div className={classes.room_list}>
          {hotel.rooms.map((room) => (
            <div
              key={room.id}
              className={`room-card ${room.available ? "available" : "booked"}`}
            >
              <img
                src={room.image}
                alt={room.type}
                className={classes.room_image}
              />

              <div className={classes.room_details}>
                <h3>{room.type}</h3>
                <p className={classes.room_price}>Price: {room.price} ETB</p>
                <p>Room Number: {room.room_number || "N/A"}</p>
                <p>Floor: {room.floor_number || "N/A"}</p>
              </div>

              <div className={classes.room_status}>
                <span
                  className={`status-badge ${room.available ? "green" : "red"}`}
                >
                  {room.available ? "Available" : "Booked"}
                </span>
              </div>
              {!room.available && room.booking && (
                <div className={classes.booking_info}>
                  <p>Booked by: {room.booking.fullName}</p>
                  <p>
                    Payment status:
                    <span className={classes.paid_badge}>
                      {room.booking.paid ? "Paid" : "Unpaid"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <RoomManagement />
      <BookingTracker hotelId={id} />
    </>
  );
}
export default HotelDetailOfficer;
{
  /* this line of code are not necessary in officer side  */
}
{
  /* {room.available && (
              <button className={classes.book_btn}>Book Now</button>
            )} */
}

{
  /* the below are old  */
}

{
  /* <p>Status: {room.available ? "Available" : "Booked"}</p>
            {room.booking && (
              <p>
                <strong>Booked By:</strong> {room.booking.fullName} <br />
                <strong>Paid:</strong> {room.booking.paid ? "Yes" : "No"}
              </p>
            )} */
}

// // src/components/HotelDetails.js
// import React, { useState, useEffect } from "react";
// import { fetchHotelDetails } from "../../api";

// const HotelDetailsOfficer = ({ hotelId }) => {
//   const [hotel, setHotel] = useState(null);

//   useEffect(() => {
//     const getHotelDetails = async () => {
//       try {
//         const response = await fetchHotelDetails(hotelId);
//         setHotel(response.data);
//       } catch (error) {
//         console.error("Error fetching hotel details", error);
//       }
//     };

//     getHotelDetails();
//   }, [hotelId]);

//   if (!hotel) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{hotel.name}</h2>
//       <p>{hotel.description}</p>
//       <p>Location: {hotel.location}</p>
//       <p>Rating: {hotel.rating}</p>
//     </div>
//   );
// };

// export default HotelDetailsOfficer;
