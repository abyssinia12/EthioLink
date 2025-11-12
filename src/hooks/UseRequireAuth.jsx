
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { supabase } from "../Pages/CarRental/CustomerSide/supabaseClient"; 

export function useRequireAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/auth/check-session", {
          withCredentials: true,
        });
        console.log("Auth check response:", res.data); // 👈 See result in browser console
        if (!res.data?.authenticated) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     if (!session) {
  //       navigate("/login"); // redirect to login if not authenticated
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);
}
