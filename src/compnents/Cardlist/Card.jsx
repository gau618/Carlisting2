import React, { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Cardlist.module.scss';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useAuth } from '../../Backend/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarCarousel = ({ filtercar }) => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const { getAllCars, user } = useAuth(); 
  const [topCars, setTopCars] = useState(filtercar);

  useEffect(() => {
    setTopCars(filtercar?.slice(0, 5));
  }, [filtercar]);

  useEffect(() => {
    setLoading(true);
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
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
    loading ? (
      <Loader />
    ) : (
      <div className={styles.carouselContainer}>
        {topCars && topCars.length > 0 ? (
          <>
            <FaArrowLeft className={styles.arrowleft} onClick={scrollLeft} />
            <div className={styles.carousel} ref={carouselRef}>
              <div className={styles.carouselInner}>
                {topCars.map((car, index) => (
                  <div className={`${styles.carouselItem}`} key={index}>
                    <img src={car.image} alt={car.name} />
                    <div className={styles.carouselCaption}>
                      <h2>{car.name}</h2>
                      <div className={styles.price_details}>
                        <button
                          className={styles.detailsButton}
                          onClick={() => {
                            user ? navigate(`/CarDetails/${car.carId}`) : toast('Please Login');
                          }}
                        >
                          Details
                        </button>
                        <span className={styles.price}>{car.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <FaArrowRight className={styles.arrowright} onClick={scrollRight} />
          </>
        ) : (
          <div className={styles.VINBack}>
          <div className={styles.VIN}>
            <h1>
              No Car <span>Found</span>
            </h1>
          </div>
        </div>
        )}
      </div>
    )
  );
};

export default CarCarousel;


