import React, { forwardRef } from 'react'
import ProfilePic from '../../assets/Profile.png'
import Unavailable from '../../assets/UnavailableProfilePic.png'
import {motion} from "motion/react"
import './AboutMe.css'

const AboutMe = forwardRef((props, ref) => {
  return (
    <div className='AboutMeContainer' ref={ref}>
        <motion.article 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.27 }}
          transition={{
            duration: 2,
            ease: "linear",
          }}
          variants={{
            hidden: { opacity: 0, translateX: 100 },
            visible: { opacity: 1, translateX: 0 },
          }}
          className='AboutMeSection'>
          <h1>About Me</h1>
          <div className="AboutMeText">
            <p>Hello, I'm Maanas <span className='wave'>👋</span></p>
            <p>
            I am a Computer-Nano Engineering student at the University of Alberta, passionate about creating impactful solutions. From developing embedded systems projects and dynamic websites to experimenting with machine learning models and exploring data visualization, I am dedicated to bringing software to life in meaningful ways.
            </p>
          </div>
        </motion.article>
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 2.45,
            ease: "linear",
          }}
          variants={{
            hidden: { opacity: 0, translateX: 300 },
            visible: { opacity: 1, translateX: 0 },
          }}
          className='ImgAside'>
          {/* <img src={ProfilePic} alt='Image'/> */}
          <img src={Unavailable} alt='Image'/>
        </motion.aside>
    </div>
  )
})

export default AboutMe