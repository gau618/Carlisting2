import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
export default function CarlistBackground({background}) {
  return (
    <><div className={styles.Maincontainer}>
    <div className={styles.imgcontainer}>
        <img src={background} alt="Background" />
    </div>
  </div>
    </>
  );
}
