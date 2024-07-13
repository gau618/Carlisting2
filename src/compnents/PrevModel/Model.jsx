import React from "react";
import styles from "./index.module.css";

const Modal = ({ show, image, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <img src={image} alt="Preview" />
      </div>
    </div>
  );
};

export default Modal;
