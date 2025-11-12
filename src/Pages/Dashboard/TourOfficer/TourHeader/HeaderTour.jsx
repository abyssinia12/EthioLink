import React from 'react'
import classes from './HeaderTour.module.css'
import { Link } from 'react-router-dom'

export default function HeaderTour() {
  return (
    <div className={classes.continer}>
      <div className={classes.titel}>
      <p>Officer Dashboard</p>
      </div>
      <div className={classes.link}>
        <Link to="" >Form</Link>
        <Link to="">Table</Link>
      </div>
      
    </div>
  )
}
