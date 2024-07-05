import React, { useState } from 'react';
import CarlistBackground from '../../compnents/CarlistBackgroung/CarlistBackground';
import background from "../../assets/b.jpg"
import styles from "./index.module.scss";
const VehicleDetails = () => {
  const [vin, setVin] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState(null);

  // Dummy data for demonstration
  const dummyVehicleData = {
    Make: 'Toyota',
    Model: 'Camry',
    'Model Year': '2020',
    Manufacturer: 'Toyota Motor ',
    'Plant Country': 'USA',
    'Plant  Name': 'Toyota Motor.',
    'Plant State': 'KY',
    'Vehicle Type': 'Passenger Car',
    'Body Class': 'Sedan',
    Doors: '4',
    'Drive Type': 'FWD',
    'Engine Number of Cylinders': '4',
    'Engine Displacement (L)': '2.5',
    'Engine Configuration': 'Inline',
    'Fuel Type - Primary': 'Gasoline',
    'Fuel Type - Secondary': 'Electric',
    'Transmission Style': 'Automatic',
    'Transmission Speeds': '8',
    GVWR: 'NA',
    'Brake System Type': 'Hydraulic',
    'Seat Belts Type': 'Manual',
    'Air Bag Loc Front': '1st Row ',
    'Air Bag Loc Side': '1st and 2nd Rows',
    'Air Bag Loc Knee': 'Driver',
    'Other Restraint System Info': '3-point belt',
    'NCSA Body Type': '4-door sedan, hardtop',
    'NCSA Make': 'Toyota',
    'NCSA Model': 'Camry',
    'Other Engine Info': 'VVT-i',
    'Other GVWR Info': 'NA',
    'Other Trailer Info': 'NA',
    Series: 'LE',
    Trim: 'Standard',
    'Base Price': '$24,425',
    MSRP: '$24,970',
  };

  const handleChange = (event) => {
    setVin(event.target.value);
  };

  const handleSubmit = (event) => {
      setVehicleInfo(dummyVehicleData);
      setError('');
  };

  return (
    <div className={styles.VehicleDetailscontainer}>
        <CarlistBackground background={background}/>
        <div className={styles.search}>
          <input type="text" />
          <button onClick={handleSubmit}>Search</button>
        </div>
        <div className={styles.result}>
      {vehicleInfo && (
        <div>
          <h3>{vehicleInfo['Make']} {vehicleInfo['Model']} ({vehicleInfo['Model Year']})</h3>
          {Object.keys(vehicleInfo).map((key) => (
            <div className={styles.item}><strong key={key}>{key}:</strong>
            <p>{vehicleInfo[key]}</p>
            </div>
          ))}
        </div>
      )}
        </div>
    </div>
  );
};

export default VehicleDetails;

