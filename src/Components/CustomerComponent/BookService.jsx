import React from 'react'
import { useNavigate } from "react-router-dom";

export default function BookService() {
  const navigate = useNavigate();

  const tour = () => {
    navigate("/tours");
  };

  const room = () => {
    navigate("/HotelList");
  };

  const car = () => {
    navigate("/carRental");
  };
  return (
    <div>
      <button onClick={tour}>Tour Package</button>
      <button onClick={room}>Hotel Room rservation</button>
      <button onClick={car}>Car Rental</button>
    </div>
  )
}
