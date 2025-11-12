import React from "react";
import classes from "../TourOfficer/OfficerT.module.css";

const TicketOfficersidebar = ({ onSelect }) => {
  return (
    <>
      <div className={classes.sidebar}>
        <button onClick={() => onSelect("dashboard")}>
          Dashboard Overview
        </button>
        <button onClick={() => onSelect("FlightBooking")}>
          Book Customer Request
        </button>
      </div>
    </>
  );
};

export default TicketOfficersidebar;
