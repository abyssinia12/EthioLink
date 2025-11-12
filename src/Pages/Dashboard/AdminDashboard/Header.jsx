// import React,{useContext} from 'react'
// import {Link} from 'react-router-dom'
// import {DataContext} from '../DataProvider/DataProvider'
// import classes from '../Header/Header.module.css'
// import { auth } from '../../Utility/Firebase' 

// export default function Header() {
//   const [{user}, dispatch]=useContext(DataContext)
//   return (
//     <>
//       <div className={classes.head_container}>
//         <div>
//           <h1>Ethio-Link tour and Travel</h1>
//         </div>

//         <div className={classes.nav_item}>
//           <Link>Home</Link>
//           <Link to="/tourdetails">
//           Destination
//           </Link>
//           <Link to="/car">
//           Car
//           </Link>
//           <Link>Travel Package</Link>
//         </div>
//         <div className={classes.account}>
//           <Link to={!user && "/Auth"}>
//             <></>
//             <div>
//               {user ? (
//                 <>
//                   <p>
//                     hello {user?.email ? user.email.split("@")[0] : "Guest"}
//                   </p>

//                   <span onClick={() => auth.signOut()}>Sign out</span>
//                 </>
//               ) : (
//                 <p>hello, Sign in</p>
//               )}
//             </div>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import classes from "../Header/Header.module.css";
// import { auth } from "../../Utility/Firebase";
import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";


export default function Header() {
  const [{ user }, dispatch] = useContext(DataContext);
<sampleHeader />
  return (
    <>
      <div className={classes.head_container}>
        <div>
          <h1>Admin Dashboard</h1>
        </div>

        <div className={classes.nav_item}>
          <Link to="/">Home</Link>
          <Link to="/CustomerCarList">CustomerCarList</Link>
          <Link to="/admin">admin</Link>
          <Link to="/carList">CarList</Link>
          <Link to="/CarBookingForm">CarBookingForm</Link>
          <Link to="/FlightBooking">FligtBooking</Link>
          <Link to="/TourOfficer">Tour Officer</Link>
          <Link to="/carRentalList">Car rental List</Link>
        </div>

        <div className={classes.account}>
          <Link to={!user && "/Auth"}>
            <div>
              {user ? (
                <>
                  <p>
                    Hello {user?.email ? user.email.split("@")[0] : "Guest"}
                  </p>
                  <span
                    onClick={async () => {
                      await supabase.auth.signOut();
                      dispatch({ type: "LOGOUT" }); // Optional: update your context if needed
                    }}
                  >
                    Sign out
                  </span>
                </>
              ) : (
                <p>Hello, Sign in</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}


