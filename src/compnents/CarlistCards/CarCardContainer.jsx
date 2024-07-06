import React from 'react'
import styles from "./index.module.scss"
import Card from './CarCard';
export default function CarCardContainer({FilteredCars}) {
  return (
   <>
   <div className={styles.carCardcontainer}>
      {FilteredCars.map((item)=>(
     <Card item={item}/>
      ))}
   </div>
   </>
  )
}
