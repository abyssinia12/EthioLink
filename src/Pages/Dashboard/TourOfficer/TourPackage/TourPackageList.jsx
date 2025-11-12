import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Manage.module.css'

export default function TourPackageList() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/tours")
      .then((res) => res.json())
      .then(setTours)
      .catch(console.error);
  }, []);

  const deleteTour = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setTours(tours.filter((t) => t.id !== id));
  };

  return (
    <div className={classes.tour_list_container}>
      <h2 className={classes.tour_list_title}>Tour Packages</h2>
      <div className={classes.card_grid}>
        {tours.map((t) => (
          <div className={classes.card} key={t.id}>
            {t.image_url && (
              <img
                src={t.image_url}
                alt={t.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}

            {/* {t.image && (
              <img
                src={t.image_url}
                alt={t.title}
              />
            )} */}

            <h3 className={classes.card_title}>{t.title}</h3>
            <p className={classes.card_price}>Price: ETB {t.price}</p>

            <div className={classes.tour_buttons}>
              <button
                className={classes.view_button}
                onClick={() => navigate(`/tours/${t.id}/bookings`)}
              >
                
                View Bookings
              </button>
              <button
                className={classes.edit_button}
                onClick={() => navigate(`/edit-tour/${t.id}`)}
              >
                Edit
              </button>

              <button
                className={classes.delete_button}
                onClick={() => deleteTour(t.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    // <div className={classes.tour_list_container}>
    //   <h2 className={classes.tour_list_title}>Tour Packages</h2>
    //   <ul className={classes.tour_list}>
    //     {tours.map((t) => (
    //       <li className={classes.tour_item} key={t.id}>
    //         <span className={classes.tour_info}>
    //           {t.title} - ${t.price}
    //         </span>

    //         <div className={classes.tour_buttons}>
    //           <button
    //             className={classes.edit_button}
    //             onClick={() => navigate(`/edit-tour/${t.id}`)}
    //           >
    //             Edit
    //           </button>
    //           <button
    //             className={classes.delete_button}
    //             onClick={() => deleteTour(t.id)}
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
