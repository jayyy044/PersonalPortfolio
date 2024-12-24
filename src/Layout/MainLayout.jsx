import React from 'react'
import "./MainLayout.css"
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar/NavBar'


const MainLayout = () => {
  return (
    <>
        <NavBar/>
        <Outlet/>
    </>
  )
}

export default MainLayout