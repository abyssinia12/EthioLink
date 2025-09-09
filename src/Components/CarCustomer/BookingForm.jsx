// BookingForm.jsx
import React from "react";
import classes from "./Car.module.css";
import LayOut from "../LayOut/LayOut";

const BookingForm = ({
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
  handlePay,
}) => {
  return (
    
    <div className={classes.car_card__form}>
      
     
      
      <button onClick={handlePay} className={classes.carcard__button}>
        Pay
      </button>
    </div>
  );
};

export default BookingForm;
