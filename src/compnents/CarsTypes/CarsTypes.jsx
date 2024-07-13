import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCircleArrowRight, FaCircleArrowLeft } from 'react-icons/fa6';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Cartypes1 from "../../assets/Cartypes1.jpg";
import Cartypes2 from "../../assets/Cartypes2.jpg";
import Cartypes3 from "../../assets/Cartypes3.jpg";
import styles from './CarsTypes.module.scss';

const carCategories = [
  {
    name: "Luxury Cars",
    imageUrl: Cartypes1
  },
  {
    name: "Sport Cars",
    imageUrl: Cartypes2
  },
  {
    name: "SUV",
    imageUrl: Cartypes3
  },{
    name: "F1",
    imageUrl: Cartypes2
  }
];

const CarTypes = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.categories}>CATEGORIES</span> Best <span className={styles.titlespan}>Car Types</span>
      </h2>

       
        <div className={styles.cards} ref={scrollRef}>
        <FaCircleArrowLeft className={styles.arrowleft} onClick={() => scroll(-300)} />
          {carCategories.map((category, index) => (
            <div className={styles.card} key={index}>
              <img src={category.imageUrl} alt={category.name} className={styles.cardImage} />
              <div className={styles.cardOverlay}>
                <div className={styles.cardTitle}>{category.name}</div>
                <div className={styles.cardButton}>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </div>
              </div>
            </div>
          ))}
          <FaCircleArrowRight className={styles.arrowright} onClick={() => scroll(300)} />
        </div>
        
     
    </div>
  );
};

export default CarTypes;
