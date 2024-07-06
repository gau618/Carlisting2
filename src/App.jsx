import React from 'react'
import Landingpage from './pages/LandingPage/Landingpage'
import Header from './compnents/header/header'
import CarDetails from './pages/carDetailsPage/CarDetails'
import { Footer } from './compnents/Footer/Footer'
import CarlistPage from './pages/CarlistPage/CarlistPage'
import VehicleDetails from './pages/VinPage/Vin'
import Chatbot from './pages/ChatBotPage/ChatBotPage'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SellCarPage from './pages/SellCarPage/SellCarPage'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
   <Header/>
  <Routes>
   <Route path='/' element={ <Landingpage/>}/>
   <Route path='/CarDetails/:id' element={<CarDetails/>}/>
   <Route path='/Carlist' element={<CarlistPage/>}></Route>
   <Route path='/VehicleDetails' element={<VehicleDetails/>}></Route>
   <Route path='/Chatbot' element={<Chatbot/>}></Route>
   <Route path='/SellCar' element={<SellCarPage/>}></Route>
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
