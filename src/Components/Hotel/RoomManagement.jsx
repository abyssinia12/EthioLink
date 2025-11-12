// src/components/RoomManager.js
import React, { useEffect, useState } from "react";
import API from "../../HotelApi/api";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./HotelOfficer.module.css";
// import BookingTracker from './BookingTracker';
import axios from "axios";

function RoomManagement() {
  const { id } = useParams(); // hotel ID
  const [hotel, setHotel] = useState(null);
  const [roomForm, setRoomForm] = useState({
    type: "",
    price: "",
    image: "",
    room_number: "",
    floor_number: "",
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = () => {
    // API.get(`/hotels/${id}`)
    // axios.get(`http://localhost:5000/api/hotels/${id}`)
    // API.get(`/officer/hotels/${id}`)
    axios
      .get(`http://localhost:5000/api/officer/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Failed to load hotel data", err));
  };

  const handleInputChange = (e) => {
    setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
  };

  const addRoom = () => {
    if (
      !roomForm.type ||
      !roomForm.price ||
      !roomForm.image ||
      !roomForm.room_number ||
      !roomForm.floor_number
    )
      return;

    // API.post(`/hotels/${id}/rooms`, roomForm)
    axios
      .post(`http://localhost:5000/api/officer/hotels/${id}/rooms`, roomForm)
      .then((res) => {
        setHotel(res.data);
        setRoomForm({
          type: "",
          price: "",
          image: "",
          room_number: "",
          floor_number: "",
        });
      })
      .catch((err) => console.error("Failed to add room", err));
  };

  const deleteRoom = (roomId) => {
    // API.delete(`/hotels/${id}/rooms/${roomId}`)
    axios
      .delete(`http://localhost:5000/api/officer/hotels/${id}/rooms/${roomId}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Failed to delete room", err));
  };

  const startEdit = (room) => {
    setEditingRoomId(room.id);
    setRoomForm({
      type: room.type,
      price: room.price,
      image: room.image,
      room_number: room.room_number || "",
      floor_number: room.floor_number || "",
    });
  };

  const cancelEdit = () => {
    setEditingRoomId(null);
    setRoomForm({
      type: "",
      price: "",
      image: "",
      room_number: "",
      floor_number: "",
    });
  };

  const updateRoom = () => {
    if (!editingRoomId) return;

    // API.put(`/hotels/${id}/rooms/${editingRoomId}`, roomForm)
    axios
      .put(
        `http://localhost:5000/api/officer/hotels/${id}/rooms/${editingRoomId}`,
        roomForm
      )
      .then((res) => {
        setHotel(res.data);
        cancelEdit();
      })
      .catch((err) => console.error("Failed to update room", err));
  };

  const back = () => {
    navigate("/tour/manage-hotel");
  };

  if (!hotel) return <p className={classes.load}>Loading...</p>;

  return (
    <div className={classes.room_management}>
      <div className={classes.header}>
        <button className={classes.topBack} onClick={back}>
          {" "}
          Back to Hotel List
        </button>
        <h2 className={classes.sec}>Manage Rooms for {hotel.name}</h2>
      </div>

      <div className={classes.room_form}>
        <div className={classes.input_group}>
          <input
            className={classes.form_input}
            name="type"
            placeholder="Room Type"
            value={roomForm.type}
            onChange={handleInputChange}
          />
          <input
            className={classes.form_input}
            name="price"
            type="number"
            placeholder="Price"
            value={roomForm.price}
            onChange={handleInputChange}
          />
          <input
            className={classes.form_input}
            name="image"
            placeholder="Image Path"
            value={roomForm.image}
            onChange={handleInputChange}
          />
          <input
            className={classes.form_input}
            name="room_number"
            placeholder="Room Number (e.g., 101)"
            value={roomForm.room_number}
            onChange={handleInputChange}
          />
          <input
            className={classes.form_input}
            name="floor_number"
            type="number"
            placeholder="Floor Number"
            value={roomForm.floor_number}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.button_group}>
          {editingRoomId ? (
            <>
              <button className={classes.btn_primary} onClick={updateRoom}>
                Update Room
              </button>
              <button className={classes.btn_secondary} onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className={classes.btn_primary} onClick={addRoom}>
              Add Room
            </button>
          )}
        </div>
      </div>
      <div className={classes.existing_rooms}>
        <h3>Existing Rooms</h3>
        {hotel.rooms.map((room) => (
          <div key={room.id} className={classes.room_card}>
            <img
              className={classes.room_image}
              src={room.image_url}
              alt={room.type}
            />
            {/* this is added by designer  */}
            {/* <div className={classes.room-info}>
              <div className={classes.availability_status available}>
                {room.available ? "Available" : "Unavailable"}
              </div> */}
            <h3 className={classes.room_type}>{room.type}</h3>
            <p className={classes.room_price}>{room.price} ETB/Night</p>
            <p className={classes.room_details}>
              Room: {room.room_number || "N/A"}
            </p>
            <p className={classes.room_details}>
              Floor: {room.floor_number || "N/A"}
            </p>

            <div className={classes.room_actions}>
              <button
                className={classes.btn_secondary}
                onClick={() => startEdit(room)}
              >
                Edit
              </button>
              <button
                className={classes.btn_danger}
                onClick={() => deleteRoom(room.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {/* <BookingTracker hotelId={hotel.id} /> */}
      </div>
    </div>
  );
}

export default RoomManagement;

// // src/components/RoomManager.js..old not include edit  button
// import React, { useEffect, useState } from "react";
// import API from "../api";
// import { useParams } from "react-router-dom";

// function RoomManagement() {
//   const { id } = useParams();
//   const [hotel, setHotel] = useState(null);
//   const [roomForm, setRoomForm] = useState({
//     type: "",
//     price: "",
//     image: "",
//   });

//   useEffect(() => {
//     API.get(`/hotels/${id}`).then((res) => setHotel(res.data));
//   }, [id]);

//   const handleInputChange = (e) => {
//     setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
//   };

//   const addRoom = () => {
//     API.post(`/hotels/${id}/rooms`, roomForm).then((res) => {
//       setHotel(res.data);
//       setRoomForm({ type: "", price: "", image: "" });
//     });
//   };

//   const deleteRoom = (roomId) => {
//     API.delete(`/hotels/${id}/rooms/${roomId}`).then((res) =>
//       setHotel(res.data)
//     );
//   };

//   if (!hotel) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Manage Rooms for {hotel.name}</h2>
//       <div>
//         <input
//           name="type"
//           placeholder="Room Type"
//           value={roomForm.type}
//           onChange={handleInputChange}
//         />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={roomForm.price}
//           onChange={handleInputChange}
//         />
//         <input
//           name="image"
//           placeholder="Image Path"
//           value={roomForm.image}
//           onChange={handleInputChange}
//         />
//         <button onClick={addRoom}>Add Room</button>
//       </div>

//       <h3>Existing Rooms</h3>
//       {hotel.rooms.map((room) => (
//         <div key={room.id}>
//           <p>
//             {room.type} - {room.price} ETB
//           </p>
//           <button onClick={() => deleteRoom(room.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RoomManagement;

// // src/components/RoomManagement.js
// import React, { useState } from "react";
// import { updateRoomAvailability } from "../api";

// const RoomManagement = ({ hotelId, rooms }) => {
//   const [status, setStatus] = useState(null);

//   const handleUpdateAvailability = async (roomId, available) => {
//     try {
//       await updateRoomAvailability(hotelId, roomId, available);
//       setStatus(
//         `Room ${available ? "Available" : "Unavailable"} updated successfully.`
//       );
//     } catch (error) {
//       console.error("Error updating room availability", error);
//       setStatus("Error updating availability.");
//     }
//   };

//   return (
//     <div>
//       <h3>Manage Rooms</h3>
//       {status && <p>{status}</p>}
//       <table>
//         <thead>
//           <tr>
//             <th>Room Number</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Availability</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td>{room.number}</td>
//               <td>{room.type}</td>
//               <td>{room.price}</td>
//               <td>{room.available ? "Available" : "Not Available"}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     handleUpdateAvailability(room.id, !room.available)
//                   }
//                 >
//                   {room.available ? "Mark Unavailable" : "Mark Available"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RoomManagement;
