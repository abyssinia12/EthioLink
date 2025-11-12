import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Tourpackage.module.css";
import  Layout  from '../../Components/LayOut/LayOut';

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    number_of_travelers: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tours/${id}`);
        const data = await res.json();
        setTour(data);
      } catch (error) {
        console.error("Failed to fetch tour:", error);
      }
    };
    fetchTour();
  }, [id]);

  // const handleBook = () => {
  //   navigate(`/tours/book/${id}`);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      ...formData,
      tour_package_id: id,
    };

    try {
      const res = await fetch("http://localhost:5000/api/tours/book/payment", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      }
    );

      const { checkout_url } = res.data;
      checkout_url
        ? (window.location.href = checkout_url)
        : setMessage("Booking created, but payment URL not found.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking or payment failed.");
    }
  };

  if (!tour) return <p>Loading...</p>;

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.leftColumn}>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <img
              className={classes.tourImage}
              src={tour.image_url}
              alt={tour.title}
            />
          </div>

          <h1 className={classes.title}>{tour.title}</h1>
          <div className={classes.locationDaysPrice}>
            {/* <span>📍 {tour.location}</span> */}
            {/* <span>⏱️ {tour.days} days</span> */}
            <span className={classes.price}>Price:{tour.price} ETB</span>
          </div>

          <p className={classes.overview}>{tour.description}</p>

          {tour.highlights && (
            <>
              <h2>Key Highlights</h2>
              <ul className={classes.cardGrid}>
                {tour.highlights.map((item, i) => (
                  <li key={i} className={classes.highlightCard}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {tour.included && (
            <>
              <h2>What's Included</h2>
              <div className={classes.includedGrid}>
                {tour.included.map((item, i) => (
                  <div key={i} className={classes.includedCard}>
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}

          {tour.itinerary && (
            <>
              <h2>Detailed Itinerary</h2>
              <div className={classes.itinerary}>
                {tour.itinerary.map((step, i) => (
                  <div key={i} className={classes.itineraryItem}>
                    <div className={classes.time}>{step.time}</div>
                    <div>{step.activity}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={classes.rightColumn}>
          {/* <h2>Book Tour: {tour.title}</h2> */}
          <form className={classes.bookingForm} onSubmit={handleSubmit}>
            {/* <h3 className={classes.form_section_heading}>
              Personal Information
            </h3> */}

            <div className={classes.form_group_required}>
              <label>First Name</label>
              <input
                name="first_name"
                // placeholder="First Name"
                required
                onChange={handleChange}
              />
            </div>

            <div className={classes.form_group_required}>
              <label>Last Name</label>
              <input
                name="last_name"
                // placeholder="Last Name"
                required
                onChange={handleChange}
              />
            </div>

            <div className={classes.form_group_required}>
              <label>Email</label>
              <input
                name="email"
                // placeholder="Email"
                type="email"
                required
                onChange={handleChange}
              />
            </div>

            <div className={classes.form_group_required}>
              <label>Phone Number</label>
              <input
                name="phone_number"
                // placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
            <h3 className={classes.form_section_heading}>Booking Details</h3>

            <div className={classes.form_group_required}>
              <label>Number of Travelers</label>
              <input
                name="number_of_travelers"
                // placeholder="Number of Travelers"
                type="number"
                min="1"
                required
                onChange={handleChange}
              />
            </div>

            <button className={classes.paymentBtn} type="submit">
              Proceed to Payment
            </button>
          </form>

        
        </div>
      </div>
    </Layout>
  );
}


  
    /* <form className={classes.bookingForm}>
          <h2>Book Now</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Country" required />
          <input type="date" required />
          <input type="number" placeholder="Group Size" required />
          <button type="button" onClick={handleBook}>
            Book Now
          </button>
        </form> */
  

