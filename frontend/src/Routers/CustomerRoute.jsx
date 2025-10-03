import React from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import { Auth } from '../component/Auth/Auth'
import RestaurantCard from '../component/Restaurant/RestaurantCard'
import { PaymentSuccess } from '../component/PaymentSuccess/PaymentSuccess'

export const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/admin/restaurant/:restaurantId' element={<RestaurantCard />} />
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>

        </Routes>
        <Auth/>
    </div>
  )
}
