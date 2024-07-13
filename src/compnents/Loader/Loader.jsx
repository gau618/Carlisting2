import React from "react";
import styles from './Loader.module.css'
export default function Loader() {
  return (
    <div className={styles.loader}>
    <div class={styles.wrapper}>
      <div class={styles.circle}></div>
      <div  class={styles.circle}></div>
      <div  class={styles.circle}></div>
      <div class={styles.shadow}></div>
      <div class={styles.shadow}></div>
      <div class={styles.shadow}></div>
    </div>
    </div>
  );
}
