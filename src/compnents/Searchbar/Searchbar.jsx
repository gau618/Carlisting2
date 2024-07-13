import React, { useState, useEffect } from 'react';
import CustomDropdown from '../CostumDropDown/Dropdown';
import styles from "./index.module.scss";
import { useAuth } from '../../Backend/AuthContext';

const SearchBar = ({ setFilteredCars }) => {
  const { getAllCars } = useAuth();
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredCarNames, setFilteredCarNames] = useState([]);
  const [filteredFuels, setFilteredFuels] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCarName, setSelectedCarName] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const allCars = await getAllCars();
        setCars(allCars);

        const uniqueCompanies = [...new Set(allCars.map(car => car.name.split(' ')[0]))];
        setFilteredCompanies(uniqueCompanies);

        const uniqueCarNames = [...new Set(allCars.map(car => car.name))];
        setFilteredCarNames(uniqueCarNames);

        const uniqueFuels = [...new Set(allCars.map(car => car.fuel))];
        setFilteredFuels(uniqueFuels);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [getAllCars]);

  useEffect(() => {
    let filteredCars = cars;

    if (selectedCompany) {
      filteredCars = filteredCars.filter(car => car.name.startsWith(selectedCompany));
    }
    if (selectedCarName) {
      filteredCars = filteredCars.filter(car => car.name === selectedCarName);
    }
    if (selectedPriceRange) {
      if (selectedPriceRange === 'Under $60,000') {
        filteredCars = filteredCars.filter(car => parseInt(car.price.replace('$', '').replace(',', '')) < 60000);
      } else if (selectedPriceRange === '$60,000 - $80,000') {
        filteredCars = filteredCars.filter(car => {
          const price = parseInt(car.price.replace('$', '').replace(',', ''));
          return price >= 60000 && price <= 80000;
        });
      } else if (selectedPriceRange === 'Over $80,000') {
        filteredCars = filteredCars.filter(car => parseInt(car.price.replace('$', '').replace(',', '')) > 80000);
      }
    }
    if (selectedFuel) {
      filteredCars = filteredCars.filter(car => car.fuel === selectedFuel);
    }

    setFilteredCars(filteredCars);
  }, [selectedCompany, selectedCarName, selectedPriceRange, selectedFuel, cars, setFilteredCars]);

  return (
    <div className={styles.searchbar}>
      <CustomDropdown options={filteredCompanies} placeholder="Company" onSelect={setSelectedCompany} />
      <CustomDropdown options={filteredCarNames} placeholder="Car Name" onSelect={setSelectedCarName} />
      <CustomDropdown options={['Under $60,000', '$60,000 - $80,000', 'Over $80,000']} placeholder="Price Range" onSelect={setSelectedPriceRange} />
      <CustomDropdown options={filteredFuels} placeholder="Fuel" onSelect={setSelectedFuel} />
    </div>
  );
};

export default SearchBar;
