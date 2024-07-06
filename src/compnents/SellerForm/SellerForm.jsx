import React, { useState } from 'react';
import styles from './index.module.scss';

const SellerForm = () => {
  const [car, setCar] = useState({
    name: '',
    image: '',
    imagegallery: [],
    carType: '',
    engine: '',
    color: '',
    VIN: '',
    mileage: '',
    interiorColor: '',
    price: '',
    transmission: '',
    fuel: '',
  });

  const [imageName, setImageName] = useState('');
  const [galleryNames, setGalleryNames] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCar((prevCar) => ({ ...prevCar, image: reader.result }));
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      })
    ).then((images) => {
      setCar((prevCar) => ({ ...prevCar, imagegallery: images }));
      setGalleryNames(files.map((file) => file.name));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCar = {
      carId: Date.now(),
      name: formData.get('name'),
      image: car.image,
      imagegallery: car.imagegallery,
      carType: formData.get('carType'),
      engine: formData.get('engine'),
      color: formData.get('color'),
      VIN: formData.get('VIN'),
      mileage: formData.get('mileage'),
      interiorColor: formData.get('interiorColor'),
      price: formData.get('price'),
      transmission: formData.get('transmission'),
      fuel: formData.get('fuel'),
    };
    console.log(newCar);
    setCar(newCar);
    e.target.reset();
    setImageName('');
    setGalleryNames([]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>List Your <span>Car</span></h2>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Car Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Car Type</label>
          <input type="text" name="carType" onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Color</label>
          <input type="text" name="color" onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Interior Color</label>
          <input type="text" name="interiorColor" onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Engine</label>
          <input type="text" name="engine" onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Mileage</label>
          <input type="text" name="mileage" onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Price</label>
          <input type="text" name="price" onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Transmission</label>
          <input type="text" name="transmission" onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Fuel</label>
          <input type="text" name="fuel" onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>VIN</label>
          <input type="text" name="VIN" onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.imgitems}>
      <div className={styles.Group}>
        <label htmlFor="mainImage" className={styles.customFileInput}>
          {imageName || "Choose Main Image"}
        </label>
        <input
          type="file"
          id="mainImage"
          name="image"
          onChange={handleImageChange}
          className={styles.fileInput}
          required
        />
      </div>
      <div className={styles.Group}>
        <label htmlFor="imageGallery" className={styles.customFileInput}>
          {galleryNames.length > 0 ? galleryNames.join(', ') : "Choose Image Gallery"}
        </label>
        <input
          type="file"
          id="imageGallery"
          name="imagegallery"
          multiple
          onChange={handleGalleryChange}
          className={styles.fileInput}
        />
      </div>
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default SellerForm;
