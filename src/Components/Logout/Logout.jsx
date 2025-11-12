import React from "react";
import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); 
  };

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
