import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Cardlist.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Backend/AuthContext';
const CarCarousel = () => {
  const Navigate = useNavigate();
  const carouselRef = useRef(null);
  const [cars, setCars] = useState([]);
  const { getAllCars,user} = useAuth(); 
  const topCars = cars?.slice(0, 5); // Select the top 3 cars

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
                  <button className={styles.detailsButton} onClick={()=>{user?Navigate(`/CarDetails/${car.carId}`):alert('Please Login')}}>Details</button>
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
