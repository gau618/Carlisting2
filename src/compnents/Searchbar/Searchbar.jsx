import React from 'react';
import styles from "./index.module.scss"
const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <select className={styles.searchbaritem}>
        <option>Company</option>
      </select>
      <select className={styles.searchbaritem}>
        <option>Car Name</option>
      </select>
      <select className={styles.searchbaritem}>
        <option>Price Range</option>
      </select>
      <select className={styles.searchbaritem}>
        <option>Fuel</option>
      </select>
      <button className={styles.searchbarbutton}>Search Now</button>
    </div>
  );
};

export default SearchBar;
