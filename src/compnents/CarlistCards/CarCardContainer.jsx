import React from 'react';
import styles from "./index.module.scss";
import Card from './CarCard';

export default function CarCardContainer({ filteredCars }) { // Use filteredCars instead of FilteredCars
  return (
    <div className={styles.carCardcontainer}>
      {filteredCars.map((item) => (
        <Card key={item.id} item={item} /> // Assuming item has a unique identifier like `id`
      ))}
    </div>
  );
}
