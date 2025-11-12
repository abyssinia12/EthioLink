// import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
// import TourOfficerDashboard from "./TourOfficerDashboard";
// import TourOfficerSidebar from "./TourOfficerSidebar";
// import ManageCarPage from "./Car/ManageCarPage";
// import HotelListOfficer from "../../../Components/Hotel/HotelListOfficer";
// import Bookings from "./Car/Bookings";
import classes from "../TourOfficer/OfficerT.module.css";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";

const DashboardLayoutGmanager = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.sidebar}>
          <h1 className={classes.sidebar_title}>Gmanger  Dashboard</h1>
          <nav className={classes.sideContainer}>
            {/* <NavLink className={classes.sidebar_link} to="/gm" end>
              Dashboard Overview
            </NavLink>{" "} */}
            <br />
            <NavLink className={classes.sidebar_link} to="/gm/Report">
              Report
            </NavLink>
            <br />
            <button className={classes.sidebar_link} onClick={handleLogout}>
              Log out
            </button>
          </nav>
        </div>

        <div className={classes.main_content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayoutGmanager;
