import React from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";
import { useAuth } from "../../Backend/AuthContext";
const Card = ({ item }) => {
    const Navigate=useNavigate();
    const {user}=useAuth();
  return (
    <div className={styles.card} onClick={()=>{user?Navigate(`/CarDetails/${item.carId}`):alert('Please Login')}}>
      <img
        src={item.image}
        alt={item.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{item.name}</h2>
        <div className={styles.details}>
          <div className={styles.item}>
            <div className={styles.icon}>
              <BiSolidCategoryAlt />
            </div>
            <p> {item.carType}</p>
          </div>
          <div className={styles.item}>
            <div className={styles.icon}>
              <BsFillFuelPumpFill />
            </div>
            <p> {item.fuel}</p>
          </div>

          <div className={styles.item}>
            <div className={styles.icon}>
              {" "}
              <IoIosColorPalette />
            </div>
            <p>{item.color}</p>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.arrowButton}>{item.price} </button>
      </div>
    </div>
  );
};

export default Card;
