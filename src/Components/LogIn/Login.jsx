// // src/pages/Login.js
// import React, { useState } from "react";
// import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) return alert(error.message);

//     const user = data.user;
//     const { data: roleData, error: roleError } = await supabase
//       .from("user_roles")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     if (roleError) return alert("Role fetch failed");

//     const role = roleData.role;
//     if (role === "admin") navigate("/admin-dashboard");
//     else if (role === "tour_officer") navigate("/tour-dashboard");
//     else if (role === "ticket_officer") navigate("/ticket-dashboard");
//     else alert("Unknown role");
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../AuthApi/api";
import classes from "./Login.module.css";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      const role = res.data.role;
      setUser({
        username: res.data.username,
        role,
      });

      // setUser({
      //   username: res.data.username,
      //   role,
      // });

      // if (role === "admin") navigate("/admin");
      // else if (role === "customer") navigate("/");
      // else if (role === "tour_officer") navigate("/tour");
      // else if (role === "ticket_officer") navigate("/ticket");
      // else if (role === "Gmanager") navigate("/gm");
      // else if (role === "reciption") navigate("/reciption");

      if (role === "admin") navigate("/admin");
      else if (role === "customer") navigate("/");
      else if (role === "tour_officer") navigate("/tour");
      else if (role === "ticket_officer") navigate("/ticket");
      else if (role === "Gmanager") navigate("/gm");
      else if (role === "reciption") {
        // Store hotel_id for receptionist
        localStorage.setItem("hotel_id", res.data.hotel_id);
        navigate("/reception");
      }
    } catch (err) {
      alert("Login failed!");
    }
  };

  const gotohome = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className={classes.all}>
      <div className={classes.login_container}>
        {/* Left side - Image */}
        <div className={classes.header_section}>
          <img src="/plane.jpg" alt="Banner" className={classes.header_image} />
          <h1 onClick={gotohome} className={classes.main_heading}>
            Ethio-link Tour & Travel <br /> <p>Explore Ethiopia</p>
          </h1>
        </div>

        {/* Right side - Login form */}
        <div className={classes.login_form}>
          <h2 className={classes.welcome_back}>Welcome back</h2>
          <div className={classes.form_group}>
            <label className={classes.form_label} htmlFor="username">
              Username
            </label>
            <input
              className={classes.form_input}
              id="username"
              placeholder="Your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={classes.form_group}>
            <label className={classes.form_label} htmlFor="password">
              Password
            </label>
            <input
              className={classes.form_input}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forgot-password" className={classes.forgot_password}>
              Forgot password?
            </Link>
          </div>

          <button className={classes.login_button} onClick={handleLogin}>
            Login
          </button>
          <div className={classes.register_section}>
            Don't have an account?
            <a href="/register" className={classes.register_link}>
              Register now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// <div className={classes.all}>
//   <div className={classes.login_container}>
//   {/* its first class part  */}

//     <div className={classes.login_container}>
//       <div className={classes.header_section}>
//         <img
//           src="/plane.jpg"
//           alt="Banner"
//           // style={{ backgroundImage: `url('../../../public/Banner.jpg')` }}
//           className={classes.header_image}
//         />

//         <h1 className={classes.main_heading}>
//           Ethio-link Tour & Travel <br /> <p>Explore Ethiopia</p>
//         </h1>
//         <p className={classes.sub_heading}></p>
//       </div>
//       <h2 className={classes.welcome_back}>Welcome back</h2>
//       <div className={classes.form_group}>
//         <label className={classes.form_label} htmlFor="username">
//           Username
//         </label>
//         <input
//           className={classes.form_input}
//           id="username"
//           placeholder="Your username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>

//       <div className={classes.form_group}>
//         <label className={classes.form_label} htmlFor="password">
//           Password
//         </label>
//         <input
//           className={classes.form_input}
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <a href="/forgot-password" className={classes.forgot_password}>
//           Forgot password?
//         </a>
//       </div>

//       <button className={classes.login_button} onClick={handleLogin}>
//         Login
//       </button>
//       <div className={classes.register_section}>
//         Don't have an account?
//         <a href="/register" className={classes.register_link}>
//           Register now
//         </a>
//       </div>
//     </div>
//   </div>
// </div>
