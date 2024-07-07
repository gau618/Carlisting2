import React from 'react';
import styles from './index.module.scss';
import carImage from '../../assets/a.jpg'; // 

const BlogCard = ({item,setdescription}) => {
  return (
    <div className={styles.card} onClick={()=>{setdescription(item)}}>
      <div className={styles.imageContainer}>
        <img src={item.image} alt="Car" className={styles.carImage} />
      </div>
      <div className={styles.cardContent}>
      
        <div className={styles.author}>
          <span className={styles.authorName}>{item.author}</span>
          <div className={styles.date}>{item.date}</div>
        </div>
        <div className={styles.title}>{item.title}</div>
      </div>
    </div>
  );
};

export default BlogCard;
