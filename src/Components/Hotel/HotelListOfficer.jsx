// src/components/HotelList.js
// import API from "../../HotelApi/api";
import { Link } from "react-router-dom";
import classes from "./HotelOfficer.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function HotelListOfficer() {
  const [hotels, setHotels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("Failed to fetch hotels:", err));
  }, []);

  const nextHotel = () => {
    setCurrentIndex((prev) => (prev + 1) % hotels.length);
  };

  const prevHotel = () => {
    setCurrentIndex((prev) => (prev - 1 + hotels.length) % hotels.length);
  };

  const currentHotel =
    hotels.length > 0 && currentIndex >= 0 && currentIndex < hotels.length
      ? hotels[currentIndex]
      : null;

  const totalPages = hotels.length; // assuming one hotel per page

  return (
    <div className={classes.container}>
      <h2>All Hotels & Room Availability</h2>
      {/* <div className={classes.navigationButtons}>
        <button
          className={classes.prv}
          onClick={prevHotel}
          disabled={hotels.length <= 1}
        >
          ← Previous
        </button>
        <button
          className={classes.nex}
          onClick={nextHotel}
          disabled={hotels.length <= 1}
        >
          Next →
        </button>
        <p className={classes.count} style={{ marginTop: "20px" }}>
          Hotel {currentIndex + 1} of {hotels.length}
        </p>
      </div> */}

      <div className={classes.pagination}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`${classes.pageButton} ${
              currentIndex === i ? classes.active : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentIndex === totalPages - 1}
          className={classes.pageButton}
        >
          Next
        </button>
      </div>

      {currentHotel ? (
        <div key={currentHotel.id} className={classes.hotel_card}>
          <div className={classes.hotelInfo}>
            <h3 className={classes.hotelName}>{currentHotel.name}</h3>
            <p className={classes.hotelLocation}>
              <i className="fas fa-map-marker-alt"></i> {currentHotel.location}
            </p>
          </div>

          <div className={classes.room_section}>
            <h4 className={classes.roomSectionTitle}>Available Rooms</h4>
            <div className={classes.roomList}>
              {currentHotel.rooms.map((room) => (
                <div key={room.id} className={classes.room_card}>
                  <img
                    src={room.image_url}
                    alt={room.type}
                    className={classes.room_image}
                  />
                  <div className={classes.roomDetails}>
                    <p className={classes.roomType}>Type: {room.type}</p>
                    <p className={classes.roomPrice}>
                      Price: {room.price} ETB/night
                    </p>
                    <p className={classes.roomInfo}>
                      Room: {room.room_number || "N/A"}
                    </p>
                    <p className={classes.roomInfo}>
                      Floor: {room.floor_number || "N/A"}
                    </p>
                    <p className={classes.roomStatus}>
                      Status:{" "}
                      <span
                        className={
                          room.available
                            ? classes.statusAvailable
                            : classes.statusUnavailable
                        }
                      >
                        {room.available ? "Available" : "Booked"}
                      </span>
                    </p>
                  </div>
                  <Link
                    to={`/officer/rooms/${room.id}/details`}
                    className={classes.viewRoomDetailsButton}
                  >
                    View Room
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link
            className={classes.viewHotelDetailsBtn}
            to={`/hotels/${currentHotel.id}/manage`}
          >
            Manage Hotel →
          </Link>
        </div>
      ) : (
        <p>No hotel found at this index.</p>
      )}
    </div>
  );
}

export default HotelListOfficer;
// <div className={classes.hotel_list_container}>
//   <h2 className={classes.section_title}>Hotel List Tour officer</h2>
//   <p className={classes.section_subtitle}>let work</p>
//   <div className={classes.hotel_grid}>
//     {hotels.map((hotel) => (
//       <div key={hotel.id} className={classes.hotel_card}>
//         {/* its new  */}
//         {/* <div className="hotel-rating">
//           <span>⭐ {hotel.rating}</span>
//         </div> */}
//         <img
//           src={hotel.image}
//           alt={hotel.name}
//           className={classes.hotel_image}
//         />
//         <h3 className={classes.hotel_name}>{hotel.name}</h3>
//         <p className={classes.hotel_location}>📍 {hotel.location}</p>
//         <Link
//           className={classes.view_details_btn}
//           to={`/officer/hotels/${hotel.id}`}
//         >
//           View Details →
//         </Link>
//       </div>
//     ))}

//     {/* <BookingTracker hotelId={hotel.id} /> */}
//   </div>
//   <BookingTracker />
// </div>
