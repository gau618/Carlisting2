import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { cars } from "../../Data/CarData";

export default function CardetailsBackground({ id }) {
  const [car, setCar] = useState(null); 
  useEffect(() => {
    const foundCar = cars.find(car => car.carId == id);  
    if (foundCar) {
        setCar(foundCar);
    }
}, [id]); 

console.log("Current car state:", car);

console.log(car);
  return (
    <>{car?<div className={styles.Maincontainer}>
    <div className={styles.imgcontainer}>
        <img src={car.image} alt="Background" />
    </div>
    <div className={styles.carnameandtype}>
        <p>{car.carType}</p>
        <h1>{car.name}</h1>
    </div>
  </div>:''}
      
    </>
  );
}
