import React, { useEffect, useState } from "react";
// import { MdHotel } from "react-icons/md";
// import { FaCar, FaCalendar, FaDollarSign } from "react-icons/fa";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
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

const TicketOfficerDashboard = () => {
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
    {
      label: "Total Revenue",
      value: "$0",
      // icon: <FaDollarSign className={classes.stat_icon_dollar} />,
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: hotelCount } = await supabase
        .from("hotel_bookings")
        .select("*", { count: "exact", head: true });

      const { count: carCount } = await supabase
        .from("car_rentals_officer")
        .select("*", { count: "exact", head: true });

      const { count: pendingCount } = await supabase
        .from("car_bookings")
        .select("*", { count: "exact", head: true })
        .eq("booking_status", "pending");

      const { data: revenueData } = await supabase
        .from("payments")
        .select("amount");

      const totalRevenue =
        revenueData?.reduce((sum, r) => sum + r.amount, 0) || 0;

      setStats([
        {
          label: "Hotel Bookings",
          value: hotelCount ?? 0,
          // icon: <MdHotel className={classes.stat_icon_blue} />,
        },
        {
          label: "Car Rentals",
          value: carCount ?? 0,
          // icon: <FaCar className={classes.stat_icon_green} />,
        },
        {
          label: "Pending Bookings",
          value: pendingCount ?? 0,
          // icon: <FaCalendar className={classes.stat_icon_yellow} />,
        },
        {
          label: "Total Revenue",
          value: `$${totalRevenue.toLocaleString()}`,
          // icon: <FaDollarSign className={classes.stat_icon_dollar} />,
        },
      ]);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <header className={classes.dashboard_header}>
              <h1 className={classes.dashboard_title}>Ticket Dashboard</h1>
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
      <div>
      
      <h1 className={classes.dashboard_title}>Dashboard overview</h1>
      <div className={classes.stats_container}>
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default TicketOfficerDashboard;
