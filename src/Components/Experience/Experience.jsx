import React from 'react'
import './Experience.css'
import { motion } from 'motion/react'

const Experience = () => {
  return (
    <main className='ExperienceContainer'>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        Experience
      </motion.h1>
      {/* <motion.section className='tooltip'>
        <h1>Hello</h1>
        <div class="tooltip-notch"></div>
      </motion.section> */}
    </main>
  )
}

export default Experience