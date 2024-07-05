import React from 'react'
import Landingpage from './pages/LandingPage/Landingpage'
import Header from './compnents/header/header'
import CarDetails from './pages/carDetailsPage/CarDetails'
import { Footer } from './compnents/Footer/Footer'
import CarlistPage from './pages/CarlistPage/CarlistPage'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
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
   </Routes>
   <Footer/>
   </BrowserRouter>
    </>
  )
}

export default App
