import React from "react";
import Sidebar from "../../Pages/Dashboard/SideNav/sidebar";

function SideLayOut({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

export default SideLayOut;
