import React, { useState, useEffect } from 'react';
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground';
import SearchBar from '../../compnents/Searchbar/Searchbar';
import styles from "./CarlistPage.module.scss";
import CarCardContainer from '../../compnents/CarlistCards/CarCardContainer';
import background from "../../assets/13646.jpg";
import { useAuth } from '../../Backend/AuthContext';

export default function CarlistPage() {
  const { getAllCars } = useAuth();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);
        console.log(allCars);
        setFilteredCars(allCars); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [getAllCars]);

  return (
    <>
      <div className={styles.CarlistpageContainer}>
        <CarlistBackground background={background} />
        <div className={styles.searchbarcontainer}>
          <SearchBar setFilteredCars={setFilteredCars} cars={cars} />
        </div>
        <CarCardContainer filteredCars={filteredCars} />
      </div>
    </>
  );
}
