// import classes from "./OfficerT.module.css";
import classes from "../TourOfficer/OfficerT.module.css";

const GmanagerSidebar = ({ onSelect }) => {
  return (
    <div className={classes.sidebar}>
      <nav>
        {/* <button onClick={() => onSelect("dashboard")}>
          Dashboard Overview
        </button> */}
        <button onClick={() => onSelect("Report")}>
          Report
        </button>
      </nav>
    </div>
  );
};

export default GmanagerSidebar;
