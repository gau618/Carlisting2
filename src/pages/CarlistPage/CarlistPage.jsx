import React, { useState,useEffect } from 'react'
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground'
import SearchBar from '../../compnents/Searchbar/Searchbar'
import styles from "./CarlistPage.module.scss";
import {cars} from "../../Data/CarData"
import CarCardContainer from '../../compnents/CarlistCards/CarCardContainer';
import background from "../../assets/13646.jpg"
export default function CarlistPage() {
  const [FilteredCars,setFilteredCars]=useState(cars);
  return (
    <>
      <div className={styles.CarlistpageContainer}>
        <CarlistBackground background={background}/>
        <div className={styles.searchbarcontainer}>
        <SearchBar setFilteredCars={setFilteredCars}/>
        </div>
        <CarCardContainer FilteredCars={FilteredCars}/>
      </div>
    </>
  )
}
