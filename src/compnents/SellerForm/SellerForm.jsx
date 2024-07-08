import React, { useState, useCallback } from "react";
import { useAuth } from '../../Backend/AuthContext';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
 // Helper function to handle image cropping
import styles from "./index.module.scss";

const SellerForm = () => {
  const { uploadImage, saveCarData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState({
    name: "",
    image: "",
    imagegallery: [],
    carType: "",
    engine: "",
    color: "",
    VIN: "",
    mileage: "",
    interiorColor: "",
    price: "",
    transmission: "",
    fuel: "",
  });
  const [imageName, setImageName] = useState("");
  const [galleryNames, setGalleryNames] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setShowCropper(true);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    setLoading(true)
    try {
      const croppedImageBlob = await getCroppedImg(mainImageFile, croppedArea, 1920, 1080);
      const croppedFile = new File([croppedImageBlob], mainImageFile.name, { type: mainImageFile.type });
      const downloadURL = await uploadImage(croppedFile);
      setCar((prevCar) => ({ ...prevCar, image: downloadURL }));
      setImageName(croppedFile.name);
      setShowCropper(false);
    } catch (error) {
      alert("Failed to crop and upload main image: " + error.message);
    }finally{
      setLoading(false);
    }
  };

  const handleGalleryChange = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);

    try {
      const galleryUrls = await Promise.all(files.map(uploadImage));
      console.log("Gallery URLs:", galleryUrls); // Check URLs received from uploadImage

      // Update car state with galleryUrls
      setCar((prevCar) => ({
        ...prevCar,
        imagegallery: galleryUrls,
      }));

      // Update galleryNames state with file names
      setGalleryNames(files.map((file) => file.name));

    } catch (error) {
      alert("Failed to upload gallery images: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = {
      ...car,
      carId: Date.now(),
    };

    try {
      await saveCarData(newCar);
      setCar({
        name: "",
        image: "",
        imagegallery: [],
        carType: "",
        engine: "",
        color: "",
        VIN: "",
        mileage: "",
        interiorColor: "",
        price: "",
        transmission: "",
        fuel: "",
      });
      setImageName("");
      setGalleryNames([]);
    } catch (error) {
      console.error("Error saving car data: ", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>
        List Your <span>Car</span>
      </h2>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Car Name</label>
          <input type="text" name="name" value={car.name} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Car Type</label>
          <input type="text" name="carType" value={car.carType} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Color</label>
          <input type="text" name="color" value={car.color} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Interior Color</label>
          <input type="text" name="interiorColor" value={car.interiorColor} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Engine</label>
          <input type="text" name="engine" value={car.engine} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Mileage</label>
          <input type="text" name="mileage" value={car.mileage} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Price</label>
          <input type="text" name="price" value={car.price} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Transmission</label>
          <input type="text" name="transmission" value={car.transmission} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Fuel</label>
          <input type="text" name="fuel" value={car.fuel} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>VIN</label>
          <input type="text" name="VIN" value={car.VIN} onChange={handleChange} required />
        </div>
      </div>
      <div className={styles.imgitems}>
        <div className={styles.Group}>
          <label htmlFor="file" className={styles.custumfileupload}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                 d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""
                />
              </svg>
            </div>
            <div className={styles.text}>
              <span>Choose Main Image</span>
            </div>
            <input id="file" type="file" onChange={handleImageChange} />
          </label>
        </div>
        <div className={styles.Group}>
          <label htmlFor="gallery" className={styles.custumfileupload}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""
                />
              </svg>
            </div>
            <div className={styles.text}>
              <span>Choose Gallery Images</span>
            </div>
            <input id="gallery" type="file" onChange={handleGalleryChange} multiple />
          </label>
        </div>
      </div>
      {showCropper && (
        <div className={styles.cropContainer}>
          <Cropper
            image={URL.createObjectURL(mainImageFile)}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}
      {showCropper &&<button type="button" onClick={handleCropSave}>
      {loading ? "Croping" : "Crop"}
     </button>}
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default SellerForm;
