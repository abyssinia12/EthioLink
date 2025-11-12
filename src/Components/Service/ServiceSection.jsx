import React from 'react'
import {Hotel, Car, MapPin} from 'lucide-react'
import ServiceCard from './ServiceCard'
import { car, hotel, map } from './img1/Data';
import classes from './Service.module.css'


export default function ServiceSection() {
  return (
    <>
      <section className={classes.service_section}>
        <div className={classes.service_container}>
          <div className={classes.service_container}>
            <span className={classes.service_title}>Our service</span>
            <p className={classes.service_description}>
              We offer a range of high-quality service designed to amke your
              journy memorable, confortable and hassel-free.
            </p>
          </div>

          <div className={classes.service_grid}>
            <ServiceCard
              title={"Tour Package"}
              description={
                "Discover our curated of tour package designed to showcase the most lovable place."
              }
              icon={<MapPin />}
              imageSrc={map}
              Link={"/tour"}
              delay={100}
            />

            <ServiceCard
              title={"Car Rental"}
              description={
                "explore at your own pace with our permium fleet of vehicles, offering comfort"
              }
              icon={<Car />}
              imageSrc={car}
              Link={"cars"}
              delay={200}
            />

            <ServiceCard
              title={"Hotel reservation"}
              description={
                "stay in handpicked accommodation that offer exceptional comfort, service and experiences."
              }
              icon={<Hotel />}
              imageSrc={hotel}
              Link={"/hotels"}
              delay={300}
            />
          </div>
        </div>
      </section>
    </>
  );
}
