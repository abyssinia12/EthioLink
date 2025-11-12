import React from "react";
import classes from './HeroSec.module.css'


function HeroSection () {
  
   
    return (
      <div>
        <div
          className={classes.hero_container}
          style={{ backgroundImage: `url('../../../public/bn7.avif')` }}
        >
          <div className={classes.hero_overlay}>
            <h1 className={classes.hero_title}>
              Discover the Beauty of{" "}
              <span className={classes.hero_title_highlight}>Ethiopia</span>
            </h1>
            <p className={classes.hero_subtitle}>
              Explore ancient history, stunning landscapes, and vibrant cultures
            </p>
            <div className={classes.hero_cta_container}>
              <button className={classes.hero_primary_cta}>
                Explore Tours
              </button>
              {/* <button className={classes.hero_secondary_cta}>Contact Us</button> */}
            </div>
          </div>
        </div>
 
       
      </div>
    );
  }

export default HeroSection;
