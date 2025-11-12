
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Pages/CarRental/CustomerSide/supabaseClient";

function useRoleRedirect(userId) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role, officer_type")
        .eq("id", userId)
        .single();

      if (error || !data) {
        console.error("Error fetching role", error);
        return;
      }

      // Now redirect based on role and officer_type
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (data.role === "officer") {
        if (data.officer_type === "tour") {
          navigate("/tour-officer-dashboard");
        } else if (data.officer_type === "ticket") {
          navigate("/ticket-officer-dashboard");
        }
      }
    };

    if (userId) fetchUserRole();
  }, [userId, navigate]);
}

export default useRoleRedirect;
