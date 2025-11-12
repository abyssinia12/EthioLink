// import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import classes from "../TourOfficer/OfficerT.module.css";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";
// import { useRequireAuth } from "../../../hooks/UseRequireAuth";

const AdminLayout = () => {
  // useRequireAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.sidebar}>
          <h1 className={classes.sidebar_title}>Admin Dashboard</h1>
          <nav className={classes.sideContainer}>
            <NavLink className={classes.sidebar_link} to="/admin" end>
              Dashboard Overview
            </NavLink>{" "}
            <NavLink className={classes.sidebar_link} to="/admin/all-user">
              All User
            </NavLink>
            <NavLink className={classes.sidebar_link} to="/admin/add-NewUsers">
              Add New User
            </NavLink>{" "}
            <NavLink className={classes.sidebar_link} to="/admin/system-logs">
              System Logs
            </NavLink>
            {/* <NavLink
              className={classes.sidebar_link}
              to="/admin/backUp-management"
            >
              BackUp Management
            </NavLink> */}
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
export default AdminLayout;
