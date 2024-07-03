import React from 'react';
import styles from"./index.module.scss"
import SearchBar from './Searchbar';

function SearchBarContainer() {
  return (
    <div className={styles.App}>
      <header className={styles.Appheader}>
        <SearchBar />
      </header>
    </div>
  );
}

export default SearchBarContainer;
