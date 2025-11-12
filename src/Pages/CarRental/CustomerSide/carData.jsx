// src/components/CarData.js
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import classes from './carData.module.css'
import LayOut from "../../../Components/LayOut/LayOut";
import { useNavigate } from "react-router-dom";


// import imageUrl from "../../../../../Backend/index/imageUrl";



function CarData() {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const { data, error } = await supabase
          .from("car_rentals_officer")
          .select("*");

        if (error) {
          throw error;
        }

        setCarData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayOut>
      <div className={classes.car_container}>
        <h1>Car Rental Data</h1>
        <div className={classes.car_grid}>
          {carData.map((car) => (
            <div key={car.id} className={classes.car_card}>
              <img
                src={car.imageUrl}
                alt={car.Model}
                className={classes.car_img}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className={classes.car_details}>
                <h2>{car.Model}</h2>
                <p>Size: {car.carsize}</p>
                <p>Seats: {car.seats}</p>
                <p>Price: {car.totalPrice} ETB</p>
                <button
                  className={classes.detail_btn}
                  onClick={() => navigate(`/cardetail/${car.id}`)}
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayOut>

    //new

    // <div className="car-data-container">
    //   <h1 className="title">Car Rental Data</h1>
    //   <div className="card-grid">
    //     {carData.map((car) => (
    //       <div className="car-card" key={car.id}>
    //         <img
    //           src={car.imageUrl}
    //           alt={car.Model}
    //           className="car-image"
    //           onError={(e) => (e.target.src = "/placeholder.jpg")}
    //         />
    //         <div className="car-info">
    //           <h2>{car.Model}</h2>
    //           <p>Size: {car.carsize}</p>
    //           <p>Seats: {car.seats}</p>
    //           <p className="price">Price: {car.totalPrice} ETB</p>
    //           <button className="rent-button">Rent Now</button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default CarData;
