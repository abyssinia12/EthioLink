import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { MdHotel } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient"; //add the correcr path
import classes from "./OfficerT.module.css";
import { Bell, UserCircle, MessageSquareMore } from "lucide-react";
import ReceptionRequests from "./ReceptionRequests";
// import { useEffect, useState } from "react";

const StatCard = ({ label, value, icon }) => (
  <div className={classes.stat_card}>
    <div className={classes.stat_header}>
      <span className={classes.stat_label}>{label}</span>
      {icon}
    </div>
    <div className={classes.stat_value}>{value}</div>
  </div>
);

export default function TourOfficerDashboard() {
  const [stats, setStats] = useState([
    {
      label: "Hotel Bookings",
      value: 0,
      icon: <MdHotel className={classes.stat_icon_blue} />,
    },
    {
      label: "Car Rentals",
      value: 0,
      icon: <FaCar className={classes.stat_icon_green} />,
    },
    {
      label: "Pending Bookings",
      value: 0,
      icon: <FaCalendar className={classes.stat_icon_yellow} />,
    },
    // {
    //   label: "Total Revenue",
    //   value: "$0",
    //   icon: <FaDollarSign className={classes.stat_icon_dollar} />,
    // },
  ]);
  const [recentRequests, setRecentRequests] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/special-interest")
      .then((res) => res.json())
      .then((data) => {
        // If there's a `created_at` or timestamp, you can sort. Otherwise, assume already sorted.
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRecentRequests(sorted.slice(0, 5)); // Keep only the 5 most recent
      })
      .catch((err) => {
        console.error("Failed to fetch special interest requests:", err);
      });
  }, []);

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
          {
            label: "Hotel Bookings",
            value: hotelCount,
            icon: <MdHotel className={classes.stat_icon_blue} />,
          },
          {
            label: "Car Rentals",
            value: carCount,
            icon: <FaCar className={classes.stat_icon_green} />,
          },
          {
            label: "Pending Bookings",
            value: pendingCount,
            icon: <FaCalendar className={classes.stat_icon_yellow} />,
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <header className={classes.dashboard_header}>
        <h1 className={classes.dashboard_title}>Tour Officer Dashboard</h1>
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
      </header>
      <div></div>
      <div className={classes.dashboard_wrapper}>
        <div className={classes.main_content}>
          <h1 className={classes.dashboard_title}>Dashboard overview</h1>
          <div className={classes.stats_container}>
            {/* its dashboard over view  */}
            {stats.map((item, index) => (
              <StatCard key={index} {...item} />
            ))}
          </div>
          {/* Reception requests block above recent special interest */}
          <ReceptionRequests />
          <div className={classes.special_interest_container}>
            <div className={classes.mid}>
              <MessageSquareMore
                color="orange"
                className={classes.ms}
                size={32}
              />
              <h2>Recent Special Interest Requests</h2>
            </div>

            {recentRequests.length === 0 ? (
              <p>No recent requests.</p>
            ) : (
              <table border="1" cellPadding="10">
                <thead>
                  <tr className={classes.header}>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Visit Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((req) => (
                    <tr key={req.id}>
                      <td className={classes.cell}>{req.full_name}</td>
                      <td className={classes.cell}>{req.email}</td>
                      <td className={classes.cell}>{req.phone_number}</td>
                      <td className={classes.cell}>{req.country}</td>
                      <td className={classes.cell}>
                        {req.start_date} to {req.end_date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
