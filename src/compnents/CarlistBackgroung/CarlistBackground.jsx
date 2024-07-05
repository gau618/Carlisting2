import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import background from "../../assets/13646.jpg"
export default function CardetailsBackground({ id }) {
  return (
    <><div className={styles.Maincontainer}>
    <div className={styles.imgcontainer}>
        <img src={background} alt="Background" />
    </div>
    
  </div>
    </>
  );
}
