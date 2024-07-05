import React from 'react'
import CardetailsBackground from '../../compnents/CarlistBackgroung/CarlistBackground'
import SearchBar from '../../compnents/Searchbar/Searchbar'
import styles from "./CarlistPage.module.scss";
import CarCardContainer from '../../compnents/CarlistCards/CarCardContainer';
export default function CarlistPage() {
  return (
    <>
      <div className={styles.CarlistpageContainer}>
        <CardetailsBackground/>
        <div className={styles.searchbarcontainer}>
        <SearchBar/>
        </div>
        <CarCardContainer/>
      </div>
    </>
  )
}
