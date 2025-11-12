// import React from "react";
// import LayOut from "../LayOut/LayOut";
// import classes from "./aboutContact.module.css";
// import { Users, Target, Award } from "lucide-react";

// const AboutUs = () => {
//   const teamMembers = [
//     { name: "Alex Morgan", role: "Founder & CEO" },
//     { name: "Sarah Johnson", role: "Tour Officer" },
//     { name: "Michael Chen", role: "Operations Manager" },
//     { name: "Elena Rodriguez", role: "Customer Relations" },
//   ];

//   const values = [
//     { title: "Integrity", description: "We conduct business with honesty and transparency" },
//     { title: "Excellence", description: "We strive for the highest quality in all our services" },
//     { title: "Sustainability", description: "We promote responsible and eco-friendly tourism" },
//     { title: "Cultural Respect", description: "We honor and preserve local traditions and heritage" },
//   ];

//   return (
//     <LayOut>
//       <div className={classes.container}>
//         <div className={classes.pageHeader}>
//           <h1>About Ethio-Link Tour and Travel</h1>
//           <p>Discover the story behind our journey</p>
//         </div>

//         <div className={classes.contentSection}>
//           <h2>Our Story</h2>
//           <p>
//             Founded in 2010, Ethio-Link Tour and Travel has been your trusted partner for unforgettable
//             travel experiences in Ethiopia and beyond. What started as a small local tour operator has
//             grown into one of the most respected travel companies in East Africa.
//           </p>
//           <p>
//             Our passion for showcasing the beauty, culture, and diversity of Ethiopia drives everything we do.
//             With over a decade of experience, we've crafted exceptional journeys for thousands of travelers
//             from around the world.
//           </p>
//         </div>

//         <div className={classes.contentSection}>
//           <h2>Our Mission</h2>
//           <p>
//             To provide authentic, sustainable, and memorable travel experiences that connect people with
//             the rich heritage and natural wonders of Ethiopia while contributing positively to local communities.
//           </p>
//         </div>

//         <div className={classes.teamSection}>
//           <div className={classes.pageHeader}>
//             <h2>Meet Our Team</h2>
//           </div>
//           <div className={classes.teamGrid}>
//             {teamMembers.map((member, index) => (
//               <div className={classes.teamMember} key={index}>
//                 <div className={classes.teamImagePlaceholder}>
//                   {member.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </div>
//                 <h3>{member.name}</h3>
//                 <p>{member.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className={classes.valuesSection}>
//           <div className={classes.pageHeader}>
//             <h2>Our Core Values</h2>
//           </div>
//           <div className={classes.valuesGrid}>
//             {values.map((value, index) => (
//               <div className={classes.valueCard} key={index}>
//                 <h3>{value.title}</h3>
//                 <p>{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </LayOut>
//   );
// };

// export default AboutUs;


import React from "react";
import LayOut from "../LayOut/LayOut";
import classes from "./aboutContact.module.css";
import { Users, Target, Award } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    { name: "Alex Morgan", role: "Founder & CEO" },
    { name: "Sarah Johnson", role: "Tour Officer" },
    { name: "Michael Chen", role: "Operations Manager" },
    { name: "Elena Rodriguez", role: "Customer Relations" },
  ];

  const values = [
    {
      title: "Integrity",
      description: "We conduct business with honesty and transparency",
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in all our services",
    },
    {
      title: "Sustainability",
      description: "We promote responsible and eco-friendly tourism",
    },
    {
      title: "Cultural Respect",
      description: "We honor and preserve local traditions and heritage",
    },
  ];

  return (
    <LayOut>
      <div className={classes.container}>
        <div className={classes.pageHeader}>
          <h1>About Ethio-Link Tour and Travel</h1>
          <p>Discover the story behind our journey</p>
        </div>

        {/* Our Story */}
        <div className={classes.contentSection}>
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Ethio-Link Tour and Travel has been your trusted
            partner for unforgettable travel experiences in Ethiopia and beyond.
            What started as a small local tour operator has grown into one of
            the most respected travel companies in East Africa.
          </p>
          <p>
            Our passion for showcasing the beauty, culture, and diversity of
            Ethiopia drives everything we do. With over a decade of experience,
            we've crafted exceptional journeys for thousands of travelers from
            around the world.
          </p>
        </div>

        {/* Our Mission */}
        <div className={classes.contentSection}>
          <h2>Our Mission</h2>
          <p>
            To provide authentic, sustainable, and memorable travel experiences
            that connect people with the rich heritage and natural wonders of
            Ethiopia while contributing positively to local communities.
          </p>
        </div>

        {/* Flight Booking & Visa Services */}
        <div className={classes.contentSection}>
          <h2>Flight Booking & Visa Services</h2>
          <p>
            We provide manual flight booking services and assist with visa
            applications from several countries, including Dubai, Turkey,
            Germany, and also locally within Ethiopia. Our dedicated officers
            guide you through the process to ensure a smooth and stress-free
            travel experience.
          </p>
        </div>

        {/* Cancellation Policy */}
        <div className={classes.contentSection}>
          <h2>Cancellation & Refund Policy</h2>
          <p>
            We understand that travel plans can change. If a customer cancels a
            booked service, our company will refund{" "}
            <strong>50% of the payment</strong>. This policy ensures fairness
            while also covering administrative and operational costs.
          </p>
        </div>

        {/* Meet the Team */}
        <div className={classes.teamSection}>
          <div className={classes.pageHeader}>
            <h2>Meet Our Team</h2>
          </div>
          <div className={classes.teamGrid}>
            {teamMembers.map((member, index) => (
              <div className={classes.teamMember} key={index}>
                <div className={classes.teamImagePlaceholder}>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Core Values */}
        <div className={classes.valuesSection}>
          <div className={classes.pageHeader}>
            <h2>Our Core Values</h2>
          </div>
          <div className={classes.valuesGrid}>
            {values.map((value, index) => (
              <div className={classes.valueCard} key={index}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayOut>
  );
};

export default AboutUs;
