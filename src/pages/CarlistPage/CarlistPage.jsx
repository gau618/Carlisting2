import React, { useState, useEffect } from "react";
import CarlistBackground from "../../compnents/CarlistBackgroung/CarlistBackground";
import SearchBar from "../../compnents/Searchbar/Searchbar";
import styles from "./CarlistPage.module.scss";
import CarCardContainer from "../../compnents/CarlistCards/CarCardContainer";
import background from "../../assets/13646.jpg";
import Loader from "../../compnents/Loader/Loader";
import { useAuth } from "../../Backend/AuthContext";

export default function CarlistPage() {
  const { getAllCars } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const allCars = await getAllCars();
        setCars(allCars);
        setFilteredCars(allCars); // Initialize filteredCars with all cars
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [getAllCars]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      setFilteredCars(
        cars.filter((car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCars(cars); // Reset to all cars if search term is empty
    }
  };

  return (
    <>
      <div className={styles.CarlistpageContainer}>
        <CarlistBackground background={background} />
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Enter your Car"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
        <div className={styles.searchbarcontainer}>
          <SearchBar setFilteredCars={setFilteredCars} cars={cars} />
        </div>
        {loading ? (
          <Loader />
        ) : filteredCars.length > 0 ? (
          <CarCardContainer filteredCars={filteredCars} />
        ) : (
          <div className={styles.VINBack}>
            <div className={styles.VIN}>
              <h1>
                No Car <span>Found</span>
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
