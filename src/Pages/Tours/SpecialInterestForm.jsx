
import { useState } from "react";
import classes from "./Special.module.css";
import { MdPersonOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";

export default function SpecialInterestForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    country: "",
    group_size: 1,
    start_date: "",
    end_date: "",
    request: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const res = await fetch("http://localhost:5000/api/special-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Request submitted successfully!");
      setMessage(
              "Your special interest request has been submitted successfully!"
            );
    } else {
      alert("Submission failed.");
    }
  setIsSubmitting(false);
   };

   const today = new Date().toISOString().split("T")[0];

  return (
    <div className={classes.allSpecial}>
      <form onSubmit={handleSubmit}>
        <h1>Plan Your Special Interest Journey</h1>
        <p>
          Share your travel dreams with us and we'll create a bespoke experience
          just for you
        </p>

        <h2 className={classes.logo}>
          <MdPersonOutline color="#F7921F" />
          Personal Information
        </h2>
        <div className={classes.form_group}>
          <label className="required">Full Name</label>
          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.form_group}>
          <label className="required">Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.form_group}>
          <label className={classes.logo}>
            {/* className="required" */}
            <FaPhoneAlt color="#F7921F" />
            Phone Number
          </label>
          <input
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.form_group}>
          <label className={classes.logo}>
            {" "}
            <FaLocationDot color="#F7921F" />
            Country/Region
          </label>
          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
          />
        </div>

        <h2 className={classes.logo}>
          <FaCalendar size={20} color="#F7921F" />
          Travel Details
        </h2>
        <div className={classes.form_group}>
          <label className="required">Group Size</label>
          <input
            name="group_size"
            type="number"
            min="1"
            placeholder="Group Size"
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.date_container}>
          <div className={classes.form_group}>
            <label className="required">Start Date</label>
            <input
              name="start_date"
              type="date"
              value={formData.start_date}
              min={today}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.form_group}>
            <label className="required">Start Date</label>
            <input
              name="end_date"
              type="date"
              value={formData.start_date}
              min={today}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h2 className={classes.logo}>
          <LuMessageSquare size={30} color="#F7921F" />
          Special Requests & Interests
        </h2>
        <p>Tell us about your ideal experience</p>
        <div className={classes.form_group}>
          <textarea
            name="request"
            placeholder="Describe your interests, preferred activities, accommodation preferences, dietary requirements, accessibility needs, or any other special requests..."
            onChange={handleChange}
          />
        </div>

        <p>
          The more details you provide, the better we can tailor your experience
        </p>

        <h2>Submit Special Interest Request</h2>
        <div className={classes.checkbox_container}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            Your information is secure and will only be used to create your
            personalized travel experience
          </label>
        </div>

        <button className={classes.special_interest_btn} type="submit">
          Submit Special Request
        </button>
      </form>
    </div>
  );
}


//   try {
  //     const res = await fetch("http://localhost:5000/api/special-interest", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });

  //     if (!res.ok) {
  //       const error = await res.json();
  //       throw new Error(error.message || "Something went wrong");
  //     }

  //     const data = await res.json();
  //     console.log("Submitted:", data);

  //     // Reset form
  //     setForm({
  //       full_name: "",
  //       email: "",
  //       phone_number: "",
  //       country: "",
  //       group_size: "",
  //       start_date: "",
  //       end_date: "",
  //       request: "",
  //     });

  //     // Show success message
  //     setMessage(
  //       "Your special interest request has been submitted successfully!"
  //     );
  //   } catch (err) {
  //     setMessage("Error submitting form: " + err.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };