import React from 'react'
import styles from "./index.module.scss"
import Card from './CarCard';
import {cars} from "../../Data/CarData";
export default function CarCardContainer() {
  return (
   <>
   <div className={styles.carCardcontainer}>
      {cars.map((item)=>(
     <Card item={item}/>
      ))}
   </div>
   </>
  )
}
