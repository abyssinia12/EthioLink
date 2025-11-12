// import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import classes from "./Customer.module.css";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";
// import { Bell, UserCircle } from "lucide-react";

const CustomerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <div>
        {/* <header className={classes.dashboard_header}>
          <h1 className={classes.dashboard_title}>Customer Dashboard</h1>
          <div className={classes.dashboard_actions}>
            <button className={classes.notification_button}>
              <Bell className={classes.icon} />
              <span className={classes.notification_badge}>3</span>
            </button>
            <div className={classes.user_info}>
              <UserCircle className={classes.user_icon} />
              <span className={classes.user_name}>Tour Officer</span>
            </div>
          </div>
        </header> */}
      </div>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.sidebar}>
          <h1 className={classes.sidebar_title}>Customer Dashboard</h1>
          <nav className={classes.sideContainer}>
            <NavLink className={classes.sidebar_link} to="/customer" end>
              Dashboard Overview
            </NavLink>{" "}
            <br />
            <NavLink className={classes.sidebar_link} to="/customer/my-Booking">
              My Booking
            </NavLink>
            <br />
            <NavLink
              className={classes.sidebar_link}
              to="/customer/book-Service"
            >
              Book Service
            </NavLink>{" "}
            <br />
            <NavLink
              className={classes.sidebar_link}
              to="/customer/payment-History"
            >
              Payment History
            </NavLink>{" "}
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
export default CustomerLayout;
