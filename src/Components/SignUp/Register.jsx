// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from './Register.module.css'

// function Register() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/register", {
//         email,
//         username,
//         password,
//       });
//       alert("Registration successful! Please log in.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className={classes.all}>
//       <div className={classes.register_container}>
//         <div className={classes.header_section}>
//           <img src="/plane.jpg" alt="" className={classes.header_image} />
//           <h1>Ethio-link Tour & Travel</h1>
//           <h2>Join Ethio-link</h2>
//           <p>
//             Create an account to access personalized travel experiences and
//             exclusive offers.
//           </p>
//         </div>
//         <div className={classes.register_form}>
//           <h2>Create an Account</h2>
//           <form onSubmit={handleRegister}>
//             <div className={classes.input_group}>
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Youre email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className={classes.input_group}>
//               <label>Username</label>
//               <input
//                 type="text"
//                 placeholder="Choose a username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div className={classes.input_group}>
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Create a strong Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit">Register</button>
//           </form>
//           <div className={classes.signin_link}>
//             Already have an account? <a href="/login">Sign in</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Register;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert("Unexpected server response.");
      }
    } catch (err) {
      console.error("Registration error:", err); // <--- helpful log
      const message = err.response?.data?.message || "Registration failed.";
      alert(message);
    }
  };

  return (
    <div className={classes.all}>
      <div className={classes.register_container}>
        <div className={classes.header_section}>
          <img src="/plane.jpg" alt="" className={classes.header_image} />
          <h1>Ethio-link Tour & Travel</h1>
          <h2>Join Ethio-link</h2>
          <p>
            Create an account to access personalized travel experiences and
            exclusive offers.
          </p>
        </div>
        <div className={classes.register_form}>
          <h2>Create an Account</h2>
          <form onSubmit={handleRegister}>
            <div className={classes.input_group}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={classes.input_group}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={classes.input_group}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className={classes.register_button} type="submit">
              Register
            </button>
          </form>
          <div className={classes.signin_link}>
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
