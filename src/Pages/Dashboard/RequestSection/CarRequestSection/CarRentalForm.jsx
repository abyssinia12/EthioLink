import { useState } from "react";
import axios from "axios";
import classes from "../CarRequestSection/car.module.css";
import LayOut from "../../../../Components/LayOut/LayOut";
import Sidebar from "../../SideNav/sidebar";
// import SideLayOut from "../../../Components/LayOut/SideLayOut";

export default function CarRentalForm() {
  const [form, setForm] = useState({
    pickupLocation: "",
    pickupdate: "",
    dropoffdate: "",
  });

  const [availableCars, setAvailableCars] = useState([]); //new
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rentCar_officer/search",
        form
      );
      setAvailableCars(response.data); //new

      const filteredCars = response.data.filter((car) => {
        // Example conditions:
        return (
          car.location.toLowerCase() === form.pickupLocation.toLowerCase() &&
          new Date(car.availableFrom) <= new Date(form.pickupdate) &&
          new Date(car.availableTo) >= new Date(form.dropoffdate)
        );
      });

      setAvailableCars(filteredCars); // Save only matching cars

      alert("Car rental submitted!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed in customer side");
    }
  };

  return (
    <LayOut>
      <div className={classes.sidbars}>
        <Sidebar />
        <div className={classes.form_container}>
          <h1>Car Rental form customer side</h1>
          <p>say something...</p>
          <form onSubmit={handleSubmit}>
            <div className={classes.form_group}>
              <div className={classes.input_wrapper}>
                <label>Pickup Location:</label>
                <input
                  type="text"
                  name="pickupLocation"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={classes.form_group}>
              <div className={classes.input_wrapper}>
                <label>Pickup Date</label>
                <input type="date" name="pickupdate" onChange={handleChange} />
              </div>
              <div className={classes.input_wrapper}>
                <label>Dropoff date</label>
                <input type="date" name="dropoffdate" onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className={classes.book_button}>
              Search
            </button>
          </form>
          {/* <p>Result</p> */}
          {availableCars.length > 0 ? (
            <div className={classes.results}>
              <h2>Available Cars:</h2>
              {availableCars.map((car) => (
                <div key={car.id} className={classes.car_card}>
                  <h3>{car.model}</h3>
                  <p>Location: {car.location}</p>
                  {/* <p>
                    Available From: {car.availableFrom.toDate().toDateString()}
                  </p>
                  <p>Available To: {car.availableTo.toDate().toDateString()}</p> */}

                  <p>
                    Available From:{" "}
                    {new Date(car.availableFrom.seconds * 1000).toDateString()}
                  </p>
                  <p>
                    Available To:{" "}
                    {new Date(car.availableTo.seconds * 1000).toDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No cars available for the selected location and dates.</p>
          )}
        </div>
      </div>
    </LayOut>
  );
}
