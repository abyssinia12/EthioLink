// import React from 'react'
// import classes from './Footer.module.css'
// import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// function Footer() {
//   return (
//     <div className={classes.container}>
//       <div className={classes.first}>
//         <h1 className={classes.headingPrimary}>Ethio-Link Tour and Travel</h1>
//         <p className={classes.description}>
//           Your trusted partner for unforgettable travel experiences in Ethiopia
//           and beyond.
//         </p>
//         <div className={classes.socialLinks}>
//           <a href="#" className={classes.socialIcon}>
//             <Facebook size={24} />
//           </a>
//           <a href="#" className={classes.socialIcon}>
//             <Twitter size={24} />
//           </a>
//           <a href="#" className={classes.socialIcon}>
//             <Instagram size={24} />
//           </a>
//           <a href="#" className={classes.socialIcon}>
//             <Linkedin size={24} />
//           </a>
//         </div>
//       </div>

//       <div className={classes.divider}></div>

//       <div className={classes.first}>
//         <h2 className={classes.headingSecondary}>Quick links</h2>
//         <ul className={classes.list}>
//           <li className={classes.listItem}>Home</li>
//           <li className={classes.listItem}>About us</li>
//           <li className={classes.listItem}>Destinations</li>
//           <li className={classes.listItem}>Contact</li>
//         </ul>
//       </div>

//       <div className={classes.first}>
//         <h2 className={classes.headingSecondary}>Contact info</h2>
//         <ul className={classes.contactList}>
//           <li className={classes.contactItem}>
//             <i className={classes.icon}>📍 Street, Hawassa Ethiopia</i>
//           </li>

//           <li className={classes.contactItem}>
//             <i className={classes.icon}>📞 +251 123 456 789</i>
//           </li>

//           <li className={classes.contactItem}>
//             <i className={classes.icon}>✉️ info@ethio-linktourandtravel.com</i>
//           </li>
//         </ul>
//       </div>

//       <hr className={classes.divider} />

//       <div className={classes.footerBottom}>
//         <p className={classes.copyright}>
//           &copy; 2025 Ethio-Link Tour and Travel. All Rights Reserved.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Footer


import React from "react";
import classes from "./Footer.module.css";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.first}>
        <h1 className={classes.headingPrimary}>{t("footer.companyName")}</h1>
        <p className={classes.description}>{t("footer.description")}</p>
        <div className={classes.socialLinks}>
          <a href="#" className={classes.socialIcon}>
            <Facebook size={24} />
          </a>
          <a href="#" className={classes.socialIcon}>
            <Twitter size={24} />
          </a>
          <a href="#" className={classes.socialIcon}>
            <Instagram size={24} />
          </a>
          <a href="#" className={classes.socialIcon}>
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      <div className={classes.divider}></div>

      <div className={classes.first}>
        <h2 className={classes.headingSecondary}>{t("footer.quickLinks")}</h2>
        <ul className={classes.list}>
          <li className={classes.listItem}>{t("footer.links.home")}</li>
          <li className={classes.listItem}>{t("footer.links.about")}</li>
          <li className={classes.listItem}>{t("footer.links.destinations")}</li>
          <li className={classes.listItem}>{t("footer.links.contact")}</li>
        </ul>
      </div>

      <div className={classes.first}>
        <h2 className={classes.headingSecondary}>{t("footer.contactInfo")}</h2>
        <ul className={classes.contactList}>
          <li className={classes.contactItem}>
            <i className={classes.icon}>📍 {t("footer.address")}</i>
          </li>
          <li className={classes.contactItem}>
            <i className={classes.icon}>📞 {t("footer.phone")}</i>
          </li>
          <li className={classes.contactItem}>
            <i className={classes.icon}>✉️ {t("footer.email")}</i>
          </li>
        </ul>
      </div>

      <hr className={classes.divider} />

      <div className={classes.footerBottom}>
        <p className={classes.copyright}>
          &copy; 2025 {t("footer.companyName")}. {t("footer.rights")}
        </p>
      </div>
    </div>
  );
}

export default Footer;
