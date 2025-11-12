import React, { useState, useEffect } from "react";
import { api } from "../../AuthApi/api";
import classes from "./Login.module.css";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  "https://svoaabrejgopvzhlnpxv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2b2FhYnJlamdvcHZ6aGxucHh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTg5MTM5OCwiZXhwIjoyMDYxNDY3Mzk4fQ.2cmWfta8Jtw0NfnmKR_UwvG8Bn6Nwu2QwqYkfpPzKaY"
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      // Try Supabase password reset first
      const { error: supabaseError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://localhost:5173/reset-password",
        });

      if (supabaseError) {
        console.error("Supabase password reset failed:", supabaseError);

        // Fallback to your custom backend
        try {
          await api.post("/auth/forgot-password", { email });
          setMessage(
            "If an account exists, a reset link has been sent to your email."
          );
        } catch (backendErr) {
          console.error("Backend password reset failed:", backendErr);
          setError(
            "Failed to send reset email. Please ensure the email is correct and try again."
          );
        }
      } else {
        setMessage(
          "If an account exists for this email, a password reset link has been sent."
        );
        setEmail(""); // Clear the email field
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.all}>
      <div className={classes.login_container}>
        {/* Left side - Image */}
        <div className={classes.header_section}>
          <img src="/plane.jpg" alt="Banner" className={classes.header_image} />
          <h1 className={classes.main_heading}>
            Ethio-link Tour & Travel <br /> <p>Explore Ethiopia</p>
          </h1>
        </div>

        {/* Right side - Forgot Password form */}
        <div className={classes.login_form}>
          <h2 className={classes.welcome_back}>Forgot Password</h2>
          <p className={classes.sub_heading}>
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <div className={classes.form_group}>
              <label className={classes.form_label} htmlFor="email">
                Email Address
              </label>
              <input
                className={classes.form_input}
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              className={classes.login_button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <p
              style={{ color: "green", textAlign: "center", marginTop: "1rem" }}
            >
              {message}
            </p>
          )}
          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <div className={classes.register_section}>
            Remembered your password?{" "}
            <a href="/login" className={classes.register_link}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
