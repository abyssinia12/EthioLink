import React, { useEffect, useState } from "react";
import { supabase } from "../../../CarRental/CustomerSide/supabaseClient";
import classes from "./TourCar.module.css";
// import { supabase } from "@/supabaseClient";
// import TourBookings from "../../../AllBookings/TourBookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("car_bookings")
      .select("*, car_rentals_officer(car_model)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    const { error } = await supabase
      .from("car_bookings")
      .update({ booking_status: newStatus })
      .eq("id", bookingId);

    if (!error) {
      fetchBookings(); // Refresh after update
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div className={classes.bookings_container}>
        <h2>Recent Car Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className={classes.booking_table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Dropoff</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.first_name} {b.last_name}
                  </td>
                  <td>{b.user_email}</td>
                  <td>{b.car_rentals_officer?.car_model || "N/A"}</td>
                  <td>{b.pickup_date}</td>
                  <td>{b.dropoff_date}</td>
                  <td>{b.amount} ETB</td>
                  <td>{b.booking_status}</td>
                  <td>
                    <select
                      value={b.booking_status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                    >
                      
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* <TourBookings/> */}
    </div>
  );
  
};

export default Bookings;
