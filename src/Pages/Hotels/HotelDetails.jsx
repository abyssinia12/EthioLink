import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./Hotel.module.css";
import { useNavigate } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import { ChevronLeft } from "lucide-react";

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: null,
  });
  const [idDocument, setIdDocument] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/customer/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Error fetching hotel:", err));
  }, [id]);

  const startBooking = (roomId) => {
    setBookingInfo({ fullName: "", email: "", phone: "", roomId });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const submitBooking = async (e) => {
    e.preventDefault();
    const { roomId, fullName, email, phone } = bookingInfo;

    try {
      let idDocumentBase64 = null;
      let idDocumentName = null;
      let idDocumentType = null;
      if (idDocument) {
        idDocumentBase64 = await toBase64(idDocument);
        idDocumentName = idDocument.name;
        idDocumentType = idDocument.type;
      }
      const res = await axios.post(
        `http://localhost:5000/api/customer/hotels/${id}/book`,
        {
          roomId,
          fullName,
          email,
          phone,
          idDocumentBase64,
          idDocumentName,
          idDocumentType,
        },
        { withCredentials: true }
      );

      const { checkout_url } = res.data;
      checkout_url
        ? (window.location.href = checkout_url)
        : setMessage("Booking created, but payment URL not found.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking or payment failed.");
    }
  };

  if (!hotel) return <p>Loading...</p>;

  const handleBack = async () => {
    navigate("/HotelList");
  };
  const view = async () => {
    navigate(`/roomDetail/${hotel.id}`);
  };

  const getUnsplashSrc = (id, w = 900, h = 600) =>
    `https://source.unsplash.com/${id}/${w}x${h}`;

  const resolveRoomImage = (hotelName, roomType, fallback) => {
    const normalizedType = (roomType || "").toLowerCase();
    const isExecutive = normalizedType.includes("executive");
    const isSuite = normalizedType.includes("suite");
    const isFamily = normalizedType.includes("family");

    const map = {
      "SouthStar Hotel": {
        executive: getUnsplashSrc("Yrxr3bsPdS0"), // white bed linen with throw pillows
        suite: getUnsplashSrc("Yrxr3bsPdS0"),
        family: getUnsplashSrc("gwV9eklemSg"), // bed beside window
      },
      "Rori Hotel": {
        executive: getUnsplashSrc("NxMuc8XaLZU"), // large bed next to window
        suite: getUnsplashSrc("NxMuc8XaLZU"),
        family: getUnsplashSrc("_Swg04CP0bU"), // white bed linen on bed
      },
      "Haile resort": {
        executive: getUnsplashSrc("gwV9eklemSg"),
        suite: getUnsplashSrc("gwV9eklemSg"),
        family: getUnsplashSrc("Yrxr3bsPdS0"),
      },
    };

    const hotelMap = map[hotelName];
    if (!hotelMap) return fallback;
    if (isExecutive || isSuite)
      return hotelMap.executive || hotelMap.suite || fallback;
    if (isFamily) return hotelMap.family || fallback;
    return fallback;
  };

  return (
    <LayOut>
      <button onClick={handleBack}>
        <ChevronLeft color="gray" />
      </button>
      <div className={classes.detail_container}>
        <h2>{hotel.name}</h2>
        <img
          className={classes.hotel_image}
          src={hotel.image_url}
          alt={hotel.name}
        />
        <p className={classes.location}>Location: {hotel.location}</p>

        <h3>Rooms</h3>
        <div className={classes.roomCard}>
          {hotel.rooms.map((room) => (
            <div key={room.id} className={classes.room_container}>
              <div className={classes.room_details}>
                <img
                  className={classes.room_image}
                  src={resolveRoomImage(hotel.name, room.type, room.image_url)}
                  alt={room.type}
                />
                <div className={classes.room_info}>
                  <p className={classes.room_type}>{room.type}</p>
                  <p>Type: {room.type}</p>
                  <p>Price: {room.price} Per Night</p>
                  <p>Room Number: {room.room_number || "N/A"}</p>
                  <p>Floor: {room.floor_number || "N/A"}</p>
                  {/* <p className={classes.availability}>
                Status: {room.available ? "Available" : "Not Available"}
              </p> */}
                  <p
                    className={
                      room.available
                        ? classes.availability
                        : `${classes.availability} ${classes.not_available}`
                    }
                  >
                    {room.available ? "Available" : "Not Available"}
                  </p>

                  {room.available && bookingInfo.roomId !== room.id && (
                    <>
                      <button
                        className={classes.book_button}
                        onClick={() => startBooking(room.id)}
                      >
                        Book Room
                      </button>
                    </>
                  )}
                  {/* <button
                  className={classes.book_button}
                  onClick={view}
                >
                  View room detail
                </button> */}
                </div>
              </div>

              {bookingInfo.roomId === room.id && (
                <form className={classes.booking_form} onSubmit={submitBooking}>
                  <input
                    className={classes.input_field}
                    type="text"
                    placeholder="Full Name"
                    value={bookingInfo.fullName}
                    onChange={(e) =>
                      setBookingInfo({
                        ...bookingInfo,
                        fullName: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className={classes.input_field}
                    type="email"
                    placeholder="Email"
                    value={bookingInfo.email}
                    onChange={(e) =>
                      setBookingInfo({ ...bookingInfo, email: e.target.value })
                    }
                    required
                  />
                  <input
                    className={classes.input_field}
                    type="tel"
                    placeholder="Phone Number"
                    value={bookingInfo.phone}
                    onChange={(e) =>
                      setBookingInfo({ ...bookingInfo, phone: e.target.value })
                    }
                    required
                  />
                  <label style={{ fontSize: 14, color: "#555" }}>
                    Upload your scanned ID card
                  </label>
                  <input
                    className={classes.input_field}
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                  />
                  <div className={classes.button_group}>
                    <button type="submit" className={classes.confirm_button}>
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      className={classes.cancel_button}
                      onClick={() =>
                        setBookingInfo({ ...bookingInfo, roomId: null })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>

        {message && <div className={classes.message}>{message}</div>}
      </div>
    </LayOut>
  );
}
