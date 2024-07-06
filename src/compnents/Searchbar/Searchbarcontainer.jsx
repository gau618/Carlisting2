import React from 'react';
import styles from"./index.module.scss"
import SearchBar from './Searchbar';

function SearchBarContainer({setFilteredCars}) {
  return (
    <div className={styles.App}>
      <header className={styles.Appheader}>
        <SearchBar setFilteredCars={setFilteredCars} />
      </header>
    </div>
  );
}

export default SearchBarContainer;
