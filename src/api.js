// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});





export default API;





// const API_URL = "http://localhost:5000/api/officer"; // Replace with your backend URL

// export const fetchHotelDetails = (hotelId) => {
//   return axios.get(`${API_URL}/hotels/${hotelId}`);
// };

// export const updateRoomAvailability = (hotelId, roomId, available) => {
//   return axios.put(`${API_URL}/hotels/${hotelId}/rooms/${roomId}`, {
//     available,
//   });
// };

// export const fetchBookings = (hotelId) => {
//   return axios.get(`${API_URL}/hotels/${hotelId}/bookings`);
// };

// export const confirmBooking = (hotelId, roomId, tx_ref) => {
//   return axios.post(
//     `${API_URL}/hotels/${hotelId}/rooms/${roomId}/confirm-booking`,
//     { tx_ref }
//   );
// };

// export const verifyPayment = (tx_ref) => {
//   return axios.post(`${API_URL}/payment/verify`, { tx_ref });
// };
