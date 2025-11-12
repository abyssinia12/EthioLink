// import React from "react";
// import { Link } from "react-router-dom";
// import { FaCar, FaHotel, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
// import classes from "./sidbar.module.css";
// import HeaderTour from "../TourOfficer/TourHeader/HeaderTour";

  
// const Sidebar = () => (
//   <>
//   {/* <HeaderTour/> */}
//     <div className={classes.all_sidbar}>
//       <HeaderTour />
//       <div className={classes.sidebar}>
//         <button className="toggle-btn">{"<"}</button>

//         <ul className={classes.menu}>
//           <li>
//             <Link to="/ManageCarPage">
//               <FaCar /> Manage Car
//             </Link>
//           </li>
//           <li>
//             <Link to="/hotel-reservation">
//               <FaHotel /> Hotel Reservation
//             </Link>
//           </li>
//           <li>
//             <Link to="/tour-package">
//               <FaMapMarkedAlt /> Tour Package
//             </Link>
//           </li>
//           <li className={classes.logout}>
//             <FaSignOutAlt /> Logout
//           </li>
//         </ul>
//       </div>

//       <div className={classes.main}>
//         {/* <p>say somthing about tour officer page</p> */}
//         {/* <TourOfficerDashboard/> */}
//       </div>
//     </div>
//   </>
// );

// export default Sidebar;


import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaHotel, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import HeaderTour from "../TourOfficer/TourHeader/HeaderTour";

const Sidebar = ({ sidebarOpen, isMobile, toggleSidebar }) => {
  const { pathname } = useLocation();

  const tourOfficerLinks = [
    {
      to: "/ManageCarPage",
      label: "Manage Car",
      icon: <FaCar size={18} />,
    },
    {
      to: "/hotel-reservation",
      label: "Hotel Reservation",
      icon: <FaHotel size={18} />,
    },
    {
      to: "/tour-package",
      label: "Tour Package",
      icon: <FaMapMarkedAlt size={18} />,
    },
    {
      to: "/logout",
      label: "Logout",
      icon: <FaSignOutAlt size={18} />,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:relative z-50 transition-all duration-300 ${
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0 md:w-20"
        } h-full text-white flex flex-col p-4`}
        style={{ backgroundColor: "rgb(22, 53, 80)" }}
      >
        {/* Optional Header */}
        <div className="mb-4">
          <HeaderTour />
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-4" />

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav>
            {tourOfficerLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-all duration-300 ${
                  pathname === to ? "bg-blue-800" : ""
                }`}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <span className="flex-shrink-0">{icon}</span>
                {sidebarOpen && (
                  <span className="text-sm truncate">{label}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
