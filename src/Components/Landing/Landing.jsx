import React from 'react'
import Header from '../Header/Header'
import Carasul from '../Carasul/Carasul'
import ServiceSection from '../Service/ServiceSection'
// import NavigationHeader from '../NavigationHeader/NavigationHeader'

export default function Landing() {
  return (
    <div>
      <Header/>
      {/* <NavigationHeader/> */}
      <Carasul/>
      <ServiceSection/>
    </div>
  )
}
