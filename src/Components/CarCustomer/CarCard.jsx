// import React, { useState } from "react";
// import axios from "axios";
// import classes from "./Car.module.css";

// const CarCard = ({ car, filters }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");

//   const handleBookNow = () => {
//     setShowForm(true);
//   };

//   const handlePay = async () => {
//     if (!firstName || !lastName || !email) {
//       alert("Please fill in all customer details.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/checkout", {
//         amount: car.price,
//         car_id: car.id,
//         pickupDate: filters.pickupDate,
//         dropoffDate: filters.dropoffDate,
//         email,
//         first_name: firstName,
//         last_name: lastName,
//       });

//       window.location.href = res.data.payment_url;
//     } catch (err) {
//       console.error("Payment error:", err.response?.data || err.message);
//       alert("Payment failed. See console for details.");
//     }
//   };

//   return (
//     <>
   
//     <div className={classes.car_card}>
      
//       <img
//         className={classes.car_card__image}
//         src={car.image_url}
//         alt={car.car_model}
//       />
//       <h3 className={classes.car_card__title}>{car.car_model}</h3>

//       <div className={classes.car_card__details}>
//         <p className={classes.car_card__detail}>
//           <span className={classes.car_card__label}>Size:</span>
//           <span className={classes.car_card__value}>{car.car_size}</span>
//         </p>
//         <p className={classes.car_card__detail}>
//           <span className={classes.car_card__label}>Seats:</span>
//           <span className={classes.car_card__value}>{car.seats}</span>
//         </p>
//         <p className={classes.car_card__detail}>
//           <span className={classes.car_card__label}>Price:</span>
//           <span className={classes.car_card__value}>{car.price} ETB</span>
//         </p>
//       </div>

      
//     </div>
//     {/* Book Now Button */}
//     {!showForm && (
//         <button onClick={handleBookNow} className={classes.carcard__button}>
//           Book Now
//         </button>
//       )}

//       {/* Form and Pay Button */}
//       {showForm && (
//         <div className={classes.car_card__form}>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className={classes.carcard__input}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className={classes.carcard__input}
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={classes.carcard__input}
//           />
//           <button onClick={handlePay} className={classes.carcard__button}>
//             Pay
//           </button>
//         </div>
//       )}
//      </>
//   );
// };

// export default CarCard;

// // import axios from "axios";
// // import classes from './Car.module.css'

// // const CarCard = ({ car, filters }) => {
// //   const handleBook = async () => {
// //     const res = await axios.post("http://localhost:5000/api/chapa/checkout", {
// //       amount: car.price,
// //       car_id: car.id,
// //       pickupDate: filters.pickupDate,
// //       dropoffDate: filters.dropoffDate,
// //     });
// //     window.location.href = res.data.payment_url;
// //   };

// //   return (
// //     <div className={classes.continer}>
// //       <div className={classes.car_card}>
// //         <img
// //           className={classes.car_card__image}
// //           src={car.image_url}
// //           alt={car.car_model}
// //         />
// //         <h3 className={classes.car_card__title}>{car.car_model}</h3>

// //         <div className={classes.car_card__details}>
// //           <p className={classes.car_card__detail}>
// //             <span className={classes.car_card__label}>Size:</span>
// //             <span className={classes.car_card__value}>{car.car_size}</span>
// //           </p>

// //           <p className={classes.car_card__details}>
// //             <span className={classes.car_card__label}>seats:</span>
// //             <span className={classes.car_card__value}>{car.seats}</span>
// //           </p>

// //           <p className={classes.car_card__details}>
// //             <span className={classes.car_card__label}>Price:</span>
// //             <span className={classes.car_card__value}>{car.price}</span>
// //           </p>
// //         </div>
// //         <button onClick={handleBook} className={classes.carcard__button}>
// //           Book & Pay
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CarCard;

import React, { useState } from "react";
import axios from "axios";
import classes from "./Car.module.css";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // const handleBookNow = () => {
  //   setShowForm(true);
  // };

  // const handlePay = async () => {
  //   if (!firstName || !lastName || !email) {
  //     alert("Please fill in all customer details.");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/checkout", {
  //       amount: car.price,
  //       car_id: car.id,
  //       pickupDate: filters.pickupDate,
  //       dropoffDate: filters.dropoffDate,
  //       email,
  //       first_name: firstName,
  //       last_name: lastName,
  //     });

  //     window.location.href = res.data.payment_url;
  //   } catch (err) {
  //     console.error("Payment error:", err.response?.data || err.message);
  //     alert("Payment failed. See console for details.");
  //   }
  // };

  return (
    <div className={classes.car_card}>
      <img
        className={classes.car_card__image}
        src={car.image_url}
        alt={car.car_model}
      />
      <h3 className={classes.car_card__title}>{car.car_model}</h3>

      <div className={classes.car_card__details}>
        <p className={classes.car_card__detail}>
          <span className={classes.car_card__label}>Size:</span>
          <span className={classes.car_card__value}>{car.car_size}</span>
        </p>
        <p className={classes.car_card__detail}>
          <span className={classes.car_card__label}>Seats:</span>
          <span className={classes.car_card__value}>{car.seats}</span>
        </p>
        <p className={classes.car_card__detail}>
          <span className={classes.car_card__label}>Price:</span>
          <span className={classes.car_card__value}>{car.price} ETB/day</span>
        </p>
      </div>

      {/* Book Now Button */}
      {!showForm && (
        <div>
          {/* <button onClick={handleBookNow} className={classes.carcard__button}>
            Book Now
          </button> */}
          <Link to={`/carRental/${car.id}`} className={classes.detail_button}>
            View Details
          </Link>
        </div>
      )}

      {/* Form and Pay Button */}
      {showForm && (
        <div className={classes.car_card__form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={classes.carcard__input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={classes.carcard__input}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.carcard__input}
          />
          <button onClick={handlePay} className={classes.carcard__button}>
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCard;

