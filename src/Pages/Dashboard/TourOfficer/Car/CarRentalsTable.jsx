import React, { useEffect, useState } from "react";
import { supabase } from "../../../CarRental/CustomerSide/supabaseClient";

import classes from './TourCar.module.css'

export default function CarRentalsTable() {
  const [rentals, setRentals] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editModel, setEditModel] = useState("");
  

  const fetchRentals = async () => {
    const { data, error } = await supabase
      .from("car_rentals_officer")
      .select("*")
      //new
      
      
    if (!error) setRentals(data);
  };
  useEffect(() => {
    fetchRentals();
    
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("car_rentals_officer").delete().eq("id", id);
    fetchRentals();
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "posted" ? "unposted" : "posted";
    await supabase
      .from("car_rentals_officer")
      .update({ status: newStatus })
      .eq("id", id);
    fetchRentals();
  };

  const handleEdit = (id, model) => {
    setEditingId(id);
    setEditModel(model);
  };

  const handleSaveEdit = async (id) => {
    await supabase
      .from("car_rentals_officer")
      .update({ model: editModel })
      .eq("id", id);
    setEditingId(null);
    fetchRentals();
  };
  return (
    <div className={classes.table_container}>
      <table className={classes.car_rental_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Car Size</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.id}</td>
              <td>
                {editingId === rental.id ? (
                  <input
                    value={editModel}
                    onChange={(e) => setEditModel(e.target.value)}
                  />
                ) : (
                  rental.Model
                )}
              </td>
              <td>{rental.carsize}</td>
              <td>{rental.seats}</td>
              <td>{rental.totalPrice}</td>
              <td>
                {rental.imageUrl ? (
                  <img src={rental.imageUrl} alt="car" width="100" />
                ) : (
                  "No image"
                )}
              </td>
              <td>{rental.status}</td>
              <td>
                {editingId === rental.id ? (
                  <button onClick={() => handleSaveEdit(rental.id)}>
                    Save
                  </button>
                ) : (
                  <button
                    className={classes.edit_btn}
                    style={{ backgroundColor: "blue", color: "white" }}
                    onClick={() => handleEdit(rental.id, rental.Model)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={delete_btn}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleDelete(rental.id)}
                >
                  Delete
                </button>
                <button
                  className={classes.unpost_btn}
                  style={{ backgroundColor: "orange", color: "white" }}
                  onClick={() => handleToggleStatus(rental.id, rental.status)}
                >
                  {rental.status === "posted" ? "Unpost" : "Post"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


