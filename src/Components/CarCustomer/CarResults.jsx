import { useEffect, useState } from "react";
import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";
import CarCard from "./CarCard";
import classes from "./Car.module.css";

const CarResults = ({ filters }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      if (
        !filters.pickupLocation ||
        !filters.pickupDate ||
        !filters.dropoffDate
      )
        return;

      setLoading(true);
      setHasSearched(true); // user triggered a search

      const pickupDate = new Date(filters.pickupDate)
        .toISOString()
        .split("T")[0];
      const dropoffDate = new Date(filters.dropoffDate)
        .toISOString()
        .split("T")[0];

      const { data, error } = await supabase
        .from("car_rentals_officer")
        .select("*")
        .eq("location", filters.pickupLocation)
        .eq("start_date", pickupDate)
        .eq("end_date", dropoffDate)
        .eq("available", true);

      setLoading(false);

      if (error) {
        console.error("Supabase fetch error:", error);
      } else {
        setCars(data);
      }
    };

    fetchCars();
  }, [filters]);

  return (
    <div className={classes.car_cards_container}>
      {loading && <p>Loading cars...</p>}

      {!loading && hasSearched && cars.length === 0 && (
        <p>No cars found matching your filters.</p>
      )}

      {!loading &&
        cars.length > 0 &&
        cars.map((car) => <CarCard key={car.id} car={car} filters={filters} />)}
    </div>
  );
};

export default CarResults;

// import { useEffect, useState } from "react";
// import { supabase } from "../../Pages/CarRental/CustomerSide/supabaseClient";
// import CarCard from "./CarCard";
// import classes from "./Car.module.css";
// import { Link } from "react-router-dom";

// const CarResults = ({ filters }) => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       if (
//         !filters.pickupLocation ||
//         !filters.pickupDate ||
//         !filters.dropoffDate
//       )
//         return;

//       console.log("Filters:", filters);

//       // Convert dates to YYYY-MM-DD in case the format includes time
//       const pickupDate = new Date(filters.pickupDate)
//         .toISOString()
//         .split("T")[0];
//       const dropoffDate = new Date(filters.dropoffDate)
//         .toISOString()
//         .split("T")[0];

//       const { data, error } = await supabase
//         .from("car_rentals_officer")
//         .select("*")
//         .eq("location", filters.pickupLocation)
//         .eq("start_date", pickupDate)
//         .eq("end_date", dropoffDate)
//         .eq("available", true);

//       if (error) {
//         console.error("Supabase fetch error:", error);
//       } else {
//         console.log("Cars fetched:", data);
//         setCars(data);
//       }
//     };

//     fetchCars();
//   }, [filters]);

//   return (
//     <div className={classes.car_cards_container}>
//       {cars.length > 0 ? (
//         cars.map((car) => <CarCard key={car.id} car={car} filters={filters} />)
//       ) : (
//         <p>No cars found matching your filters.</p>

//       )}

//     </div>
//   );
// };

// export default CarResults;

//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {

//       if (filters.pickupLocation) {
//         console.log("Filters:", filters); // should show actual values
//         const { data } = await supabase
//           .from("car_rentals_officer")
//           .select("*")
//           .eq("location", filters.pickupLocation)
//           .eq("start_date", filters.pickupDate)
//           .eq("end_date", filters.dropoffDate)
//           .eq("available", true);
//       }

//       if (error) {
//         console.error("Supabase fetch error:", error);
//       } else {
//         console.log("Cars fetched:", data);
//         setCars(data);
//         console.log("Fetched cars:", data);

//       }

//       // setCars(data);

//     };

//     if ((filters.pickupLocation, filters.pickupDate, filters.dropoffDate))
//       fetchCars();
//   }, [filters]);
//     console.log("Cars fetched:", cars);
//     // console.log("Filters:", filters);
//   return (
//     <div className="car-grid">
//       {cars.map((car) => (
//         <CarCard key={car.id} car={car} filters={filters} />
//       ))},

//     </div>
//   );

// };

// import React from "react";
// import classes from './Car.module.css'

// const CarResults = ({ results, onBook }) => {
//   // if (!results.length)
//   if (!results || results.length === 0)
//     return <p className={classes.warning}>No cars found for your selection.</p>;

//   return (
//     <div className="car-results">
//       {results.map((car) => (
//         <div key={car.id} className="car-card">
//           <img src={car.image_url} alt={car.car_model} width="200" />
//           <h3>{car.car_model}</h3>
//           <p>Size: {car.car_size}</p>
//           <p>Seats: {car.seats}</p>
//           <p>Price: {car.price} ETB/day</p>
//           <button onClick={() => onBook(car)}>Book</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarResults;
