// import { useState } from "react";

// const CarSearchForm = ({ onSearch }) => {
//   const [pickupLocation, setPickupLocation] = useState("");
//   const [pickupDate, setPickupDate] = useState("");
//   const [dropoffDate, setDropoffDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch({ pickupLocation, pickupDate, dropoffDate });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <input
//         placeholder="Pickup Location"
//         value={pickupLocation}
//         onChange={(e) => setPickupLocation(e.target.value)}
//         required
//       />
//       <input
//         type="date"
//         value={pickupDate}
//         onChange={(e) => setPickupDate(e.target.value)}
//         required
//       />
//       <input
//         type="date"
//         value={dropoffDate}
//         onChange={(e) => setDropoffDate(e.target.value)}
//         required
//       />
//       <button type="submit">Search Cars</button>
//     </form>
//   );
// };

// export default CarSearchForm;

import React, { useState } from "react";
import axios from "axios";
import classes from './Car.module.css'
import LayOut from "../LayOut/LayOut";
import CarResults from "./CarResults";
import {User} from 'lucide-react';

// {
//   setFilters;
// }
const CarSearchForm = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [filters, setFilters] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFilters = {
      pickupLocation,
      pickupDate,
      dropoffDate,
    };

    setFilters(newFilters); // Send filters to CarResults

    try {
      await axios.post("http://localhost:5000/api/car/search", newFilters);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setFilters({ pickupLocation, pickupDate, dropoffDate });

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/car/search", {
  //       pickupLocation,
  //       pickupDate,
  //       dropoffDate,
  //     });

  //     setResults(res.data);

  //   } catch (error) {
  //     console.error("Search error:", error);
  //   }
  // };

  const idealForData = [
    {
      title: "Solo Travelers",
      description:
        "Perfect for independent explorers who want an affordable and reliable vehicle for city exploration and short trips.",
    },
    {
      title: "Couples",
      description:
        "Ideal for romantic getaways and couple adventures, offering intimacy and cost-effectiveness.",
    },
    {
      title: "Business Travelers",
      description:
        "Great for business trips within the city, meetings, and airport transfers with professional appearance.",
    },
  ];

  // Generate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <LayOut>
      <form className={classes.search_form} onSubmit={handleSubmit}>
        <div className={classes.form_group}>
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>

        <div className={classes.form_group}>
          <input
            type="date"
            value={pickupDate}
            min={today}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>

        <div className={classes.form_group}>
          <input
            type="date"
            value={dropoffDate}
            min={pickupDate || today}
            onChange={(e) => setDropoffDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={classes.search_button}>
          Search Cars
        </button>
      </form>
      {/* 🔼 Show Search Results Here */}
      {filters && <CarResults filters={filters} />}

      {/* Ideal For Cards */}
      <div className={classes.ideal_section}>
        <h2>Ideal For</h2>
        <div className={classes.card_container}>
          {idealForData.map((item, index) => (
            <div key={index} className={classes.ideal_card}>
              <User />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </LayOut>
  );
};

export default CarSearchForm;
