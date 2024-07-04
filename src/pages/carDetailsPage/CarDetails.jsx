import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CardetailsBackground from '../../compnents/CardetailsBackground/CardetailsBackground';
import Cardetail from '../../compnents/Cardetail/Cardetail';
import BookingForm from '../../compnents/BuyCarform/BuyCarform';
import { IoMdClose } from "react-icons/io";

import './index.css'; // Import CSS file

export default function CarDetails() {
  const { id } = useParams();
  const [showBookingModal, setShowBookingModal] = useState(false);


  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  return (
    <>
      <div className='detailsContainer'>
        <CardetailsBackground id={id}/>
        <Cardetail id={id} setShowBookingModal={setShowBookingModal}/>
        <div className="carbookingModel" style={{ display: showBookingModal ? 'block' : 'none' }}>
          <div className="modalContent">
            <button className="closeButton" onClick={closeBookingModal}><IoMdClose/></button>
            <BookingForm/>
          </div>
        </div>
      </div>
    </>
  );
}
