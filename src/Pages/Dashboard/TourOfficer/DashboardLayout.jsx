
// import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import classes from './OfficerT.module.css'
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";


const DashboardLayout =()=>{
  const navigate = useNavigate();
 

   const handleLogout = async () => {
      await supabase.auth.signOut();
      navigate("/login"); 
    };
  
  return (
    <div>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.sidebar}>
          <h1 className={classes.sidebar_title}>Ethio-Link</h1>
          <nav className={classes.sideContainer}>
            <NavLink className={classes.sidebar_link} to="/tour" end>
              Dashboard Overview
            </NavLink>{" "}
            <NavLink className={classes.sidebar_link} to="/tour/manage-car">
              Manage Car Rental
            </NavLink>
            <NavLink className={classes.sidebar_link} to="/tour/manage-hotel">
              Room Management
            </NavLink>{" "}
            <NavLink
              className={classes.sidebar_link}
              to="/tour/manage-tourPackage"
            >
              Manage tour Package
            </NavLink>{" "}
            <NavLink
              className={classes.sidebar_link}
              to="/tour/booking-tourpackage"
            >
              All Booking
            </NavLink>{" "}
            <NavLink
              className={classes.sidebar_link}
              to="/tour/specialInterst-list"
            >
              Special Interest List
            </NavLink>{" "}
            
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
} 
export default DashboardLayout;