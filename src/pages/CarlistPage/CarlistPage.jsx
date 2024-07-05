import React from 'react'
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground'
import SearchBar from '../../compnents/Searchbar/Searchbar'
import styles from "./CarlistPage.module.scss";
import CarCardContainer from '../../compnents/CarlistCards/CarCardContainer';
import background from "../../assets/13646.jpg"
export default function CarlistPage() {
  return (
    <>
      <div className={styles.CarlistpageContainer}>
        <CarlistBackground background={background}/>
        <div className={styles.searchbarcontainer}>
        <SearchBar/>
        </div>
        <CarCardContainer/>
      </div>
    </>
  )
}
