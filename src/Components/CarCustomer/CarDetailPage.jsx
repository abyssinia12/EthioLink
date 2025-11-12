// pages/CarDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";
import classes from "./Car.module.css";
import axios from "axios";
import LayOut from "../LayOut/LayOut";
import { ChevronLeft } from "lucide-react";

const CarDetailPage = ({ filters }) => {
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const [fuelOption, setFuelOption] = useState("without"); // default is without fuel

  const handleBookNow = () => {
    setShowForm(true);
  };

  const handlePay = async () => {
    if (!firstName || !lastName || !email || !pickupDate || !dropoffDate) {
      alert(
        "Please fill in all customer details including pickup and dropoff dates."
      );
      return;
    }
    // Add 500 ETB if fuel is included
    const fuelExtra = fuelOption === "with" ? 500 : 0;
    const totalAmount = car.price + fuelExtra;

    const requestData = {
      amount: totalAmount,
      pickupDate: pickupDate,
      dropoffDate: dropoffDate,
      email,
      first_name: firstName,
      last_name: lastName,
    };

    console.log("🚗 Sending car booking request:", requestData);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/cars/${car.id}/book`,
        requestData,
        { withCredentials: true }
      );

      const { checkout_url } = res.data;
      checkout_url
      ?( window.location.href = response.data.checkout_url)
        // ? (window.location.href = checkout_url)
        : alert("Booking created, but payment URL not found.");
    } catch (err) {
      console.error("❌ Payment error:", err.response?.data || err.message);
      alert("Payment failed. See console for details.");
    }
  };
  const back = () => {
    navigate("/carRental");
  };

  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase
        .from("car_rentals_officer")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching car:", error);
      } else {
        setCar(data);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <p>Loading car details...</p>;

  return (
    <LayOut>
      <div className={classes.allCon}>
        <button onClick={back}>
          <ChevronLeft color="gray" />
        </button>
        <div className={classes.detail_container}>
          <img src={car.image_url} alt={car.car_model} />
          <h2>{car.car_model}</h2>
          <p>
            <strong>Size:</strong> {car.car_size}
          </p>
          <p>
            <strong>Seats:</strong> {car.seats}
          </p>
          <p>
            <strong>Price:</strong> {car.price} ETB/day
          </p>
          <p>
            <strong>Location:</strong> {car.location}
          </p>
          <p>
            <strong>Available From:</strong> {car.start_date}
          </p>
          <p>
            <strong>Available Until:</strong> {car.end_date}
          </p>
          <div>
            <label> Vehicle Overview</label>
            <p>
              The Toyota Vitz is the perfect choice for budget-conscious
              travelers who don't want to compromise on reliability and comfort.
              This compact economy car excels in city driving with its nimble
              handling and excellent fuel efficiency, making it ideal for
              exploring Addis Ababa's bustling streets or taking short trips to
              nearby attractions. Despite its compact size, the Vitz offers
              surprising interior space and modern amenities, ensuring a
              comfortable journey for up to four passengers. Its proven
              reliability and low maintenance costs make it a smart choice for
              both short-term rentals and extended stays in Ethiopia.
            </p>
            <label> Vehicle Features</label>
            <p>
              Engine & Performance 1.3L Petrol Engine Manual Transmission
              (5-speed) Front-Wheel Drive Excellent Fuel Economy (18-20 km/L)
              Power Steering Comfort & Interior Air Conditioning 4 Comfortable
              Seats Fabric Upholstery AM/FM Radio with CD Player Power Windows
              (Front) Safety & Security Dual Front Airbags Anti-lock Braking
              System (ABS) Central Locking Immobilizer Seat Belts for All
              Passengers Storage & Capacity 2 Large Suitcases Multiple Storage
              Compartments Cup Holders Glove Compartment Door Pockets
            </p>
          </div>
        </div>
        {/* the second part  */}
        <div className={classes.formMain}>
          <form className={classes.car_card__form} onSubmit={handlePay}>
            <h2>Book Now</h2>
            <div className={classes.form_group_required}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={classes.carcard__input}
                required
              />
            </div>

            <div className={classes.form_group_required}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={classes.carcard__input}
                required
              />
            </div>

            <div className={classes.form_group_required}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.carcard__input}
                required
              />
            </div>
            <div className={classes.form_group_required}>
              <label>Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className={classes.carcard__input}
                required
              />
            </div>
            <div className={classes.form_group_required}>
              <label>Dropoff Date</label>
              <input
                type="date"
                name="dropoffDate"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className={classes.carcard__input}
                required
              />
            </div>
            <div className={classes.form_group_required}>
              <label>Fuel Option</label>
              <div className={classes.radio_group}>
                <label>
                  <input
                    type="radio"
                    name="fuel"
                    value="with"
                    checked={fuelOption === "with"}
                    onChange={() => setFuelOption("with")}
                  />
                  With Fuel (+500 ETB)
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuel"
                    value="without"
                    checked={fuelOption === "without"}
                    onChange={() => setFuelOption("without")}
                  />
                  Without Fuel
                </label>
              </div>
            </div>

            <button type="submit" className={classes.carcard__button}>
              Proced to payment
            </button>
          </form>
        </div>
      </div>
    </LayOut>
  );
};

export default CarDetailPage;
