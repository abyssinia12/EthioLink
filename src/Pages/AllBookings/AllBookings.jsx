// pages/AllBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./All.module.css";
import { Car, BedDouble, Map } from "lucide-react";

export default function AllBookings() {
  const [carBookings, setCarBookings] = useState([]);
  const [tourBookings, setTourBookings] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/all")
      .then((res) => {
        setCarBookings(res.data.carBookings);
        setTourBookings(res.data.tourBookings);
        setRoomBookings(res.data.roomBookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setLoading(false);
      });
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-pending";
      case "confirmed":
        return "badge-confirmed";
      case "cancelled":
        return "badge-cancelled";
      default:
        return "badge-default";
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={classes.all_bookings_container}>
      <div className={classes.booking_section}>
        <h2 className={classes.booking_section_title}>
          <Car color="orange" size={180} /> Bookings{" "}
          <span className={classes.section_count}>({carBookings.length})</span>
        </h2>

        <div className={classes.booking_cards_grid}>
          {carBookings.length > 0 ? (
            carBookings.map((b) => (
              <div key={b.id} className={classes.booking_card}>
                <div>
                  <div className={classes.booking_card_header}>
                    <h3 className={classes.booking_item_title}>
                      {b.car_model || "N/A"}
                    </h3>
                    <span
                      className={`${classes.status_badge} ${
                        classes[getStatusBadgeClass(b.status)]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className={classes.booking_detail}>
                    {b.first_name} {b.last_name}
                  </p>
                  <p className={classes.booking_detail}>{b.user_email}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No car bookings found.
            </p>
          )}
        </div>
      </div>

      <div className={classes.booking_section}>
        <h2 className={classes.booking_section_title}>
          <Map color="orange" size={180} /> Bookings{" "}
          <span className={classes.section_count}>({tourBookings.length})</span>
        </h2>
      </div>

      <div className={classes.booking_cards_grid}>
        {tourBookings.length > 0 ? (
          tourBookings.map((b) => (
            <div key={b.id} className={classes.booking_card}>
              <div>
                <div className={classes.booking_card_header}>
                  <h3 className={classes.booking_item_title}>
                    {b.tour_name || "N/A"}
                  </h3>
                  <span
                    className={`${classes.status_badge} ${
                      classes[getStatusBadgeClass(b.status)]
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <p className={classes.booking_detail}>
                  {b.first_name} {b.last_name}
                </p>
                <p className={classes.booking_detail}>{b.email}</p>
                <p className={classes.booking_detail}></p>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.no_bookings_message}>No tour bookings found.</p>
        )}
      </div>

      <div className={classes.booking_section}>
        <h2 className={classes.booking_section_title}>
          <BedDouble color="orange" size={180} /> Bookings{" "}
          <span className={classes.section_count}>({roomBookings.length})</span>
        </h2>

        <div className={classes.booking_cards_grid}>
          {roomBookings.length > 0 ? (
            roomBookings.map((b) => (
              <div key={b.id} className={classes.booking_card}>
                <div>
                  <div className={classes.booking_card_header}>
                    <h3 className={classes.booking_item_title}>
                      {b.room_type || "N/A"}
                    </h3>
                    <span
                      className={`${classes.status_badge} ${
                        classes[getStatusBadgeClass(b.status)]
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className={classes.booking_detail}>{b.full_name}</p>
                  <p className={classes.booking_detail}>{b.email}</p>
                  <p className={classes.booking_detail}>
                    {new Date(b.check_in_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}{" "}
                    to{" "}
                    {new Date(b.check_out_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={classes.no_bookings_message}>
              No room bookings found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
