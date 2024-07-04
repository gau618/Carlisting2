import React from 'react'
import Maincontainer from "../../compnents/Maincontainer/maincontainer"
import styles from "./Landingpage.module.scss"
import CarTypes from '../../compnents/CarsTypes/CarsTypes'
import SearchBarContainer from '../../compnents/Searchbar/Searchbarcontainer'
import CardContainer from '../../compnents/Cardlist/Cardcontainer'
export default function Landingpage() {
  return (
    <>
    <div className={styles.landingpade}>
    <Maincontainer/>
    <CarTypes/>
    <SearchBarContainer/>
    <CardContainer/>
    </div>
     </>
  )
}
