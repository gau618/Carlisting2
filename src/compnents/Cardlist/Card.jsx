import React, { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Cardlist.module.scss';
import { useNavigate } from 'react-router-dom';
import { cars } from "../../Data/CarData";

const CarCarousel = () => {
  const Navigate = useNavigate();
  const carouselRef = useRef(null);
  const topCars = cars.slice(0, 3); // Select the top 3 cars

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <FaArrowLeft className={styles.arrowleft} onClick={scrollLeft} />
      <div className={styles.carousel} ref={carouselRef}>
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
      <FaArrowRight className={styles.arrowright} onClick={scrollRight} />
    </div>
  );
};

export default CarCarousel;
