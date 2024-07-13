import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CarlistBackground from "../../compnents/CarlistBackgroung/CarlistBackground";
import background from "../../assets/blogpage.jpg";
import BlogCard from "../../compnents/BlogCard/BlogCard";
import { IoBackspace } from "react-icons/io5";
import { useAuth } from "../../Backend/AuthContext";
import Loader from "../../compnents/Loader/Loader";
export default function Blogpage() {
  const [description, setdescription] = useState(null);
  const { getAllblogs } = useAuth();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [description]);
  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const allBlogs = await getAllblogs();
        setBlogs(allBlogs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [getAllblogs]);
  return (
    <>
      <div className={styles.Blogscontainer}>
        <CarlistBackground background={background} />
        <div className={styles.blogandNews}>
          <p>Blogs & News</p>
          <h1>
            Latest <span>Blogs</span>
          </h1>
        </div>
        {description ? (
          <>
            <div className={styles.descriptioncontainer}>
              <div className={styles.left}>
                <BlogCard item={description} />
              </div>
              <div className={styles.right}>
                <div className={styles.icon}>
                  <IoBackspace
                    onClick={() => {
                      setdescription(null);
                    }}
                  />
                </div>
                <h1>Description</h1>
                <p>{description.description}</p>
              </div>
            </div>
          </>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.blogcardcontainer}>
              {blogs.map((item) => (
                <BlogCard item={item} setdescription={setdescription} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
