import React, { useEffect, useState } from "react";
import CarBookingForm from './CarBookingForm'
import CarTable from './CarTable'
import axios from "axios";
import TourOfficerDashboard from "../TourOfficerDashboard";
import classes from './TourCar.module.css'
import { useNavigate } from "react-router-dom";

export default function ManageCarPage() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async () => {
   
    const response = await axios.get(" http://localhost:5000/api/cars");
    setCars(response.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEditSave = async (id, updatedCar) => {
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, updatedCar);
      setCars((prev) =>
        prev.map((car) => (car.id === id ? { ...car, ...updatedCar } : car))
      );
    } catch (err) {
      console.error("Error updating car", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setCars((prev) => prev.filter((car) => car.id !== id));
    } catch (err) {
      console.error("Error deleting car", err);
    }
  };
  const add = () => {
    navigate(`/CarBookingForm`);
  };
  

  return (
    <div >
      {/* <TourOfficerDashboard> */}
      <button className={classes.reg} onClick={add}>+ Register Car Detail</button>
        {/* <CarBookingForm /> */}
        <h2 className={classes.titel}>Manage Cars</h2>
        <CarTable
          cars={cars}
          onEditSave={handleEditSave}
          onDelete={handleDelete}
        />
              {/* </TourOfficerDashboard> */}
    </div>
  );

};
