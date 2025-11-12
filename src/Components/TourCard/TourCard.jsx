// import { Link } from "react-router-dom";

// export default function TourCard({ tour }) {
//   return (
//     <div className="card">
//       <img src={tour.image_url} alt={tour.title} />
//       <h2>{tour.title}</h2>
//       <p>{tour.category}</p>
//       <Link to={`/tour/${tour.id}`}>Details</Link>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import classes from '../../Pages/Tours/Tourpackage.module.css'
// import SpecialInterestForm from "../../Pages/Tours/SpecialInterestForm";


export default function TourCard({ tour }) {

  //  
  return (
    <div>
      <div className={classes.card}>
        <img src={tour.image_url} alt={tour.title} />
        <h2>{tour.title}</h2>
        <p>{tour.category}</p>
        <p>Price: ETB{tour.price}</p>
        <Link to={`/tours/${tour.id}`}>Details</Link>
      </div>
      <div></div>
    </div>
  );
}

