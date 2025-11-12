import { useState } from "react";
import axios from "axios";

export default function FlightBooking() {
  const [form, setForm] = useState({
    departure: "",
    arrival: "",
    date: "",
    passengers: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/book-flight",
        form
      );
      alert(res.data.message);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    
    // {/* your input fields, with onChange={handleChange} and name props */}

   

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="departure"
        value={form.departure}
        onChange={handleChange}
        placeholder="Departure City"
      />
      <input
        type="text"
        name="arrival"
        value={form.arrival}
        onChange={handleChange}
        placeholder="Arrival City"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="number"
        name="passengers"
        value={form.passengers}
        onChange={handleChange}
        min="1"
      />
      <button type="submit">Book Flight</button>
    </form>
  );
}
