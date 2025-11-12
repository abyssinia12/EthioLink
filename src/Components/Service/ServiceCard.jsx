import React from "react";
import { Link } from "react-router-dom";
import classes from "./Service.module.css";

const ServiceCard = ({ title, description, icon, imageSrc, link, delay }) => {
  return (
    <div
      className={classes.service_card}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={classes.service_card_bg}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div></div>
      <div className="">
        <div className={classes.service_card_icon}>{icon}</div>
        <h3 className={classes.service_card_title}>{title}</h3>
        <p className={classes.service_card_description}>{description}</p>
        <div className="">
          <Link to={link}>
            <button className={classes.service_card_btn}>View more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
