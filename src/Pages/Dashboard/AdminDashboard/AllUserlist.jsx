import React from 'react'
import { useEffect, useState } from "react";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import classes from "./Admin.module.css";

export default function AllUserlist() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username, role, is_active")
        .order("username", { ascending: true });

      if (error) throw error;
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (username, currentStatus) => {
    const { error } = await supabase
      .from("users")
      .update({ is_active: !currentStatus })
      .eq("username", username);

    if (error) {
      console.error("Failed to update user status:", error);
      alert("Error updating user status.");
    } else {
      fetchUsers(); // Refresh the list
    }
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("users")
  //         .select("username, role, is_active")
  //         // .select("username, role") // Exclude password for security
  //         .order("username", { ascending: true });

  //       if (error) throw error;
  //       setUsers(data);
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Error fetching users:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  if (loading) {
    return <div className="loading-container">Loading users...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    // <div className={classes.user_list_container}>
    //   <h2 className={classes.table_title}>User Management</h2>
    //   <table className={classes.user_table}>
    //     <thead>
    //       <tr className={classes.table_header_row}>
    //         <th className={classes.username_header}>Username</th>
    //         <th className={classes.role_header}>Role</th>
    //         <th className={classes.role_header}>Status</th>
    //         <th className={classes.role_header}>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user) => (
    //         <tr key={user.username} className={classes.table_row}>
    //           <td className={classes.username_cell}>{user.username}</td>
    //           <td className={classes.role_cell}>
    //             <td className={classes.role_cell}>
    //               {user.is_active ? "Active" : "Inactive"}
    //             </td>
    //             <td className={classes.role_cell}>
    //               <button
    //                 className={classes.action_btn}
    //                 onClick={() =>
    //                   toggleUserStatus(user.username, user.is_active)
    //                 }
    //               >
    //                 {user.is_active ? "Deactivate" : "Activate"}
    //               </button>
    //             </td>
    //             <span className={`role-tag ${user.role.replace("_", "-")}`}>
    //               {user.role}
    //             </span>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className={classes.user_list_container}>
      <h2 className={classes.table_title}>User Management</h2>
      <table className={classes.user_table}>
        <thead>
          <tr className={classes.table_header_row}>
            <th className={classes.username_header}>Username</th>
            <th className={classes.role_header}>Role</th>
            <th className={classes.status_header}>Status</th>
            <th className={classes.action_header}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username} className={classes.table_row}>
              <td className={classes.username_cell}>{user.username}</td>
              <td className={classes.role_cell}>
                <span className={`role-tag ${user.role.replace("_", "-")}`}>
                  {user.role}
                </span>
              </td>
              <td className={classes.status_cell}>
                <span
                  className={`status-tag ${
                    user.is_active ? "active" : "inactive"
                  }`}
                >
                  {user.is_active ? "active" : "inactive"}
                </span>
              </td>
              <td className={classes.action_cell}>
                <button
                  className={`${classes.action_btn} ${
                    user.is_active ? "deactivate_btn" : "activate_btn"
                  }`}
                  onClick={() =>
                    toggleUserStatus(user.username, user.is_active)
                  }
                >
                  {user.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>

              {/* <td className={classes.status_cell}>
                <span
                  className={`status-tag ${
                    user.is_active ? "active" : "inactive"
                  }`}
                >
                  {user.is_active ? "active" : "inactive"}
                </span>
              </td>
              <td className={classes.action_cell}>
                <button
                  className={`${classes.action_btn} ${
                    user.is_active ? "deactivate_btn" : "activate_btn"
                  }`}
                  onClick={() =>
                    toggleUserStatus(user.username, user.is_active)
                  }
                >
                  {user.is_active ? "Deactivate" : "Activate"}
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

