import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Cardlist.module.scss';
import img from "../../assets/a.jpg"
import img1 from "../../assets/b.jpg"
import img2 from "../../assets/c.jpg"
const cars = [
  {
    name: 'Audi Q8',
    image: img, // Update with your image path
    details: '4 Seats, Auto, 2 Bags, Age 25',
    price: '$65000',
  },
  {
    name: 'Lamborghini Urus',
    image: img1, // Update with your image path
    details: '4 Seats, Auto, 2 Bags, Age 25',
    price: '$75000',
  },
  {
    name: 'Ferrari SF90',
    image: img2, // Update with your image path
    details: '2 Seats, Auto, 1 Bag, Age 25',
    price: '$90000',
  },
];

const CarCarousel = () => {
 
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        {cars.map((car, index) => (
          <div
            className={`${styles.carouselItem}`}
            key={index}
          >
            <img src={car.image} alt={car.name} />
            <div className={styles.carouselCaption}>
              <h2>{car.name}</h2>
              <div className={styles.price_details}>
              <button className={styles.detailsButton}>Details</button>
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
