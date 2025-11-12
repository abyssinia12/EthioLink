// EditTourPackage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../CarRental/CustomerSide/supabaseClient";
import classes from "./EditTour.module.css";
import { useParams, useNavigate } from "react-router-dom";


function EditTourPackage({  onDone }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
  });
  const { tourId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load existing tour data
  useEffect(() => {
    const fetchTour = async () => {
      const { data, error } = await supabase
        .from("tour_packages")
        .select("*")
        .eq("id", tourId)
        .single();

      if (error) {
        setError("Failed to load tour package.");
        console.error(error);
      } else {
        setForm(data);
      }
      setLoading(false);
    };

    fetchTour();
  }, [tourId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("tour_packages")
      .update({
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        image_url: form.image_url,
        category: form.category,
      })
      .eq("id", tourId);

    if (error) {
      alert("Failed to update tour package.");
      console.error(error);
    } else {
      alert("Tour package edited successfully.");
      onDone();
    }
  };

  const save = () => {
   
    navigate("/tour/manage-tourPackage");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={classes.EditTourPackage}>
     
      <div className={classes.header}>Edit Tour Package</div>
      <form onSubmit={handleUpdate} className={classes.editTourForm}>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Tour Titel</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className={classes.formInput}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className={`${classes.formInput} ${classes.formTextarea}`}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}> Price ETB</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            min="0"
            className={classes.formInput}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Image URL</label>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="Enter Image URL"
            className={classes.formInput}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`${classes.formInput} ${classes.formSelect}`}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Birding">Birding</option>
            <option value="Cultural">Cultural</option>
            <option value="Religious">Religious</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Photographic">Photographic</option>
          </select>
        </div>

        <div className={classes.formActions}>
          
          <button onClick={save} className={classes.saveButton} type="submit">
            Save and Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTourPackage;
