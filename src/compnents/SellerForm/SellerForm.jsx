import React, { useState, useCallback } from "react";
import { useAuth } from "../../Backend/AuthContext";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import CustomDropdown from "../CostumDropDown/Dropdown";
import styles from "./index.module.scss";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../PrevModel/Model";
import "react-toastify/dist/ReactToastify.css";

const MAX_CHAR_LIMIT = 200;

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
    Brand: "",
  });
  const [imageName, setImageName] = useState("");
  const [galleryNames, setGalleryNames] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= MAX_CHAR_LIMIT) {
      setCar((prevCar) => ({ ...prevCar, [name]: value }));
    }
  };

  console.log(car);
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
    setLoading(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        mainImageFile,
        croppedArea,
        1920,
        1080
      );
      const croppedFile = new File([croppedImageBlob], mainImageFile.name, {
        type: mainImageFile.type,
      });
      const downloadURL = await uploadImage(croppedFile);
      setCar((prevCar) => ({ ...prevCar, image: downloadURL }));
      setImageName(croppedFile.name);
      setShowCropper(false);
      toast.success("Main image cropped and uploaded successfully");
    } catch (error) {
      toast.error("Failed to crop and upload main image: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryChange = async (e) => {
    setLoading(true);
    const files = Array.from(e.target.files);

    try {
      const galleryUrls = await Promise.all(files.map(uploadImage));

      setCar((prevCar) => ({
        ...prevCar,
        imagegallery: [...prevCar.imagegallery, ...galleryUrls],
      }));

      setGalleryNames((prevNames) => [
        ...prevNames,
        ...files.map((file) => file.name),
      ]);
      toast.success("Gallery images uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload gallery images: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = {
      ...car,
      carId: Date.now(),
      price: `$${car.price}`,
      mileage: `${car.mileage} km`,
    };
    if (car.image && car.imagegallery.length > 0) {
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
          Brand: "",
        });
        setImageName("");
        setGalleryNames([]);
        toast.success("Car data saved successfully");
      } catch (error) {
        toast.error("Error saving car data: " + error.message);
      }
    } else {
      toast.error(`Select Your Images`);
    }
  };

  const handleDropdownSelect = (field, selectedOption) => {
    setCar((prevCar) => ({ ...prevCar, [field]: selectedOption }));
  };
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>
        List Your <span>Car</span>
      </h2>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Car Name</label>
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Car Type</label>
          <CustomDropdown
            options={[
              "Sedan",
              "SUV",
              "Truck",
              "Coupe",
              "Convertible",
              "Hatchback",
              "Van",
            ]}
            placeholder="Select Car Type"
            onSelect={(option) => handleDropdownSelect("carType", option)}
          />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Car Brand</label>
          <CustomDropdown
            options={[
              "Toyota",
              "Honda",
              "Ford",
              "Chevrolet",
              "BMW",
              "Mercedes-Benz",
              "Volkswagen",
              "Audi",
              "Nissan",
              "Hyundai",
              "Lexus",
              "Kia",
              "Subaru",
              "Porsche",
              "Mazda",
            ]}
            placeholder="Select Car Brand"
            onSelect={(option) => handleDropdownSelect("Brand", option)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>VIN</label>
          <input
            type="text"
            name="VIN"
            value={car.VIN}
            onChange={handleChange}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={car.color}
            onChange={handleChange}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Interior Color</label>
          <input
            type="text"
            name="interiorColor"
            value={car.interiorColor}
            onChange={handleChange}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Engine</label>
          <input
            type="text"
            name="engine"
            value={car.engine}
            onChange={handleChange}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Mileage (in km)</label>
          <input
            type="number"
            name="mileage"
            value={car.mileage}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Price (in dollars)</label>
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Transmission</label>
          <CustomDropdown
            options={["Automatic", "Manual"]}
            placeholder="Select Transmission"
            onSelect={(option) => handleDropdownSelect("transmission", option)}
          />
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.formGroup}>
          <label>Fuel</label>
          <CustomDropdown
            options={[
              "Gasoline",
              "Petrol",
              "Diesel",
              "Electric",
              "Hybrid",
              "Solar",
              "Hydrogen",
            ]}
            placeholder="Select Fuel Type"
            onSelect={(option) => handleDropdownSelect("fuel", option)}
          />
        </div>
      </div>
      <div className={styles.imgitems}>
        <div className={styles.Group}>
          <label htmlFor="file" className={styles.custumfileupload}>
            <div className={styles.icon}>
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  fill=""
                />
              </svg>
            </div>
            <div className={styles.text}>
              <span>Choose Main Image</span>
            </div>
            <input
              id="file"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
          {mainImageFile && (
            <div
              className={styles.selectedImage}
              onClick={(e) => {
                console.log(e);
              }}
            >
              <img
                src={mainImageFile ? URL.createObjectURL(mainImageFile) : "#"}
                alt="Selected main"
                onClick={() =>
                  handleImageClick(URL.createObjectURL(mainImageFile))
                }
              />
              <button
                className={styles.buttonx}
                type="button"
                onClick={() => {
                  setMainImageFile(null);
                  setShowCropper(false);
                  setCar((prevCar) => ({ ...prevCar, image: null }));
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className={styles.Group}>
          <label htmlFor="gallery" className={styles.custumfileupload}>
            <div className={styles.icon}>
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  fill=""
                />
              </svg>
            </div>
            <div className={styles.text}>
              <span>Choose Gallery Images</span>
            </div>
            <input
              id="gallery"
              type="file"
              onChange={handleGalleryChange}
              multiple
              accept="image/*"
            />
          </label>
          {galleryNames.length > 0 && (
            <div className={styles.selectedImages}>
              {car.imagegallery.map((url, index) => (
                <div key={index} className={styles.selectedImage}>
                  <img
                    src={url}
                    alt={`Gallery Image ${index}`}
                    onClick={() => handleImageClick(url)}
                  />
                  <button
                    type="button"
                    className={styles.buttonx}
                    onClick={() => {
                      // Update both galleryNames and imagegallery states
                      setGalleryNames((prevNames) =>
                        prevNames.filter((_, i) => i !== index)
                      );
                      setCar((prevCar) => ({
                        ...prevCar,
                        imagegallery: prevCar.imagegallery.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              {car.imagegallery.length > 0 && (
                <button
                  className={styles.addmoreimages}
                  type="button"
                  onClick={() => document.getElementById("gallery").click()}
                >
                  +
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cropmodel}>
        {showCropper && (
          <div className={styles.cropContainer}>
            <Cropper
              image={mainImageFile ? URL.createObjectURL(mainImageFile) : ""}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        {showCropper && (
          <>
            <button type="button" onClick={handleCropSave}>
              {loading ? "Cropping" : "Crop"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCropper(false);
                setMainImageFile(null);
              }}
            >
              {" "}
              Cancel
            </button>
          </>
        )}
      </div>
      {showCropper ? (
        ""
      ) : loading ? (
        <button> Loading...</button>
      ) : (
        <button
          type="submit"
          disabled={loading}
          onClick={() => setMainImageFile(null)}
        >
          {" "}
          Submit
        </button>
      )}
      <Modal show={showModal} image={modalImage} onClose={closeModal} />
    </form>
  );
};

export default SellerForm;
