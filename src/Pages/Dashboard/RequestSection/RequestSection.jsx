import React, { useEffect, useState } from "react";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient"; // Adjust path if needed

const RequestSection = () => {
  const [tourBookings, setTourBookings] = useState([]);
  const [carRentalRequests, setCarRentalRequests] = useState([]);
  const [hotelRoomRequests, setHotelRoomRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [tourRes, carRes, hotelRes] = await Promise.all([
      supabase.from("tour_bookings").select("*"),
      supabase.from("car_rental_requests").select("*"),
      supabase.from("hotel_room_requests").select("*"),
    ]);

    if (!tourRes.error) setTourBookings(tourRes.data);
    if (!carRes.error) setCarRentalRequests(carRes.data);
    if (!hotelRes.error) setHotelRoomRequests(hotelRes.data);
  };

  const handleStatusUpdate = async (table, id, newStatus) => {
    const { error } = await supabase
      .from(table)
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) fetchData();
    else console.error(error.message);
  };

  const renderRequestTable = (title, data, tableName) => (
    <div style={{ marginBottom: "2rem" }}>
      <h3>{title}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Customer Name</th>
            <th>Details</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_name}</td>
                <td>{item.details}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleStatusUpdate(tableName, item.id, "Approved")
                    }
                    style={{
                      marginRight: "0.5rem",
                      backgroundColor: "#28a745",
                      color: "#fff",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusUpdate(tableName, item.id, "Denied")
                    }
                    style={{ backgroundColor: "#dc3545", color: "#fff" }}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No pending requests
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {renderRequestTable("Tour Bookings", tourBookings, "tour_bookings")}
      {renderRequestTable(
        "Car Rental Requests",
        carRentalRequests,
        "car_rental_requests"
      )}
      {renderRequestTable(
        "Hotel Room Requests",
        hotelRoomRequests,
        "hotel_room_requests"
      )}
    </div>
  );
};

export default RequestSection;
