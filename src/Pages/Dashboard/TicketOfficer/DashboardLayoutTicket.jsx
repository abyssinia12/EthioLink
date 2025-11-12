import { Outlet, NavLink } from "react-router-dom";
// import classes from "./OfficerT.module.css";
import classes from "../TourOfficer/OfficerT.module.css";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";


 
  
const DashboardLayoutTicket = () => {
 const navigate = useNavigate();

   const handleLogout = async () => {
      await supabase.auth.signOut();
      navigate("/login"); 
    };

  return (
    <div className={classes.dashboard_wrapper}>
      <div className={classes.sidebar}>
        <h1 className={classes.sidebar_title}>Ticket Officer Dashboard</h1>
        <nav>
          <NavLink className={classes.sidebar_link} to="/ticket" end>
            Dashboard Overview
          </NavLink> <br />
          <NavLink className={classes.sidebar_link} to="/ticket/FlightBooking">Book Customer Request</NavLink> <br />
           <button className={classes.sidebar_link} onClick={handleLogout}>
                        Log out
                      </button>
        </nav>
      </div>

      <div className={classes.main_content}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayoutTicket;
