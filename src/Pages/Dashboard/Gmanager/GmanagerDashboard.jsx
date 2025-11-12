import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { MdHotel } from "react-icons/md";
// import { FaCar } from "react-icons/fa";
// import { FaCalendar } from "react-icons/fa";
// import { FaDollarSign } from "react-icons/fa";
import axios from "axios";
// import classes from "./OfficerT.module.css";
import classes from "../TourOfficer/OfficerT.module.css";
import { Bell, UserCircle } from "lucide-react";

const StatCard = ({ label, value, icon }) => (
  <div className={classes.stat_card}>
    <div className={classes.stat_header}>
      <span className={classes.stat_label}>{label}</span>
      {icon}
    </div>
    <div className={classes.stat_value}>{value}</div>
  </div>
);

export default function GmanagerDashboard() {
  const [stats, setStats] = useState([
    {
      label: "Hotel Bookings",
      value: 0,
      // icon: <MdHotel className={classes.stat_icon_blue} />,
    },
    {
      label: "Car Rentals",
      value: 0,
      // icon: <FaCar className={classes.stat_icon_green} />,
    },
    {
      label: "Pending Bookings",
      value: 0,
      // icon: <FaCalendar className={classes.stat_icon_yellow} />,
    },
    // {
    //   label: "Total Revenue",
    //   value: "$0",
    //   icon: <FaDollarSign className={classes.stat_icon_dollar} />,
    // },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bookingsResponse = await axios.get(
          "http://localhost:5000/api/bookings/all"
        );
        const allCar = bookingsResponse.data?.carBookings || [];
        const allRooms = bookingsResponse.data?.roomBookings || [];
        const allTours = bookingsResponse.data?.tourBookings || [];

        const hotelCount = allRooms.length;
        const carCount = allCar.length;
        const pendingCount = [...allCar, ...allRooms, ...allTours].filter(
          (b) => (b.status || b.booking_status) === "pending"
        ).length;

        setStats([
          { label: "Hotel Bookings", value: hotelCount },
          { label: "Car Rentals", value: carCount },
          { label: "Pending Bookings", value: pendingCount },
        ]);
      } catch (err) {
        console.error("Failed to fetch GM dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <header className={classes.dashboard_header}>
        <h1 className={classes.dashboard_title}>GManager Dashboard</h1>
        <div className={classes.dashboard_actions}>
          <button className={classes.notification_button}>
            <Bell className={classes.icon} />
            <span className={classes.notification_badge}>3</span>
          </button>
          <div className={classes.user_info}>
            <UserCircle className={classes.user_icon} />
            <span className={classes.user_name}>General Manager</span>
          </div>
        </div>
      </header>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.main_content}>
          <h1 className={classes.dashboard_title}>Dashboard overview</h1>
          <div className={classes.stats_container}>
            {/* its dashboard over view  */}
            {stats.map((item, index) => (
              <StatCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
