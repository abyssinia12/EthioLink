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
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={classes.carcard__input}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={classes.carcard__input}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.carcard__input}
      />
      <button onClick={handlePay} className={classes.carcard__button}>
        Pay
      </button>
    </div>
  );
};

export default BookingForm;
