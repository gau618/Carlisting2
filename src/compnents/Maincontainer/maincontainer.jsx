import React from 'react';
import styles from './maincontainer.module.scss';
import { MdArrowOutward } from "react-icons/md";
import homeImg from "../../assets/home.jpg"
const MainContainer = () => (
  <div className={styles.Maincontainer}>
    <div className={styles.imgcontainer}>
      <img src={homeImg} alt="Background" />
    </div>
    <div className={styles.detail_container}>
      <p className={styles.premium}>* PREMIUM</p>
      <h1>Buy Premium Cars</h1>
      <p className={styles.carName}>Luxury and Economy Cars at Unbeatable Prices</p>
      <div className={styles.buttons}>
        <button className={styles.detailsBtn}>View Details <MdArrowOutward/></button>
        <button className={styles.rentBtn}>Buy Now <MdArrowOutward/></button>
      </div>
    </div>
  </div>
);

export default MainContainer;
