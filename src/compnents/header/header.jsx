import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from "./header.module.scss";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1><span>Car</span>Mart</h1>
        </div>
        <div className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#">VIN</a>
          <a href="#">CHATBOT</a>
        </div>
        <div className={styles.credentialbutton}>
          <button>Credentials</button>
        </div>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <a href="#">Home</a>
        <a href="#">VIN</a>
        <a href="#">CHATBOT</a>
        <div className={styles.credentialbutton}>
          <button>Credentials</button>
        </div>
        <div className={styles.closebtn} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </>
  );
}