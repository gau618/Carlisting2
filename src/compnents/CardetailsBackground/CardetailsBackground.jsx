import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useAuth } from "../../Backend/AuthContext";

export default function CardetailsBackground({ id }) {
  const { getAllCars } = useAuth();
  const [cars, setCars] = useState([]); 
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [getAllCars]); 

  useEffect(() => {

    const foundCar = cars.find(car => car.carId ==id);  
    if (foundCar) {
      setCar(foundCar);
      
    }
  }, [id, cars]); 


  return (
    <>
      {car ? (
        <div className={styles.Maincontainer}>
          <div className={styles.imgcontainer}>
            <img src={car.image} alt="Background" />
          </div>
          <div className={styles.carnameandtype}>
            <p>{car.carType}</p>
            <h1>{car.name}</h1>
          </div>
        </div>
      ) : ''}
    </>
  );
}
