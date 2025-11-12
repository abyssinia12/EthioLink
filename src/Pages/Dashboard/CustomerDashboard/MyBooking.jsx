import React, { useEffect, useState } from "react";
import api from "./CustomerApi/api";
import { useUser } from "../../../context/UserContext";
import LayOut from "../../../Components/LayOut/LayOut";
import classes from "./Customer.module.css";

function MyBookings() {
  const [tourBookings, setTourBookings] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);
  const [carBookings, setCarBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { user } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my", {
          withCredentials: true,
        });
        setTourBookings(res.data.tourBookings);
        setRoomBookings(res.data.roomBookings);
        setCarBookings(res.data.carBookings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setErrorMsg("Failed to load your bookings. Please try again later.");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    console.log("Tour Bookings:", tourBookings);
    console.log("Car Bookings:", carBookings);
  }, [tourBookings, carBookings]);

  const cancelBooking = async (bookingId, type) => {
    try {
      await api.post(
        "/bookings/cancel",
        { bookingId, type },
        { withCredentials: true }
      );
      alert("Booking cancelled successfully!");
      // Refresh bookings
      const res = await api.get("/bookings/my", { withCredentials: true });
      setTourBookings(res.data.tourBookings);
      setRoomBookings(res.data.roomBookings);
      setCarBookings(res.data.carBookings);
    } catch (error) {
      alert("Cancel failed");
    }
  };

  if (loading) return <p>Loading your bookings...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>{errorMsg}</p>;

  return (
    <LayOut>
      <div className={classes.myBookingsContainer}>
        <h2 className={classes.welcomeHeader}>Welcome, {user?.username}</h2>

        <section className={classes.section}>
          <h3 className={classes.sectionHeader}>Tour Bookings</h3>
          {tourBookings.length === 0 ? (
            <p className={classes.noBookingsMessage}>No tour bookings yet.</p>
          ) : (
            tourBookings.map((booking) => (
              <div key={booking.id} className={classes.bookingCard}>
                {booking.tour_packages?.image_url && (
                  <img
                    src={booking.tour_packages.image_url}
                    alt={booking.tour_packages?.title}
                    className={classes.bookingImage}
                  />
                )}
                <div className={classes.bookingDetails}>
                  <p>
                    <strong>Tour:</strong>{" "}
                    {booking.tour_package?.title || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  {booking.status !== "cancelled" && (
                    <button
                      className={classes.cancelButton}
                      onClick={() => cancelBooking(booking.id, "tour")}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        <section className={classes.section}>
          <h3 className={classes.sectionHeader}>Room Bookings</h3>
          {roomBookings.length === 0 ? (
            <p className={classes.noBookingsMessage}>No hotel bookings yet.</p>
          ) : (
            roomBookings.map((booking) => (
              <div key={booking.id} className={classes.bookingCard}>
                <div>
                  <strong>Room Type:</strong> {booking.room?.type}
                </div>
                {booking.room?.image_url && (
                  <img
                    src={booking.room.image_url}
                    alt={booking.room?.type}
                    className={classes.bookingImage}
                  />
                )}
                <div className={classes.bookingDetails}>
                  <p>
                    <strong>Hotel:</strong> {booking.hotel?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  {booking.status !== "cancelled" && (
                    <button
                      className={classes.cancelButton}
                      onClick={() => cancelBooking(booking.id, "hotel")}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        <section className={classes.section}>
          <h3 className={classes.sectionHeader}>Car Rentals</h3>
          {carBookings.length === 0 ? (
            <p className={classes.noBookingsMessage}>No car bookings yet.</p>
          ) : (
            carBookings.map((booking) => (
              <div key={booking.id} className={classes.bookingCard}>
                {booking.car_rentals_officer?.image_url && (
                  <img
                    src={booking.car_rentals_officer.image_url}
                    alt={booking.car_rentals_officer?.model}
                    style={{
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  //   src={booking.car.image_url}
                  //   alt={booking.car?.model}
                  //   className={classes.bookingImage}
                  // />
                )}
                <div className={classes.bookingDetails}>
                  <div>
                    <strong>Car Type:</strong> {booking.car?.model || "N/A"}
                  </div>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  {booking.status !== "cancelled" && (
                    <button
                      className={classes.cancelButton}
                      onClick={() => cancelBooking(booking.id, "car")}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </LayOut>
  );
}

export default MyBookings;
