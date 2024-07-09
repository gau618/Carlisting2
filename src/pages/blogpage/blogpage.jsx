import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground'
import background from "../../assets/blogpage.jpg"
import BlogCard from '../../compnents/BlogCard/BlogCard'
import { IoBackspace } from "react-icons/io5";
import { useAuth } from '../../Backend/AuthContext'
export default function Blogpage() {
   const [description,setdescription]=useState(null);
   const {getAllblogs}=useAuth();
   const [blogs,setBlogs]=useState([]);
   useEffect(()=>{
     window.scrollTo(0,0);
   },[description])
   useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const allBlogs = await getAllblogs();
          setBlogs(allBlogs);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchBlogs();
    }, [getAllblogs]);
    console.log(blogs);
  return (
    <>
     <div className={styles.Blogscontainer}>
          <CarlistBackground background={background}/>
          <div className={styles.blogandNews}>
             <p>Blogs & News</p>
             <h1>Latest <span>Blogs</span></h1>
          </div>
          {description?(<>
             <div className={styles.descriptioncontainer}>
                <div className={styles.left}>
                <BlogCard item={description}/>
                </div>
                <div className={styles.right}>
                    <div className={styles.icon}>
                     < IoBackspace onClick={()=>{setdescription(null)}}/>
                    </div>
                    <h1>Description</h1>
                 <p>{description.description}</p>
                </div>
             </div>
          </>):<>
          <div className={styles.blogcardcontainer}>
            {blogs.map((item)=>(<BlogCard item={item} setdescription={setdescription}/>))}
          </div>
          </>}
          
     </div>
    </>
  )
}
