import classes from "../TourOfficer/OfficerT.module.css";

const Adminsidebar = ({ onSelect }) => {
  return (
    <div className={classes.sidebar}>
      <nav>
        <button onClick={() => onSelect("dashboard")}>
          Dashboard Overview
        </button>
        <button onClick={() => onSelect("all-user")}>All User</button>
        <button onClick={() => onSelect("add-NewUsers")}>Add New User</button>
        <button onClick={() => onSelect("system-logs")}>System Logs</button>
        {/* <button onClick={() => onSelect("backUp-management")}>
          BackUp Management
        </button> */}
      </nav>
    </div>
  );
};

export default Adminsidebar;
