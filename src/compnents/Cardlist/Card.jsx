import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Cardlist.module.scss';
import { useNavigate } from 'react-router-dom';
import { cars } from "../../Data/CarData";

const CarCarousel = () => {
  const Navigate = useNavigate();
  const topCars = cars.slice(0, 3); // Select the top 3 cars

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        {topCars.map((car, index) => (
          <div
            className={`${styles.carouselItem}`}
            key={index}
          >
            <img src={car.image} alt={car.name} />
            <div className={styles.carouselCaption}>
              <h2>{car.name}</h2>
              <div className={styles.price_details}>
                <button className={styles.detailsButton} onClick={() => { Navigate(`/CarDetails/${car.carId}`) }}>Details</button>
                <span className={styles.price}>{car.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCarousel;
