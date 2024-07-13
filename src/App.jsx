import React from 'react'
import Landingpage from './pages/LandingPage/Landingpage'
import Header from './compnents/header/header'
import CarDetails from './pages/carDetailsPage/CarDetails'
import { Footer } from './compnents/Footer/Footer'
import CarlistPage from './pages/CarlistPage/CarlistPage'
import VehicleDetails from './pages/VinPage/Vin'
import Chatbot from './pages/ChatBotPage/ChatBotPage'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Blogpage from './pages/blogpage/blogpage'
import { AuthProvider } from './Backend/AuthContext'
import Loader from './compnents/Loader/Loader'
import SellCarPage from './pages/SellCarPage/SellCarPage'
import AuthForm from "./compnents/Auth/AuthForm"
import './App.css'
function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
   <Header/>
  <Routes>
   <Route path='/' element={ <Landingpage/>}/>
   <Route path='/Auth' element={<AuthForm/>}/>
   <Route path='/CarDetails/:id' element={<CarDetails/>}/>
   <Route path='/Carlist' element={<CarlistPage/>}></Route>
   <Route path='/VehicleDetails' element={<VehicleDetails/>}></Route>
   <Route path='/Chatbot' element={<Chatbot/>}></Route>
   <Route path='/SellCar' element={<SellCarPage/>}></Route>
   <Route path='/Blogs' element={<Blogpage/>}></Route>
   </Routes>
   <Footer/>
   </BrowserRouter>
   </AuthProvider>
    </>
  )
}

export default App
