// // import React from "react";
// // import { Carousel } from "react-responsive-carousel";
// // import { imgg } from "./img1/Data";
// // import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import classes from "../Carasul/carasul.module.css";

// // export default function Carasul() {
// //   return (
// //     <Carousel
// //       autoPlay={true}
// //       infiniteLoop={true}
// //       showIndicators={true}
// //       showThumbs={false}
// //       showStatus={false}
// //     >
// //       {imgg.map((url, index) => (
// //         <div key={index} className={classes.slideContainer}>
// //           <img src={url} alt={`Slide ${index + 1}`} className={classes.img} />
// //           <div className={classes.caption}>
// //             {/* <h2>{titles[index]}</h2> */}
// //           </div>
// //         </div>
// //       ))}
// //     </Carousel>
// //   );
// //   // return (
// //   //   <>
// //   //     <Carousel
// //   //       autoPlay={true}
// //   //       infiniteLoop={true} // ✅ Fix incorrect casing
// //   //       showIndicators={true}
// //   //       showThumbs={false}
// //   //     >
// //   //       {imgg.map((imageLink, index) => (
// //   //         <div className={classes.overlay} key={index}>
// //   //           <img
// //   //             key={index}
// //   //             src={imageLink}
// //   //             alt={`Slide ${index + 1}`}
// //   //             className={classes.img}
// //   //           />
// //   //           <h1 className={classes.hero_title}>
// //   //             Discover the Beauty of
// //   //             <span className={classes.hero_title_highlight}>Ethiopia</span>
// //   //           </h1>
// //   //           <p className={classes.hero_subtitle}>
// //   //             Explore ancient history, stunning landscapes, and vibrant cultures
// //   //           </p>
// //   //         </div>
// //   //       ))}

// //   //       <div className={classes.overlay}>
// //   //         <div className={classes.hero_img}></div>
// //   //       </div>
// //   //     </Carousel>
// //   //   </>
// //   // );
// // }

// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import { imgg } from "./img1/Data"; // Assuming imgg is an array of image URLs
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import classes from "../Carasul/carasul.module.css";

// export default function Carasul() {
//   return (
//     <div className={classes.carouselContainerWrapper}>
//       {" "}
//       {/* New wrapper for positioning */}
//       <Carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showIndicators={true}
//         showThumbs={false}
//         showStatus={false}
//       >
//         {imgg.map((url, index) => (
//           <div key={index} className={classes.slideImageWrapper}>
//             {" "}
//             {/* Wrapper for individual image */}
//             <img
//               src={url}
//               alt={`Slide ${index + 1}`}
//               className={classes.slideImage}
//             />
//           </div>
//         ))}
//       </Carousel>
//       {/* Static text overlay - outside the Carousel component */}
//       <div className={classes.staticTextOverlay}>
//         <h1 className={classes.hero_title}>
//           Discover the Beauty of
//           <span className={classes.hero_title_highlight}>Ethiopia</span>
//         </h1>
//         <p className={classes.hero_subtitle}>
//           Explore ancient history, stunning landscapes, and vibrant cultures
//         </p>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Carousel } from "react-responsive-carousel";
import { imgg } from "./img1/Data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../Carasul/carasul.module.css";
import { useTranslation } from "react-i18next";

export default function Carasul() {
  const { t } = useTranslation();

  return (
    <div className={classes.carouselContainerWrapper}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
      >
        {imgg.map((url, index) => (
          <div key={index} className={classes.slideImageWrapper}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className={classes.slideImage}
            />
          </div>
        ))}
      </Carousel>

      {/* Static text overlay - translated */}
      <div className={classes.staticTextOverlay}>
        <h1 className={classes.hero_title}>
          {" "}
          {t("carousel.title")}{" "}
          <span className={classes.hero_title_highlight}>
            {t("carousel.highlight")}
          </span>
        </h1>
        <p className={classes.hero_subtitle}>{t("carousel.subtitle")}</p>
      </div>
    </div>
  );
}
