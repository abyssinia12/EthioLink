import React, { useState } from "react";
import { supabase } from "../../CarRental/CustomerSide/supabaseClient";
import classes from "./Admin.module.css";
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

export default function AddNewuser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "tour_officer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setMessage({ type: "error", text: "Username and password are required" });
      return false;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long",
      });
      return false;
    }

    if (formData.username.length < 3) {
      setMessage({
        type: "error",
        text: "Username must be at least 3 characters long",
      });
      return false;
    }

    return true;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Create user in Supabase Auth using username as email
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: `${formData.username}@${formData.username}.local`, // Create a fake email from username
          password: formData.password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            username: formData.username,
            role: formData.role,
          },
        });

      if (authError) {
        throw authError;
      }

      // Insert user into users table with your structure
      const { error: userError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          username: formData.username,
          password: formData.password, // Note: In production, this should be hashed
          role: formData.role,
        },
      ]);

      if (userError) {
        console.error("User table insertion error:", userError);
        // User was created in auth but not in users table
        // We should handle this case - maybe delete the auth user
        if (userError.code === "23505") {
          // Unique violation
          setMessage({
            type: "error",
            text: "A user with this username already exists in the system",
          });
          return;
        }
        throw userError;
      }

      setMessage({
        type: "success",
        text: `User created successfully! Username: ${formData.username}`,
      });

      // Reset form
      setFormData({
        username: "",
        password: "",
        role: "tour_officer",
      });
    } catch (error) {
      console.error("Error creating user:", error);

      let errorMessage = "Failed to create user";

      if (error.message) {
        if (error.message.includes("already registered")) {
          errorMessage = "A user with this username already exists";
        } else if (error.message.includes("password")) {
          errorMessage = "Password is too weak. Use at least 6 characters";
        } else if (error.message.includes("username")) {
          errorMessage = "Please enter a valid username";
        } else {
          errorMessage = error.message;
        }
      }

      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <UserPlus className={classes.form_icon} />
        <h2>Create New User</h2>
        <p>Fill in the details below to create a new user account</p>
      </div>

      {message.text && (
        <div
          className={`${classes.message} ${classes[`message_${message.type}`]}`}
        >
          {message.type === "error" ? (
            <AlertCircle className={classes.message_icon} />
          ) : (
            <CheckCircle className={classes.message_icon} />
          )}
          <span>{message.text}</span>
          <button className={classes.message_close} onClick={clearMessage}>
            ×
          </button>
        </div>
      )}

      <div className={classes.form}>
        <div className={classes.form_group}>
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username (min 3 characters)"
            value={formData.username}
            onChange={handleInputChange}
            className={classes.form_input}
          />
        </div>

        <div className={classes.form_group}>
          <label htmlFor="password">Password *</label>
          <div className={classes.password_input_container}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              className={classes.form_input}
            />
            <button
              type="button"
              className={classes.password_toggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className={classes.toggle_icon} />
              ) : (
                <Eye className={classes.toggle_icon} />
              )}
            </button>
          </div>
        </div>

        <div className={classes.form_group}>
          <label htmlFor="role">Role *</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={classes.form_select}
          >
            <option value="tour_officer">Tour Officer</option>
            <option value="ticket_officer">Ticket Officer</option>
            <option value="Gmanager">General Manager</option>
            <option value="reception">Reception</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <button
        className={`${classes.officerBtn} ${loading ? classes.loading : ""}`}
        onClick={handleCreateUser}
        disabled={loading}
      >
        {loading ? "Creating User..." : "Create User"}
      </button>
    </div>
  );
}
