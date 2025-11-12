// import { useEffect, useState } from "react";
// import axios from "axios";
// import TourCard from "../../Components/TourCard/TourCard";

// export default function TourHome() {
//   const [tours, setTours] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/tours")
//       .then((res) => setTours(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>Tour Packages</h1>
//       <div className="grid">
//         {tours.map((tour) => (
//           <TourCard key={tour.id} tour={tour} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "../../Components/TourCard/TourCard";
import classes from './Tourpackage.module.css'
import { supabase } from "../CarRental/CustomerSide/supabaseClient";
import Layout from "../../Components/LayOut/LayOut";

export default function TourHome() {
  const [tours, setTours] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/tours")
  //     .then((res) => setTours(res.data));
  // }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const query = supabase.from("tour_packages").select("*");

      if (selectedCategory !== "all") {
        query.ilike("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) console.error("Error fetching tours:", error);
      else setTours(data);
    };

    fetchTours();
  }, [selectedCategory]);

  return (
    <Layout>
      <div className={classes.TourHome}>
        <h1>Tour Packages</h1>

        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option className={classes.option} value="all">
            All
          </option>
          <option className={classes.option} value="birding">
            Birding
          </option>
          <option className={classes.option} value="cultural">
            Cultural
          </option>
          <option className={classes.option} value="religious">
            Religious
          </option>
          <option className={classes.option} value="wildlife">
            Wildlife and Nature
          </option>
          <option className={classes.option} value="photographic">
            Photographic
          </option>
        </select>

        <div className={classes.grid}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
