import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.scss";
import {useAuth} from "../../Backend/AuthContext"
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const [authpage,setauthpage]=useState(false);
  const {user,logout}=useAuth();
  const Location =useLocation();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(()=>{
    if(Location.pathname==='/Auth'){
     setauthpage(true);
    }else{
      setauthpage(false);
    }
  },[Location])
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <>
      <div
        className={`${styles.header} ${
          scrollPosition > 100 ? styles.headerScrolled : ""
        }`}
      >
        <div className={styles.logo}>
          <h1>
            <span>Car</span>Mart
          </h1>
        </div>
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={activeLink === "/" ? styles.activeLink : ""}
            onClick={() => handleLinkClick("/")}
          >
            HOME
          </Link>
          <Link
            to="/VehicleDetails"
            className={activeLink === "/VehicleDetails" ? styles.activeLink : ""}
            onClick={() => handleLinkClick("/VehicleDetails")}
          >
            VIN
          </Link>
          <Link
            to="/Chatbot"
            className={activeLink === "/Chatbot" ? styles.activeLink : ""}
            onClick={() => handleLinkClick("/Chatbot")}
          >
            CHATBOT
          </Link>
          <Link
            to="/Carlist"
            className={activeLink === "/Carlist" ? styles.activeLink : ""}
            onClick={() => handleLinkClick("/Carlist")}
          >
            CARLIST
          </Link>
          <Link
          to="/SELLCAR"
          className={activeLink === "/SELLCAR" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/SELLCAR")}
        >
          SELLCAR
        </Link>
        <Link
          to="/Blogs"
          className={activeLink === "/Blogs" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/Blogs")}
        >
          BLOGS
        </Link>
        </div>
        <div className={styles.credentialbutton}>
          {user?<button onClick={()=>logout()}>Logout</button>:(!authpage?<button onClick={()=>{navigate('/Auth')}}>Credential</button>:'')}
        </div>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <Link
          to="/"
          className={activeLink === "/" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/")}
        >
          HOME
        </Link>
        <Link
          to="/VehicleDetails"
          className={activeLink === "/VehicleDetails" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/VehicleDetails")}
        >
          VIN
        </Link>
        <Link
          to="/Chatbot"
          className={activeLink === "/Chatbot" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/Chatbot")}
        >
          CHATBOT
        </Link>
        <Link
          to="/Carlist"
          className={activeLink === "/Carlist" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/Carlist")}
        >
          CARLIST
        </Link>
        <Link
          to="/SELLCAR"
          className={activeLink === "/SELLCAR" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/SELLCAR")}
        >
          SELLCAR
        </Link>
        <Link
          to="/Blogs"
          className={activeLink === "/Blogs" ? styles.activeLink : ""}
          onClick={() => handleLinkClick("/Blogs")}
        >
          BLOGS
        </Link>
        <div className={styles.credentialbutton}>
          {user?<button onClick={()=>logout()}>Logout</button>:(!authpage?<button onClick={()=>{navigate('/Auth')}}>Credential</button>:'')}
        </div>
        <div className={styles.closebtn} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </>
  );
}
