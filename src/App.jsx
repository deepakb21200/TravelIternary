import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 
import Layout from './Components/Layout'
 
import HotelDetails from './Components/HotelDetails'
import VehicleDetails from './Components/VehicleDetails'
import ServiceDetails from './Components/ServiceDetails'
import PackageContent from './Components/PackageContent'
import TermsConditions from './Components/TermsConditions'
import BasicDetails from './Components/BasicDetails'
 
 
 
 

function App() {
  return (
     <BrowserRouter>
   <Layout>
      <Routes>
      <Route path="/"  element={<BasicDetails/>}/>


      <Route path="/hotel-details"  element={<HotelDetails/>}/>




      <Route path="/vehicle-details"  element={<VehicleDetails/>}/>



      <Route path="/service-details"  element={<ServiceDetails/>}/>



      <Route path="/package-content"  element={<PackageContent/>}/>



      <Route path="/terms-conditions"  element={<TermsConditions/>}/>


 
     </Routes>

   </Layout>
     </BrowserRouter>
  )
}

export default App