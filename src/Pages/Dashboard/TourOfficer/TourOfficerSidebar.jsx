import classes from "./OfficerT.module.css";

const TourOfficerSidebar = ({ onSelect }) => {
  return (
    <div className={classes.sidebar}>
      <nav>
        <button onClick={() => onSelect("dashboard")}>
          Dashboard Overview
        </button>
        <button onClick={() => onSelect("manage-car")}>
          Manage Car Rental
        </button>
        <button onClick={() => onSelect("manage-hotel")}>
          Room Management
        </button>
        <button onClick={() => onSelect("manage-tourPackage")}>
          Manage tour Package
        </button>
        <button onClick={() => onSelect("booking-tourpackage")}>
          All Booking
        </button>
        <button onClick={() => onSelect("specialInterst-list")}>
          Special Interst List
        </button>
        
      
      </nav>
    </div>
  );
};

export default TourOfficerSidebar;
