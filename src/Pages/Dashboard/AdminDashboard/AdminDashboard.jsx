import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import { MdHotel } from "react-icons/md";
// import { FaCar } from "react-icons/fa";
// import { FaCalendar } from "react-icons/fa";
// import { FaDollarSign } from "react-icons/fa";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient"; //add the correcr path
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

export default function AdminDashboard() {
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
        const car = bookingsResponse.data?.carBookings || [];
        const rooms = bookingsResponse.data?.roomBookings || [];
        const tours = bookingsResponse.data?.tourBookings || [];

        const hotelCount = rooms.length;
        const carCount = car.length;
        const pendingCount = [...car, ...rooms, ...tours].filter(
          (b) => (b.status || b.booking_status) === "pending"
        ).length;

        setStats([
          { label: "Hotel Bookings", value: hotelCount },
          { label: "Car Rentals", value: carCount },
          { label: "Pending Bookings", value: pendingCount },
        ]);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      }
    };

    fetchStats();
  }, []);
  //     const fetchStats = async () => {
  //       // Example Supabase table names
  //       // const { count: hotelCount } = await supabase
  //       //   .from("hotel_bookings")
  //       //   .select("*", { count: "exact", head: true });

  //       // const { count: carCount } = await supabase
  //       //   .from("car_rentals_officer")
  //       //   .select("*", { count: "exact", head: true });

  //       // const { count: pendingCount } = await supabase
  //       //   .from("car_bookings")
  //       //   .select("*", { count: "exact", head: true })
  //       //   .eq("booking_status", "pending");

  //       // const { data: revenueData } = await supabase
  //       //   .from("payments")
  //       //   .select("amount");

  //       // const totalRevenue =
  //       //   revenueData?.reduce((sum, r) => sum + r.amount, 0) || 0;

  //       setStats([
  //         {
  //           // label: "Hotel Bookings",
  //           // value: hotelCount ?? 0,
  //           // icon: <FaHotel className={classes.stat_icon_blue} />,
  //         },
  //         {
  //           // label: "Car Rentals",
  //           // value: carCount ?? 0,
  //           // icon: <FaCarAlt className={classes.stat_icon_green} />,
  //         },
  //         {
  //           // label: "Pending Bookings",
  //           // value: pendingCount ?? 0,
  //           // icon: <MdPending className={classes.stat_icon_yellow} />,
  //         },
  //         {
  //           // label: "Total Revenue",
  //           // value: `$${totalRevenue.toLocaleString()}`,
  //           // icon: <FaDollarSign className={classes.stat_icon_dollar} />,
  //         },
  //       ]);
  //     };

  //     fetchStats();
  //   }, []);

  // useRequireAuth();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("tour_officer");

  // const handleCreateUser = async () => {
  //   try {
  //     const res = await api.post("/auth/create-user", {
  //       username,
  //       password,
  //       role,
  //     });
  //     alert("User created successfully!");
  //     setUsername("");
  //     setPassword("");
  //     setRole("tour_officer");
  //   } catch (err) {
  //     alert("Error: " + err.response?.data?.error || "Something went wrong");
  //   }
  // };

  return (
    <div>
      <header className={classes.dashboard_header}>
        <h1 className={classes.dashboard_title}>Admin Dashboard</h1>
        <div className={classes.dashboard_actions}>
          <button className={classes.notification_button}>
            <Bell className={classes.icon} />
            <span className={classes.notification_badge}>3</span>
          </button>
          <div className={classes.user_info}>
            <UserCircle className={classes.user_icon} />
            <span className={classes.user_name}>Admin </span>
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
