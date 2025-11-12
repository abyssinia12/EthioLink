import React, { useEffect, useState } from "react";
import classes from "../../../../Pages/Dashboard/TourOfficer/Car/TourCar.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
// import ManageCarPage from "./ManageCarPage";

const CarTable = ({ cars, onEditSave, onDelete }) => {

  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (car) => {
    setEditId(car.id);
    setEditFormData({ ...car });
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEditSave(editId, editFormData); // call parent to update backend + state
    setEditId(null);
  };

  return (
    <table className={classes.car_table}>
      <thead>
        <tr className={classes.header}>
          <th className={classes.cartable_header}>Model</th>
          <th className={classes.cartable_header}>Size</th>
          <th className={classes.cartable_header}>Seats</th>
          <th className={classes.cartable_header}>Price</th>
          <th className={classes.cartable_header}>Location</th>
          <th className={classes.cartable_header}>available</th>
          <th className={classes.cartable_header}>unavailable_dates</th>
          <th className={classes.cartable_header}>start_date</th>
          <th className={classes.cartable_header}>end_date</th>
          <th className={classes.cartable_header}>Image</th>
          <th className={classes.cartable_header}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id} className={classes.table_row}>
            {editId === car.id ? (
              <>
                <td>
                  <input
                    name="car_model"
                    value={editFormData.car_model}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    name="car_size"
                    value={editFormData.car_size}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    name="seats"
                    value={editFormData.seats}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    name="price"
                    value={editFormData.price}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    name="location"
                    value={editFormData.location}
                    onChange={handleInputChange}
                  />
                </td>

                <td>
                  <input
                    name="available"
                    value={editFormData.available}
                    onChange={handleInputChange}
                  />
                </td>

                <td>
                  <input
                    name="unavailable_dates"
                    value={editFormData.unavailable_dates}
                    onChange={handleInputChange}
                  />
                </td>

                <td>
                  <input
                    name="start_date"
                    value={editFormData.start_date}
                    onChange={handleInputChange}
                  />
                </td>

                <td>
                  <input
                    name="end_date"
                    value={editFormData.end_date}
                    onChange={handleInputChange}
                  />
                </td>

                <td>
                  <input
                    name="image_url"
                    value={editFormData.image_url}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button className={classes.edit_btn} onClick={handleSave}>
                    Save
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className={classes.table_data}>{car.car_model}</td>
                <td className={classes.table_data}>{car.car_size}</td>
                <td className={classes.table_data}>{car.seats}</td>
                <td className={classes.table_data}>{car.price}</td>
                <td className={classes.table_data}>{car.location}</td>

                {/* <td className={classes.table_data}>{car.available}</td> */}
                <td className={classes.table_data}>
                  {car.available ? "Yes" : "No"}
                </td>

                <td className={classes.table_data}>{car.unavailable_dates}</td>
                <td className={classes.table_data}>{car.start_date}</td>
                <td className={classes.table_data}>{car.end_date}</td>

                <td className={classes.table_data}>
                  <img src={car.image_url} alt={car.car_model} />
                </td>
                <td className={classes.table_data_actions}>
                  <button
                    className={classes.edit_btn}
                    onClick={() => handleEditClick(car)}
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    className={classes.delete_btn}
                    onClick={() => onDelete(car.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
