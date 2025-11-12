
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../CarRental/CustomerSide/supabaseClient";

function CarDetails() {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetail = async () => {
      const { data, error } = await supabase
        .from("car_rentals_officer")
        .select("*")
        .eq("id", id) // Get the car where id matches
        .single(); // Only fetch a single record

      if (error) {
        console.error("Error fetching car detail:", error.message);
      } else {
        setCar(data);
      }

      setLoading(false);
    };

    fetchCarDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!car) return <div>No car found.</div>;

  return (
    <div>
      <h1>{car.Model}</h1>
      <img src={car.imageUrl} alt={car.Model} width="300" />
      <p>Size: {car.carsize}</p>
      <p>Seats: {car.seats}</p>
      <p>Total Price: {car.totalPrice} ETB</p>
      <p>write rules</p>
      <button>Book Now</button>
    </div>
  );
}

export default CarDetails;

