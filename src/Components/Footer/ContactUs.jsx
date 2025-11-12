import React from "react";
import LayOut from "../LayOut/LayOut";
import classes from "./aboutContact.module.css";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <LayOut>
      <div className={classes.container}>
        <div className={classes.pageHeader}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>

        <div className={classes.contentSection}>
          <h2>Get In Touch</h2>
          <p>
            Have questions about our tours or need assistance planning your next adventure? 
            Our team is here to help. Reach out to us through any of the following channels:
          </p>

          <div className={classes.contactInfo}>
            <div className={classes.infoCard}>
              <MapPin className={classes.infoIcon} />
              <h3>Visit Us</h3>
              <p>Street, Hawassa Ethiopia</p>
            </div>

            <div className={classes.infoCard}>
              <Phone className={classes.infoIcon} />
              <h3>Call Us</h3>
              <p>+251 123 456 789</p>
            </div>

            <div className={classes.infoCard}>
              <Mail className={classes.infoIcon} />
              <h3>Email Us</h3>
              <p>info@ethio-linktourandtravel.com</p>
            </div>

            <div className={classes.infoCard}>
              <Clock className={classes.infoIcon} />
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9AM - 6PM</p>
              <p>Saturday: 10AM - 4PM</p>
            </div>
          </div>
        </div>

        <div className={classes.contentSection}>
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible:</p>
          
          <form className={classes.contactForm}>
            <div className={classes.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className={classes.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className={classes.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div className={classes.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className={classes.submitButton}>Send Message</button>
          </form>
        </div>

        <div className={classes.mapSection}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5777040000003!2d38.5413!3d7.062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17a9c3d1d3d3d3d3%3A0x1d3d3d3d3d3d3d3d!2sHawassa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set" 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </LayOut>
  );
};

export default ContactUs;
