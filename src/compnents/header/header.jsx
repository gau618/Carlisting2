import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from "./header.module.scss";
import { useNavigate,Link } from 'react-router-dom';


export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const Navigate=useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${styles.header} ${scrollPosition > 100 ? styles.headerScrolled : ''}`}>
        <div className={styles.logo}>
          <h1><span>Car</span>Mart</h1>
        </div>
        <div className={styles.navLinks}>
          <Link to='/'>HOME</Link>
          <a href="#">VIN</a>
          <a href="#">CHATBOT</a>
          <Link to='/Carlist'>CARLIST</Link>
        </div>
        <div className={styles.credentialbutton}>
          <button>Credentials</button>
        </div>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <Link to='/'>HOME</Link>
        <a href="#">VIN</a>
        <a href="#">CHATBOT</a>
        <Link to='/Carlist'>CARLIST</Link>
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
