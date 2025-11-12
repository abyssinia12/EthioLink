import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);


    const [authStatus, setAuthStatus] = useState("loading"); // 'loading' | 'allowed' | 'denied'
  
    useEffect(() => {
      const checkSession = async () => {
        try {
          const res = await axios.get("/auth/check-session", { withCredentials: true });
          const { authenticated, role } = res.data;
  
          if (authenticated && allowedRoles.includes(role)) {
            setAuthStatus("allowed");
          } else {
            setAuthStatus("denied");
          }
        } catch (err) {
          setAuthStatus("denied");
        }
      };
  
      checkSession();
    }, [allowedRoles]);
  
    if (authStatus === "loading") return <p>Loading...</p>;
    if (authStatus === "denied") return <Navigate to="/login" />;
    return children;
  }

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/auth/protected", {
//           withCredentials: true,
//         });
//         setUserRole(res.data.message.split(" ")[1]); // "Welcome admin" -> "admin"
//       } catch (err) {
//         setUserRole(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRole();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   if (!userRole || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

export default ProtectedRoute;
