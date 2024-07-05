import React from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";

const Card = ({ item }) => {
    const Navigate=useNavigate();
  return (
    <div className={styles.card} onClick={()=>{Navigate(`/CarDetails/${item.carId}`)}}>
      <img
        src={item.image}
        alt="Bugatti Mistral W16"
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
