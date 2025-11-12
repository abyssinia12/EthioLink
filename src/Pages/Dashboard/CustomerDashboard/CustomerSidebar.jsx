// import classes from "./OfficerT.module.css";
import classes from "./Customer.module.css";
import { IoHome } from "react-icons/io5";

const CustomerSidebar = ({ onSelect }) => {
  return (
    <div className={classes.sidebar}>
      <nav className={classes.nav}>
        <button         
          onClick={() => onSelect("dashboard")}
        >
          <IoHome  /> Dashboard Overview
        </button>
        <button         
          onClick={() => onSelect("my-Booking")}
        >
          My Booking
        </button>
        <button         
          onClick={() => onSelect("book-Service")}
        >
          Book Service
        </button>
        <button
          onClick={() => onSelect("payment-History")}
        >
          Payment History
        </button>
      </nav>
    </div>
    
  );
};

export default CustomerSidebar;
