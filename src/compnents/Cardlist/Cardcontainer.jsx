import React from 'react';
import CarCarousel from './Card';
import styles from './Cardlist.module.scss';

function CardContainer({filtercar}) {
  return (
    <div className={styles.Carlistcontainer}>
      <header className={styles.Carlistcontainerheader}>
        <p>SELECT YOUR CAR</p>
        <h1>Luxury <span>Car Fleet</span> </h1>
        <CarCarousel filtercar={filtercar}/>
      </header>
    </div>
  );
}

export default CardContainer;
