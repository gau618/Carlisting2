import React from 'react'
import styles from "./index.module.scss"
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground'
import background from "../../assets/c.jpg";
import SellerForm from '../../compnents/SellerForm/SellerForm';
export default function SellCarPage() {
  return (
    <div className={styles.sellCarContainer}>
     <CarlistBackground background={background}/>
     <div className={styles.heading}>
        <h1>Sell your <span>Car</span></h1>
     </div>
     <div className={styles.sellerform}>
     <SellerForm/>
     </div>
    </div>
  )
}
