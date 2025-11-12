// import { Link } from "react-router-dom";
// import classes from "../Header/Header.module.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../context/UserContext";
// import { useTranslation } from "react-i18next";

// const Header = () => {
//   const navigate = useNavigate();
//   const { user, setUser } = useUser();
//   const { t, i18n } = useTranslation();
//   const [showPackages, setShowPackages] = useState(false);
//   const [showCorporate, setShowCorporate] = useState(false);
//   const [showLanguage, setShowLanguage] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const handleLogout = () => {
//     setUser(null); // remove user from context
//     navigate("/"); // go to landing page
//   };

//   const Onlogin = () => {
//     navigate(`/login`);
//   };

//   const togglePackages = () => {
//     setShowPackages(!showPackages);
//     setShowCorporate(false);
//     setShowLanguage(false);
//   };

//   const toggleCorporate = () => {
//     setShowCorporate(!showCorporate);
//     setShowPackages(false);
//     setShowLanguage(false);
//   };

//   const toggleLanguage = () => {
//     setShowLanguage(!showLanguage);
//     setShowPackages(false);
//     setShowCorporate(false);
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setShowLanguage(false);
//   };

//   return (
//     <header className={classes.header}>
//       <div className={classes.headerTitles}>
//         <div className={classes.logo_container}>
//           <img
//             src="/logo2.png"
//             alt="Ethio-Link Logo"
//             className={classes.logo_image}
//           />
//         </div>
//         <h1 className={classes.header_second}>{t("header.subtitle")}</h1>
//       </div>

//       <nav className={classes.nav_links}>
//         <Link to="/">{t("header.home")}</Link>
//         {/* <Link to="/destinations">Destinations</Link> */}

//         {/* Travel Packages Dropdown */}
//         <div className={classes.dropdown_container}>
//           <button onClick={togglePackages} className={classes.dropdown_button}>
//             {t("header.travelPackages")}
//           </button>
//           {showPackages && (
//             <div className={classes.dropdown_menu}>
//               <Link to="/tours" className={classes.menu_item}>
//                 {t("tours.all")}
//               </Link>
//               <Link to="/tours/category/birding" className={classes.menu_item}>
//                 {t("tours.birding")}
//               </Link>
//               <Link to="/tours/category/cultural" className={classes.menu_item}>
//                 {t("tours.cultural")}
//               </Link>
//               <Link
//                 to="/tours/category/religious"
//                 className={classes.menu_item}
//               >
//                 {t("tours.religious")}
//               </Link>
//               <Link to="/tours/category/wildlife" className={classes.menu_item}>
//                 {t("tours.wildlife")}
//               </Link>
//               <Link
//                 to="/tours/category/photographic"
//                 className={classes.menu_item}
//               >
//                 {t("tours.photographic")}
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Corporate Services Dropdown */}
//         <div className={classes.dropdown_container}>
//           <button onClick={toggleCorporate} className={classes.dropdown_button}>
//             {t("header.corporateServices")}
//           </button>
//           {showCorporate && (
//             <div className={classes.dropdown_menu}>
//               <Link to="/HotelList" className={classes.menu_item}>
//                 {t("services.hotelBooking")}
//               </Link>
//               <Link to="/carRental" className={classes.menu_item}>
//                 {t("services.carRentals")}
//               </Link>
//             </div>
//           )}
//         </div>

//         <Link to="/about-us">{t("header.aboutUs")}</Link>
//         <Link to="/contact-us">{t("header.contactUs")}</Link>

//         {/* Language Switcher */}
//         <div className={classes.dropdown_container}>
//           <button onClick={toggleLanguage} className={classes.dropdown_button}>
//             {i18n.language === "am" ? "አማርኛ" : "EN"}
//           </button>
//           {showLanguage && (
//             <div className={classes.dropdown_menu}>
//               <button
//                 onClick={() => changeLanguage("en")}
//                 className={classes.menu_item}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   width: "100%",
//                   textAlign: "left",
//                   cursor: "pointer",
//                 }}
//               >
//                 {t("language.english")}
//               </button>
//               <button
//                 onClick={() => changeLanguage("am")}
//                 className={classes.menu_item}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   width: "100%",
//                   textAlign: "left",
//                   cursor: "pointer",
//                 }}
//               >
//                 {t("language.amharic")}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Authenticated user view */}
//         {user && user.role === "customer" && (
//           <>
//             <Link to="/my-bookings">{t("header.myBooking")}</Link>
//             <span className={classes.username}>
//               {t("header.hello")},{" "}
//               {user.username || user.email?.split("@")[0] || t("common.user")}
//             </span>
//             <button onClick={handleLogout} className={classes.login_btn}>
//               {t("header.logout")}
//             </button>
//           </>
//         )}
//       </nav>
//       {/* If user is not logged in */}
//       {!user && (
//         <button onClick={Onlogin} className={classes.login_btn}>
//           {t("header.login")}
//         </button>
//       )}
//     </header>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import classes from "../Header/Header.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { t, i18n } = useTranslation();
  const [showPackages, setShowPackages] = useState(false);
  const [showCorporate, setShowCorporate] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleLogout = () => {
    setUser(null); // remove user from context
    navigate("/"); // go to landing page
  };

  const Onlogin = () => {
    navigate(`/login`);
  };

  const togglePackages = () => {
    setShowPackages(!showPackages);
    setShowCorporate(false);
    setShowLanguage(false);
  };

  const toggleCorporate = () => {
    setShowCorporate(!showCorporate);
    setShowPackages(false);
    setShowLanguage(false);
  };

  const toggleLanguage = () => {
    setShowLanguage(!showLanguage);
    setShowPackages(false);
    setShowCorporate(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguage(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerTitles}>
        <div className={classes.logo_container}>
          <img
            src="/logo2.png"
            alt="Ethio-Link Logo"
            className={classes.logo_image}
          />
        </div>
        <h1 className={classes.header_second}>{t("header.subtitle")}</h1>
      </div>

      <nav className={classes.nav_links}>
        <Link to="/">{t("header.home")}</Link>

        {/* Travel Packages Dropdown */}
        <div className={classes.dropdown_container}>
          <button onClick={togglePackages} className={classes.dropdown_button}>
            {t("header.travelPackages")}
          </button>
          {showPackages && (
            <div className={classes.dropdown_menu}>
              <Link to="/tours" className={classes.menu_item}>
                {t("tours.all")}
              </Link>
              <Link to="/tours/category/birding" className={classes.menu_item}>
                {t("tours.birding")}
              </Link>
              <Link to="/tours/category/cultural" className={classes.menu_item}>
                {t("tours.cultural")}
              </Link>
              <Link
                to="/tours/category/religious"
                className={classes.menu_item}
              >
                {t("tours.religious")}
              </Link>
              <Link to="/tours/category/wildlife" className={classes.menu_item}>
                {t("tours.wildlife")}
              </Link>
              <Link
                to="/tours/category/photographic"
                className={classes.menu_item}
              >
                {t("tours.photographic")}
              </Link>
            </div>
          )}
        </div>

        {/* Corporate Services Dropdown */}
        <div className={classes.dropdown_container}>
          <button onClick={toggleCorporate} className={classes.dropdown_button}>
            {t("header.corporateServices")}
          </button>
          {showCorporate && (
            <div className={classes.dropdown_menu}>
              <Link to="/HotelList" className={classes.menu_item}>
                {t("services.hotelBooking")}
              </Link>
              <Link to="/carRental" className={classes.menu_item}>
                {t("services.carRentals")}
              </Link>
            </div>
          )}
        </div>

        <Link to="/about-us">{t("header.aboutUs")}</Link>
        <Link to="/contact-us">{t("header.contactUs")}</Link>

        {/* Language Switcher */}
        <div className={classes.dropdown_container}>
          <button onClick={toggleLanguage} className={classes.dropdown_button}>
            {i18n.language === "am"
              ? "አማርኛ"
              : i18n.language === "zh-CN"
              ? "中文"
              : i18n.language === "es"
              ? "Español"
              : i18n.language === "ar"
              ? "العربية"
              : "EN"}
          </button>
          {showLanguage && (
            <div className={classes.dropdown_menu}>
              <button
                onClick={() => changeLanguage("en")}
                className={classes.menu_item}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {t("language.english")}
              </button>
              <button
                onClick={() => changeLanguage("am")}
                className={classes.menu_item}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {t("language.amharic")}
              </button>
              <button
                onClick={() => changeLanguage("zh-CN")}
                className={classes.menu_item}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {t("language.chinese")}
              </button>
              <button
                onClick={() => changeLanguage("es")}
                className={classes.menu_item}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {t("language.spanish")}
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={classes.menu_item}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {t("language.arabic")}
              </button>
            </div>
          )}
        </div>

        {/* Authenticated user view */}
        {user && user.role === "customer" && (
          <>
            <Link to="/my-bookings">{t("header.myBooking")}</Link>
            <span className={classes.username}>
              {t("header.hello")},{" "}
              {user.username || user.email?.split("@")[0] || t("common.user")}
            </span>
            <button onClick={handleLogout} className={classes.login_btn}>
              {t("header.logout")}
            </button>
          </>
        )}
      </nav>

      {/* If user is not logged in */}
      {!user && (
        <button onClick={Onlogin} className={classes.login_btn}>
          {t("header.login")}
        </button>
      )}
    </header>
  );
};

export default Header;
