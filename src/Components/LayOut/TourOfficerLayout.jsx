import PropTypes from "prop-types";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BiSolidCar } from "react-icons/bi";
import { FaHotel } from "react-icons/fa6";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { FaArrowCircleLeft } from "react-icons/fa";
// import logo from "../../assets/Logo1.ico";
import classes from "./Officer.module.css"
import { useState } from "react";
// import OfficerLinks from '../../Data/navData'


const TourOfficerLayout =()=>{

  const [isOpen, setisOpen] =useState(false)

  const OfficerLinks = [
    {
      to: "/tourOfficer/manage-car",
      label: "Manage Car",
      icon: <BiSolidCar size={18} />,
    },
    {
      to: "/tourOfficer/hotel-reservation",
      label: "Hotel Reservation",
      icon: <FaHotel size={18} />,
    },
    {
      to: "/tourOfficer/tour-package",
      label: "Tour Package",
      icon: <LiaMapMarkedAltSolid size={18}/>,
    },
  ];

  return (
    <div className="container">
      <div className="sidbar">
        <div className="top section">
          <h1 className="logo">Ethi-link</h1>
          <div className="arrow">
            <FaArrowCircleLeft onClick={() => setisOpen(!isOpen)} />
          </div>
        </div>
        {OfficerLinks.map((item, index) => {
          <NavLink
            to={item.path}
            key={index}
            className={link}
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className={classes.item_text}>{item.label}</div>
          </NavLink>;
        })}
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
export default TourOfficerLayout;








// Layout component for the Tour Officer pages
// const TourOfficerLayout = ({ sidebarOpen, isMobile, toggleSidebar }) => {
//   const { pathname } = useLocation();

//   // Sidebar links specifically for the Tour Officer
//   const tourOfficerLinks = [
//     {
//       to: "/tour-officer/manage-car",
//       label: "Manage Car",
//       icon: <FaCar size={18} />,
//     },
//     {
//       to: "/tour-officer/hotel-reservation",
//       label: "Hotel Reservation",
//       icon: <FaHotel size={18} />,
//     },
//     {
//       to: "/tour-officer/tour-package",
//       label: "Tour Package",
//       icon: <FaMapMarkedAlt size={18} />,
//     },
//   ];

//   return (
//     <>
//       {/* Overlay for mobile screen (click to close sidebar) */}
//       {isMobile && sidebarOpen && (
//         <div className={classes.sidebar_overlay} onClick={toggleSidebar} />
//       )}

//       {/* Sidebar starts here */}
//       <aside
//         className={`classes.tour_officer_sidebar ${
//           sidebarOpen ? classes.sidebar_open : classes.sidebar_closed
//         } `}
//       >
//         {/* Logo Section */}
//         <div className={classes.sidebar_logo}>
//           <div className={classes.logo_container}>
//             <img
//               src={logo}
//               alt="Logo"
//               className={`classes.logo_image ${
//                 sidebarOpen ? classes.logo_expanded : classes.logo_collapsed
//               }`}
//             />
//           </div>
//           <hr className={classes.logo_divider} />
//           {/* <div className="w-full mt-4">
//             <hr className="border-gray-600" />
//           </div> */}
//         </div>

//         {/* Navigation Links */}
//         <div className={classes.sidebar_nav}>
//           <nav>
//             {tourOfficerLinks.map(({ to, label, icon }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className={`classes.nav_link ${
//                   pathname === to ? classes.active : ""
//                 }`}
//                 onClick={isMobile ? toggleSidebar : undefined}
//               >
//                 <span className={classes.nav_icon}>{icon}</span>
//                 {sidebarOpen && (
//                   <span className={classes.nav_label}>{label}</span>
//                 )}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         {/* Logout Button */}
//         <div className={classes.logout_section}>
//           <button className={classes.logout_button}>
//             <FaSignOutAlt size={18} />
//             {sidebarOpen && (
//               <span className={classes.logout_label}>Logout</span>
//             )}
//           </button>
//         </div>
//       </aside>

//       {/* Main content section */}
//       <main
//         className={`classes.main_content${
//           sidebarOpen ? classes.sidebar_open : classes.sidebar_closed
//         } `}
//       >
//         <Outlet /> {/* This renders the child route page */}
//       </main>
//     </>
//   );
// };

// // Prop types check for clarity and safety
// TourOfficerLayout.propTypes = {
//   sidebarOpen: PropTypes.bool.isRequired,
//   isMobile: PropTypes.bool.isRequired,
//   toggleSidebar: PropTypes.func.isRequired,
// };

// export default TourOfficerLayout;
