import React from 'react'
import './NavBar.css'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='NavBarContainer'>
        <img src={Logo} alt='Logo' className='LogoImg' />
        <div className="NavLinks">
            <Link to='/'>Home</Link>
            <Link to='/About'>About</Link>
            <Link to='/Skills'>Skills</Link>
            <Link to='/Projects'>Projects</Link> 
            <Link to='/Contact'>Contact</Link> 
        </div>
    </div>
  )
}

export default NavBar