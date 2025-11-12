// BookingForm.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from './Tourpackage.module.css'
// const response = await chapa.initialize(chapaPayload);
// const paymentURL = response.data.checkout_url;


const BookingForm = () => {
  const { id } = useParams(); // tour_package_id
  const navigate = useNavigate();
   const [message, setMessage] = useState("");
  const [tour, setTour] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    number_of_travelers: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error("Error fetching tour:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      tour_package_id: id,
    };

    try {
      const res = await fetch("http://localhost:5000/api/tours/book/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const { checkout_url } = res.data;
      checkout_url
        ? (window.location.href = checkout_url)
        : setMessage("Booking created, but payment URL not found.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking or payment failed.");
    } 
  };
  
  //   try {
  //     const res = await fetch("http://localhost:5000/api/tours/book", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(bookingData),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       // navigate(`/payment/${data.id}`);
  //       navigate(`/payment/callback/${booking.id}`);
        
  //       // window.location.href = data.paymentURL;
  //       // window.location.href = data.checkout_url;

  //     } else {
  //       alert("Booking failed: " + data.error);
  //     }
  //   } catch (err) {
  //     console.error("Error submitting booking:", err);
  //   }
  // };
  // useEffect(() => {
  //   // Fetch tour package details
  //   fetch(`http://localhost:5000/api/packages/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setTour(data))
  //     .catch((err) => console.error("Error fetching tour:", err));
  // }, [id]);

  // const handleChange = (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const bookingData = {
  //     ...form,
  //     tour_package_id: id,
  //   };

  //   try {
  //     const res = await fetch("http://localhost:5000/api/bookings", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(bookingData),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       // Redirect to payment page with booking ID
  //       navigate(`/payment/${data.id}`);
  //     } else {
  //       alert("Booking failed: " + data.error);
  //     }
  //   } catch (err) {
  //     console.error("Error submitting booking:", err);
  //   }
  // };

  if (!tour) return <p>Loading tour details...</p>;

  return (
    <div className={classes.booking_form}>
      <h2>Book Tour: {tour.title}</h2>
      <form onSubmit={handleSubmit}>
        <h3 className={classes.form_section_heading}>Personal Information</h3>

        <div className={classes.form_group_required}>
          <label>First Name</label>
          <input
            name="first_name"
            placeholder="First Name"
            required
            onChange={handleChange}
          />
        </div>

        <div className={classes.form_group_required}>
          <label>Last Name</label>
          <input
            name="last_name"
            placeholder="Last Name"
            required
            onChange={handleChange}
          />
        </div>

        <div className={classes.form_group_required}>
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className={classes.form_group_required}>
          <label>Phone Number</label>
          <input
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
          />
        </div>
        <h3 className={classes.form_section_heading}>Booking Details</h3>

        <div className={classes.form_group_required}>
          <label>Number of Travelers</label>
          <input
            name="number_of_travelers"
            placeholder="Number of Travelers"
            type="number"
            min="1"
            required
            onChange={handleChange}
          />
        </div>

        <button className={classes.paymentBtn} type="submit">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
