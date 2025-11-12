// // import React, { useState } from "react";
// // import LayOut from "../../../Components/LayOut/LayOut";
// // import { IoIosSearch } from "react-icons/io";
// // import { storage } from "../../../firebase"; // Adjust if needed
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// // import { v4 as uuidv4 } from "uuid";
// // import axios from "axios";
// // import classes from '../CustomerSide/car.module.css';

// // export default function CarBookingForm() {
// //   const [form, setForm] = useState({
// //     Model: " ",
// //     carsize: "",
// //     seats: "",
// //     totalPrice: "",
// //   });
// //   const [image, setImage] = useState(null);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     setImage(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       let imageUrl = "";

// //       if (image) {
// //         const imageRef = ref(storage, `car-images/${uuidv4()}-${image.name}`);
// //         const snapshot = await uploadBytes(imageRef, image);
// //         imageUrl = await getDownloadURL(snapshot.ref);
// //       }

// //       await axios.post("http://localhost:5000/api/rentCar_officer/add", {
// //         ...form,
// //         imageUrl,
// //       });

// //       alert("Car rental submitted!");
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       alert("Submission failed");
// //     }
// //   };

// // //   return (
// // //     <LayOut>
// // //       <div className="container">
// // //         <h2>Car rental form officer side</h2>
// // //       </div>
// // //       <div>  </div>

// // //         <form onSubmit={handleSubmit}>
// // //           <input
// // //             type="text"
// // //             placeholder="car size"
// // //             name="carsize"
// // //             onChange={handleChange}
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="seats"
// // //             name="seats"
// // //             onChange={handleChange}
// // //           />
// // //           <input
// // //             type="text"
// // //             placeholder="Total Price"
// // //             name="totalPrice"
// // //             onChange={handleChange}
// // //           />
// // //           <label>Upload Car Image</label>
// // //           <input type="file" accept="image/*" onChange={handleImageChange} />

// // //           <button type="submit">Submit</button>
// // //         </form>
// // //       </div>
// // //     </LayOut>
// // //   );
// // // }

// //   return (
// //     <LayOut>
// //       <div className={classes.officercontainer}>
// //         <h1>Car rental form officer side</h1>

// //         <form onSubmit={handleSubmit}>
// //           <div className={classes.inputeCollection}>
// //             <div className={classes.input_wra}>
// //               <label>Model</label>
// //               <input type="text" name="model" onChange={handleChange} />
// //             </div>
// //             <div className={classes.input_wra}>
// //               <label>Car size</label>
// //               <input type="text" name="carsize" onChange={handleChange} />
// //             </div>
// //             <div className={classes.input_wra}>
// //               <label>Seats</label>
// //               <input type="text" name="seats" onChange={handleChange} />
// //             </div>
// //             <div className={classes.input_wra}>
// //               <label>Total Price</label>
// //               <input type="text" name="totalPrice" onChange={handleChange} />
// //             </div>
// //             <div className={classes.input_wra}>
// //               <label>Upload Car Image</label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //               />
// //             </div>
// //           </div>

// //           <button className={classes.btnOfficer} type="submit">
// //             Submit
// //           </button>
// //         </form>
// //       </div>
// //     </LayOut>
// //   );
// // }

// //new code based on supabase

// import React, { useState } from "react";
// import axios from "axios";
// // import LayOut from "../../../../Components/LayOut/LayOut";
// import classes from "../../../Dashboard/RequestSection/CarRequestSection/car.module.css";

// export default function CarBookingForm() {
//   const [form, setForm] = useState({
//     car_model: "",
//     car_size: "",
//     seats: "",
//     price: "",
//     available: "",
//     location: "",
//     unavailable_dates: "",
//     start_date: "",
//     end_date: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("car_model", form.car_model);
//       formData.append("car_size", form.car_size);
//       formData.append("seats", parseInt(form.seats));
//       formData.append("price", parseFloat(form.price));
//       formData.append("available", form.available);
//       formData.append("location", form.location);
//       formData.append(
//         "unavailable_dates",
//         JSON.stringify(form.unavailable_dates)
//       ); // Send as JSON string
//       formData.append("start_date", form.start_date);
//       formData.append("end_date", form.end_date);
//       formData.append("image", image);

//       await axios.post(
//         "http://localhost:5000/api/rentCar_officer/add",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Car rental submitted!");
//     } catch (error) {
//       console.error("Submission failed:", error);
//       alert("Failed to submit form.");
//     }
//   };

//   return (
    
//       <div className={classes.officercontainer}>
//         <h1>Rigister Car Detaile </h1>
//         <form onSubmit={handleSubmit}>
//           <div className={classes.inputeCollection}>
//             <div className={classes.input_wra}>
//               <label>Model</label>
//               <input type="text" name="car_model" onChange={handleChange} />
//             </div>

//             <div className={classes.input_wra}>
//               <label>Car Size</label>
//               <input type="text" name="car_size" onChange={handleChange} />
//             </div>
//             <div className={classes.input_wra}>
//               <label>Seats</label>
//               <input type="text" name="seats" onChange={handleChange} />
//             </div>
//             <div className={classes.input_wra}>
//               <label>Total Price</label>
//               <input type="text" name="price" onChange={handleChange} />
//             </div>

//             <div className={classes.input_wra}>
//               <label>Car availablety</label>
//               <input
//                 type="checkbox"
//                 name="available"
//                 onChange={(e) =>
//                   setForm({ ...form, available: e.target.checked })
//                 }
//               />
//             </div>
//             <div className={classes.input_wra}>
//               <label>Location</label>
//               <input type="text" name="location" onChange={handleChange} />
//             </div>
//             <div className={classes.input_wra}>
//               <label>Unavailable_dates</label>
//               <input
//                 type="text"
//                 placeholder="e.g. 2025-06-01,2025-06-05"
//                 name="unavailable_dates"
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     unavailable_dates: e.target.value.split(","),
//                   })
//                 }
//               />
//             </div>

//             <div className={classes.input_wra}>
//               <label>Start_date</label>
//               <input type="date" name="start_date" onChange={handleChange} />
//             </div>

//             <div className={classes.input_wra}>
//               <label>End_date</label>
//               <input type="date" name="end_date" onChange={handleChange} />
//             </div>

//             <div className={classes.input_wra}>
//               <label>Upload Car Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>
//           <button className={classes.btnOfficer} type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
    
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import classes from "../../../Dashboard/RequestSection/CarRequestSection/car.module.css";
import { useNavigate } from "react-router-dom";
// import classes from "./TourCar.module.css";

export default function CarBookingForm() {
  const [form, setForm] = useState({
    car_model: "",
    car_size: "",
    seats: "",
    price: "",
    available: "",
    location: "",
    unavailable_dates: "",
    start_date: "",
    end_date: "",
  });
  const [image, setImage] = useState(null);
  // const [showForm, setShowForm] = useState(false); // Toggle form visibility
   const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("car_model", form.car_model);
      formData.append("car_size", form.car_size);
      formData.append("seats", parseInt(form.seats));
      formData.append("price", parseFloat(form.price));
      formData.append("available", form.available);
      formData.append("location", form.location);
      formData.append(
        "unavailable_dates",
        JSON.stringify(form.unavailable_dates)
      );
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/rentCar_officer/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Car rental submitted!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit form.");
    }
  };

  const back = () => {
    navigate(`/tour/manage-car`);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={classes.officercontainer}>
      <button className={classes.backbtn} onClick={back} type="button">
        Back To List
      </button>
      <h1> Register Car Detail</h1>
      {/* <button
        className={classes.btnOfficer}
        // onClick={() => setShowForm(!showForm)}
      >
       
      </button> */}
      <form onSubmit={handleSubmit}>
        <div className={classes.inputeCollection}>
          <div className={classes.input_wra}>
            <label>Model</label>
            <input type="text" name="car_model" onChange={handleChange} />
          </div>

          <div className={classes.input_wra}>
            <label>Car Size</label>
            <input type="text" name="car_size" onChange={handleChange} />
          </div>

          <div className={classes.input_wra}>
            <label>Seats</label>
            <input type="text" name="seats" onChange={handleChange} />
          </div>

          <div className={classes.input_wra}>
            <label>Total Price</label>
            <input type="text" name="price" onChange={handleChange} />
          </div>

          <div className={classes.input_wra}>
            <label>Car availability</label>
            <input
              type="checkbox"
              name="available"
              onChange={(e) =>
                setForm({ ...form, available: e.target.checked })
              }
            />
          </div>

          <div className={classes.input_wra}>
            <label>Location</label>
            <input type="text" name="location" onChange={handleChange} />
          </div>

          <div className={classes.input_wra}>
            <label>Unavailable Dates</label>
            <input
              type="text"
              placeholder="e.g. 2025-06-01,2025-06-05"
              name="unavailable_dates"
              onChange={(e) =>
                setForm({
                  ...form,
                  unavailable_dates: e.target.value.split(","),
                })
              }
            />
          </div>

          <div className={classes.input_wra}>
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              min={today}
              onChange={handleChange}
            />
          </div>

          <div className={classes.input_wra}>
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              min={form.start_date || today}
              onChange={handleChange}
            />
          </div>

          <div className={classes.input_wra}>
            <label>Upload Car Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        <button className={classes.btnOfficer} type="submit">
          Submit
        </button>
      </form>
      {/* {showForm && (
       
      )} */}
    </div>
  );
}
