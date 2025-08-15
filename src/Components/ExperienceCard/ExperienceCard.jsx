import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import './ExperienceCard.css'

const ExperienceCard = forwardRef((props, ref) => {
  const {fadeindirec, title, timeline, description, amount, mt} = props
  
  const conditionalStyles = {
    ...(fadeindirec !== 'right' && { marginLeft: 'auto' }),
    ...(!mt && { marginTop: '90px' }),
  };

  const sentences = description.split(" -")
  
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: amount }}
      transition={{
        duration: 2,
        ease: "linear",
      }}
      variants={{
        hidden: { opacity: 0, x: fadeindirec == 'right' ? -100 : 100 },
        visible: { opacity: 1, x:0 },
      }}
      className='experienceCardContainer' 
      style={conditionalStyles}
      ref={ref}
    >
        <p className='ExperienceTitle'>{title}</p>
        <p className='ExperienceCompany'>{timeline}</p>
        {sentences.filter(element => element !== null).map(
          (element, index) => (
            <p className = 'ExperienceDescription' key={index}>{element}</p>
          )
        )}
        <div 
          className="tooltip-notch"
          style={fadeindirec === 'right' ? {transform: 'rotate(180deg)', left: '100%'} : {} }>
        </div>
    </motion.section>
  )
})

export default ExperienceCard