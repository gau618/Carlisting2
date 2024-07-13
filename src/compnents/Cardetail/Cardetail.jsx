import React from 'react';
import styles from "./index.module.scss";
import Loader from "../Loader/Loader"
import { useState, useEffect, useRef } from 'react';
import { IoMdCheckmark } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCircleArrowLeft, FaCircleArrowRight, FaCar, FaOilCan } from "react-icons/fa6";
import { FcEngineering } from "react-icons/fc";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { SiTransmission } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { useAuth } from '../../Backend/AuthContext';

export default function Cardetail({ id, setShowBookingModal }) {
    const [cars, setCars] = useState([]); 
    const [car, setCar] = useState([]); 
    const [activeIndex, setActiveIndex] = useState(null);
    const { getAllCars } = useAuth();
    const scrollRef = useRef(null);
    const [loading,setloading]=useState(false);
    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        setloading(true);
        const fetchCars = async () => {
            try {
                const allCars = await getAllCars();
                setCars(allCars);
            } catch (error) {
                console.log(error);
            }finally{
              setloading(false);
            }
        };

        fetchCars();
    }, [getAllCars]);

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };

    const conditions = [
        {
            title: "Contract and Annexes",
            content: "In addition to the car rental contract to be signed at the time of delivery, a credit card is required from our individual customers. We request our commercial customers to submit their company documents (tax plate, signature slip, ID photocopy)."
        },
        {
            title: "Driving License and Age",
            content: "Details about driving license and age requirements."
        },
        {
            title: "Prices",
            content: "Information about the prices."
        },
        {
            title: "Payments",
            content: "Payment methods and conditions."
        },
        {
            title: "Delivery",
            content: "Information about the delivery process."
        }
    ];

    useEffect(() => {
        const foundCar = cars.find(car => car.carId == id);  
        if (foundCar) {
            setCar(foundCar);
        }
    }, [cars, id]); 

    return (
        <>
        {!loading ?(
            <div className={styles.detailscontainer}>
                <div className={styles.leftcontainer}>
                    <div className={styles.generalinformation}>
                        <h1>General Information</h1>
                        <p>Lorem pretium fermentum quam, sit amet cursus ante sollicitudin velen morbi consesua the miss sustion consation miss orcisition amet iaculis nisan. Lorem pretium fermentum quam sit amet cursus ante sollicitudin velen fermen orbinetion consesua the risus consequation the porttiton.</p>
                        <div className={styles.allpoints}>
                            <div className={styles.point}>
                                <div className={styles.icon}>
                                    <IoMdCheckmark />
                                </div>
                                <p>Comprehensive Warranty Coverage</p> 
                            </div>
                            <div className={styles.point}>
                                <div className={styles.icon}>
                                    <IoMdCheckmark />
                                </div>
                                <p>Free Cancellation & Return</p> 
                            </div>
                            <div className={styles.point}>
                                <div className={styles.icon}>
                                    <IoMdCheckmark />
                                </div>
                                <p>Rent Now Pay When You Arrive</p> 
                            </div>
                        </div>
                    </div>
                    <div className={styles.imagegallery}>
                        <h1>Image Gallery</h1>
                        <FaCircleArrowLeft className={styles.arrowleft} onClick={() => scroll(-300)} />
                        <div className={styles.imagegalleryimages} ref={scrollRef}>
                            {car?.imagegallery?.map((item, index) => (
                                <img key={index} src={item} alt={`Image ${index}`} />
                            ))}
                        </div>
                        <FaCircleArrowRight className={styles.arrowright} onClick={() => scroll(300)} />
                    </div>
                    <div className={styles.bottoncontainer}>
                        <h1>Buy Conditions</h1>
                        <div className={styles.rentalconditions}>
                            {conditions.map((condition, index) => (
                                <div key={index} className={styles.condition}>
                                    <div
                                        className={`${styles.conditionheader} ${activeIndex === index ? styles.active : ''}`}
                                        onClick={() => handleToggle(index)}
                                    >
                                        <span>{index + 1}. {condition.title}</span>
                                        <span>{activeIndex === index ? '▲' : '▼'}</span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className={styles.conditioncontent}>
                                            <p>{condition.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.rightcontainer}>
                    <div className={styles.card}>
                        <div className={styles.priceSection}>
                            <h1>{car.price}</h1>
                        </div>
                        <div className={styles.detailsSection}>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}><BiSolidCategoryAlt /></span>
                                    <span>Category</span>
                                </div>
                                <span>{car.carType}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}>< FcEngineering /></span>
                                    <span>Engine </span>
                                </div>
                                <span>{car.engine}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}><BsFillFuelPumpFill /></span>
                                    <span>Fuel</span>
                                </div>
                                <span>{car.fuel}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}><SiTransmission /></span>
                                    <span>Transmission</span>
                                </div>
                                <span>{car.transmission}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}><IoIosColorPalette /></span>
                                    <span>Color</span>
                                </div>
                                <span>{car.color}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}>< FaCar /></span>
                                    <span>VIN</span>
                                </div>
                                <span>{car.VIN}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <div className={styles.feature}>
                                    <span className={styles.icon}><FaOilCan /></span>
                                    <span>Mileage</span>
                                </div>
                                <span>{car.mileage}</span>
                            </div>
                        </div>
                        <div className={styles.buttonSection}>
                            <button className={styles.rentButton} onClick={() => { setShowBookingModal(true) }}>Buy Now</button>
                            <button className={styles.whatsappButton}>WhatsApp</button>
                        </div>
                    </div>
                </div>
            </div>
        ):<Loader/>}
        </>
    );
}
