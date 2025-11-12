import React from "react";
// import "./Sidebar.css";
import { Link } from "react-router-dom";
// import { FaCar, FaHotel, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import classes from "../SideNav/sidbar.module.css";


const Sidebar = () => (
  <div className={classes.all_sidbar}>
    <div className={classes.sidebar}>
      <button className="toggle-btn">{"<"}</button>
      <ul className={classes.menu}>
        <li>
          <Link to="/CreateOfficer">Creat User</Link>
        </li>
        <li>
          <Link to="/DeactivateUser">Deactivate user</Link>
        </li>
        {/* <li>
          <Link to="/tour-package">
            <FaMapMarkedAlt /> Tour Package
          </Link>
        </li>
        <li className={classes.logout}>
          <FaSignOutAlt /> Logout
        </li> */}
      </ul>
    </div>

    <div className={classes.main}>
      <p>say somthing about...</p>
    </div>
  </div>
);

export default Sidebar;
