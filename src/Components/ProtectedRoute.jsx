import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./DataProvider/DataProvider";

export default function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useContext(DataContext);
  const Navigate = useNavigate()
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
   
    const checkRole = async () => {
      if (user) {
        try {
          const token = await user.getIdTokenResult(true);
          setRole(token.claims.role || "none");
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
      setChecking(false);
    };

    checkRole();
  }, [user]);

  if (checking) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user) return <Navigate to="/admin-dashboard" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;

  return children;
}
