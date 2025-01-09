import React from 'react'
import './NavBar.css'
import Logo from '../../assets/Logo.png'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

const NavBar = () => {
  return (
    <div className='NavBarContainer'>
        <img src={Logo} alt='Logo' className='LogoImg' />
        <div className="NavLinks">
            <RouterLink to='/'>Home</RouterLink>
            <ScrollLink 
              to='AboutMeContainer'
              smooth={true}
              duration={3000}
              offset={-200}
              >About</ScrollLink>
            <RouterLink to='/Skills'>Skills</RouterLink>
            <RouterLink to='/Projects'>Projects</RouterLink> 
            <RouterLink to='/Contact'>Contact</RouterLink> 
        </div>
    </div>
  )
}

export default NavBar