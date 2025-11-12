import { useState } from "react";
import classes from "./EditTour.module.css";

export default function AddTourPackageForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Birding",
    image_url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Tour added successfully!");
    } else {
      alert("Failed to add tour.");
    }
  };

  return (
    <div className={classes.AddTourPackage}>
      <div className={classes.Addheader}>Add Tour Package</div>
      <form className={classes.editTourForm} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Tour Titel</label>
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Price ETB</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={classes.formLabel}>category</label>
          <select
            name="category"
            onChange={handleChange}
            className={`${classes.formInput} ${classes.formSelect}`}
          >
            <option>Birding</option>
            <option>Cultural</option>
            <option>Religious</option>
            <option>Wildlife</option>
            <option>Photographic</option>
          </select>
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Image URL</label>
          <input
            name="image_url"
            placeholder="Image URL"
            onChange={handleChange}
          />
        </div>

        <div className={classes.formActions}>
          <button className={classes.saveButton} type="submit">
            Add Tour
          </button>
        </div>
      </form>
    </div>
  );
}
