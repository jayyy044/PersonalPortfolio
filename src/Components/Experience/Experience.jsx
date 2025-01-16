import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import './Experience.css'
import { motion } from 'motion/react'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

const Experience = forwardRef((props, ref) => {
  const experienceTitleRef = useRef()
  const firstExperienceRef = useRef()
  const secondExperienceRef = useRef()

  useLayoutEffect(()=>{
    gsap.set(ref.current,{x:-500, y:1400})
      
    const firstExperienceAnimi = gsap.timeline({
      scrollTrigger:{
        trigger: experienceTitleRef.current,
        start: "top-=170 top",
        end: "bottom top",
        scrub: true,
        markers: true
      }
    })

    firstExperienceAnimi.to( ref.current,{
      motionPath: {
        path: [
          {x:-450, y:1760},
          {x:540, y:1745},
        ],
        align: "self",
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
      }
    )

    const secondExperienceAnimi = gsap.timeline({
      scrollTrigger:{
        trigger: firstExperienceRef.current,
        start: "top-=20 top",
        end: "bottom top",
        scrub: true,
        markers: true
      }
    })
    secondExperienceAnimi.to(ref.current,{
      motionPath: {
        path: [
          {x:560, y:2145},
          {x:-520, y:2115},
        ],
        align: "self",
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
    })

    const thirdExperienceAnimi = gsap.timeline({
      scrollTrigger:{
        trigger: secondExperienceRef.current,
        start: "top-=20 top",
        end: "bottom top",
        scrub: true,
        markers: true
      }
    })

    thirdExperienceAnimi.to(ref.current, {
      motionPath:{
        path: [],
        align: "self",
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
    })
  },[])
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
        ref={experienceTitleRef}
      >
        Experience
      </motion.h1>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
        variants={{
          hidden: { opacity: 0, x:100 },
          visible: { opacity: 1, x:0 },
        }}
        className='tooltip' 
        ref={firstExperienceRef}
        style={{marginLeft: 'auto'}}
      >
        <p className='ExperienceTitle'>System Proces Analyst Co-op</p>
        <p className='ExperienceCompany'>CIBC | Toronto, ON | Jan 2025 - Present</p>
        <p>Developed and implemented process improvements to increase efficiency and productivity.</p>
        <div className="tooltip-notch"
          style={{
            left: '-43px',
            borderWidth: '50px 45px 50px 0'
          }}
        ></div>
      </motion.section>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
        variants={{
          hidden: { opacity: 0, x:-100 },
          visible: { opacity: 1, x:0 },
        }}
        className='tooltip' 
        ref={secondExperienceRef}
        style={{marginTop: '55px'}}
      >
        <p className='ExperienceTitle'>Software Developer</p>
        <p className='ExperienceCompany'>Speech Dojo | Edmonton, AB | Dec 2025 - Present</p>
        <p>Developed and implemented process improvements to increase efficiency and productivity.</p>
        <div className="tooltip-notch"
          style={{
            left:'100%',
            borderWidth: '50px 45px 50px 0',
            transform: 'rotate(180deg)',
          }}></div>
      </motion.section>

      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
        variants={{
          hidden: { opacity: 0, x:100 },
          visible: { opacity: 1, x:0 },
        }}
        className='tooltip' 
        style={{marginLeft: 'auto',marginTop: '55px'}}
      >
        <p className='ExperienceTitle'>Junior Cloud Solutions Associate </p>
        <p className='ExperienceCompany'> Grismos Solutions | Edmonton, AB | May 2024 - Sept 2024</p>
        <p>
          - Gained hands-on experience with Oracle Cloud Fusion software to manage enterprise-level databases, user access, and inventory systems.
          - Developed proficiency in setting up and administering Oracle Fusion applications for user management, including role-based access control and system configuration.
          - Enhanced knowledge of ERP systems and cloud computing architecture, focusing on their role in optimizing business operations through cloud-based solutions.
        </p>
        <div className="tooltip-notch"
          style={{
            left: '-43px',
            borderWidth: '50px 45px 50px 0',
          }}
        ></div>
      </motion.section>



    </main>
  )
})

export default Experience