import React, { useEffect, useState } from "react";
import { supabase } from "../CarRental/CustomerSide/supabaseClient";
// import HeroSection from "../../Components/HeroSection/HeroSection";
import TourCard from "../../Components/TourCard/TourCard";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import classes from "./home.module.css";
import SpecialInterestForm from "../Tours/SpecialInterestForm";
import axios from "axios";
import Carasul from "../../Components/Carasul/Carasul";
import { ThumbsUp, BadgeDollarSign, ShieldCheck, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [tours, setTours] = useState([]);
  const [showInterestForm, setShowInterestForm] = useState(false);

  const interest = () => {
    setShowInterestForm((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/popular`)
      .then((res) => setTours(res.data))
      .catch((err) => console.error("Failed to fetch popular tour", err));
  }, []);

  return (
    <div>
      <Header />
      <Carasul />
      <div className={classes.allHome}>
        {/* why choose section  */}
        <section className={classes.why_choose_us_section}>
          <div className={classes.container}>
            <h2 className={classes.why_choose_us_title}>
              {t("home.whyChooseUs.title")}
            </h2>
            <div className={classes.why_choose_us_underline}></div>
            <div className={classes.feature_cards_grid}>
              {/* Card 1: Expert Local Guides */}
              <div className={classes.feature_card}>
                <div className={classes.card_icon}>
                  <Globe color="orange" size={45} />
                </div>
                <h3>{t("home.whyChooseUs.expertGuides.title")}</h3>
                <p>{t("home.whyChooseUs.expertGuides.description")}</p>
              </div>

              {/* Card 2: Safe & Secure */}
              <div className={classes.feature_card}>
                <div className={classes.card_icon}>
                  <ShieldCheck color="orange" size={45} />
                </div>
                <h3>{t("home.whyChooseUs.safeSecure.title")}</h3>
                <p>{t("home.whyChooseUs.safeSecure.description")}</p>
              </div>

              {/* Card 3: Best Price Guarantee */}
              <div className={classes.feature_card}>
                <div className={classes.card_icon}>
                  <BadgeDollarSign color="orange" size={45} />
                </div>
                <h3>{t("home.whyChooseUs.bestPrice.title")}</h3>
                <p>{t("home.whyChooseUs.bestPrice.description")}</p>
              </div>

              {/* Card 4: Satisfaction Guaranteed */}
              <div className={classes.feature_card}>
                <div className={classes.card_icon}>
                  <ThumbsUp color="orange" size={45} />
                </div>
                <h3>{t("home.whyChooseUs.satisfaction.title")}</h3>
                <p>{t("home.whyChooseUs.satisfaction.description")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.popular_tours}>
          <div className={classes.container}>
            <h2 className={classes.section_title}>
              {t("home.popularTours.title")}
            </h2>
            <div className={classes.tours_grid}>
              {tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>

          <div className={classes.view_all_container}>
            <a href="/tours" className={classes.view_all_link_bottom}>
              {t("home.popularTours.viewAll")}
            </a>
          </div>
        </section>

        <div className={classes.container_top_content}>
          <h1 className={classes.top_title}>
            {t("home.specialInterest.title")}
          </h1>
          <p className={classes.top_subtitle}>
            {t("home.specialInterest.subtitle")}
          </p>
          <div className={classes.special_interest_btns}>
            <button onClick={interest}>
              {showInterestForm
                ? t("home.specialInterest.hideButton")
                : t("home.specialInterest.button")}
            </button>
          </div>
        </div>

        {showInterestForm && (
          <div>
            <div>
              <SpecialInterestForm />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
