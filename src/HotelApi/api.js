// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/officer", // Adjust the baseURL as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
