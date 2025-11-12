import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import API from "../../HotelApi/api";
import classes from "./Hotel.module.css";
import LayOut from "../../Components/LayOut/LayOut";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get("http://localhost:5000/api/customer/hotels")
    axios
      .get("http://localhost:5000/api/customer/hotels")
      // API.get("/customer/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("error fetching hotels:", err));
  }, []);
  return (
    <LayOut>
      <div className={classes.all_continer}>
        <h2 className={classes.heading}>Available Hotels</h2>
        <div className={classes.container}>
          {hotels.map((hotel) => (
            <div className={classes.card} key={hotel.id}>
              <h3 className={classes.cardTitle}>{hotel.name}</h3>
              <img
                className={classes.cardImage}
                src={hotel.image_url}
                alt={hotel.name}
              />
              <p className={classes.cardLocation}>Location: {hotel.location}</p>
              <button
                className={classes.btn}
                onClick={() => navigate(`/hotels/${hotel.id}`)}
              >
                View Rooms
              </button>
            </div>
          ))}
        </div>
        <div className={classes.policyBox}>
          <span className={classes.policyTitle}>Room Policies</span>
          <div className={classes.policyGrid}>
            <div className={classes.policyItemRow}>
              <span className={classes.policyIcon}>⏱️</span>
              <div>
                <div className={classes.policyHeading}>Check-in/Check-out</div>
                <div className={classes.policyDesc}>
                  Check-in: 2:00 PM · Check-out: 12:00 PM (extended on request)
                </div>
              </div>
            </div>
            <div className={classes.policyItemRow}>
              <span className={classes.policyIcon}>🚭</span>
              <div>
                <div className={classes.policyHeading}>Smoking Policy</div>
                <div className={classes.policyDesc}>
                  Non‑smoking rooms; terrace on request.
                </div>
              </div>
            </div>
            <div className={classes.policyItemRow}>
              <span className={classes.policyIcon}>🐾</span>
              <div>
                <div className={classes.policyHeading}>Pet Policy</div>
                <div className={classes.policyDesc}>
                  Small pets (≤15kg) with prior arrangement.
                </div>
              </div>
            </div>
            <div className={classes.policyItemRow}>
              <span className={classes.policyIcon}>👶</span>
              <div>
                <div className={classes.policyHeading}>Child Policy</div>
                <div className={classes.policyDesc}>
                  Rollaway beds or cribs available on request.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayOut>
  );
}
