import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../CarRental/CustomerSide/supabaseClient";
import classes from "../../Pages/Tours/Tourpackage.module.css";
import Layout from "../../Components/LayOut/LayOut";

export default function TourCategory() {
  const { category } = useParams();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchCategoryTours = async () => {
      const { data, error } = await supabase
        .from("tour_packages")
        .select("*")
        .ilike("category", category); // case-insensitive match

      if (error) console.error(error);
      else setTours(data);
    };

    fetchCategoryTours();
  }, [category]);

  return (
    <Layout>
      <div className={classes.catagoryTitel}>
      <h2>{category} Tours</h2>
      {tours.length === 0 ? (
        <p>No tours found.</p>
      ) : (
        <div className={classes.cardCatagory}>
          {tours.map((tour) => (
            <div
              key={tour.id}
              className={classes.card}
            >
              <img src={tour.image_url} alt={tour.title}  />
              <h3>{tour.title}</h3>
              <p>Price: ETB{tour.price}</p>
              <Link to={`/tours/${tour.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
     
    </div>
    </Layout>
    
  );
}
