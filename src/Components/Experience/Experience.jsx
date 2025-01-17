import React, { forwardRef, useLayoutEffect, useRef } from 'react'
import './Experience.css'
import { motion } from 'motion/react'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ExperienceCard from '../ExperienceCard/ExperienceCard'
import { UpOutlined } from '@ant-design/icons'
import { scroller } from 'react-scroll'
import { invalidate } from '@react-three/fiber';



gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

const Experience = forwardRef((props, ref) => {
  const experienceTitleRef = useRef()
  const firstExperienceRef = useRef()
  const secondExperienceRef = useRef()
  const thirdExperienceRef = useRef()

  useLayoutEffect(()=>{
    gsap.set(ref.current,{x:-500, y:1400})
      
    const firstExperienceAnimi = gsap.timeline({
      scrollTrigger:{
        trigger: experienceTitleRef.current,
        start: "top-=170 top",
        end: "bottom top",
        scrub: true,
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
        end: "bottom+=360 top",
        scrub: true,
      }
    })

    thirdExperienceAnimi.to(ref.current, {
      motionPath:{
        path: [
          {x:-550, y: 2800},
          {x:520, y: 2790},
        ],
        align: "self",
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
    })

    const fourthExperienceAnimi = gsap.timeline({
      scrollTrigger:{
        trigger: thirdExperienceRef.current,
        start: "top+=350 top",
        end: "bottom+=360 top",
        scrub: true,
      }
    })

    fourthExperienceAnimi.to(ref.current, {
      motionPath:{
        path: [
          {x: 535, y: 3550 },
          { x: -535, y: 3400 }
        ],
        align: "self",
        alignOrigin: [0.5, 0.5]
      },
      ease: 'none'
    })
    
  },[])

  const scrolltoHomePage = () => {
    scroller.scrollTo('HomePageContainer', {
      duration: 5000,
      delay: 0,
      smooth: 'true',
      offset: -200, // Adjust this value based on your layout
    });

    invalidate()
  }
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
      <ExperienceCard 
        ref={firstExperienceRef}
        fadeindirec = {'left'}
        title={'System Process Analyst Co-op'}
        timeline = {"CIBC | Toronto, ON | Jan 2025 - Present"}
        description = {"Developed and implemented process improvements to increase efficiency and productivity."}
        amount={0.35}
        mt = {true}
      />
      <ExperienceCard
        ref={secondExperienceRef}
        fadeindirec = {'right'}
        title={'Software Developer'}
        timeline = {"Speech Dojo | Edmonton, AB | Dec 2025 - Present"}
        description = {"Designed and developed a web application using React and Node.js."}
        amount={0.45}
      />
      <ExperienceCard
        ref={thirdExperienceRef}
        fadeindirec = {'left'}
        title = {"Junior Cloud Solutions Associate"}
        timeline = {"Grismos Solutions | Edmonton, AB | May 2024 - Sept 2024"}
        description = {" -Gained hands-on experience with Oracle Cloud Fusion software to manage enterprise-level databases, user access, and inventory systems -Developed proficiency in setting up and administering Oracle Fusion applications for user management, including role-based access control and system configuration -Enhanced knowledge of ERP systems and cloud computing architecture, focusing on their role in optimizing business operations through cloud-based solutions."}
        amount = {0.35}
      />
      <ExperienceCard
        fadeindirec = {'right'}
        title={'Fuel Cell Research Intern'}
        timeline = {"University of Alberta | Edmonton, AB | Jan 2024 - May 2024"}
        description = {" -Perform data analysis using Python libraries, including Pandas, Numpy, and Matplotlib on the permeability and diffusivity of the microporous gas diffusion layers in proton exchange membrane (PEM) fuel cells at the University of Alberta -Automated the experiment saving 25% per test run through proper file organization and data saving -Administered 3-4 hours of testing a week running experiment on unique gas diffusions layers of varying thickness "}
        amount={0.05}
      />
      <ExperienceCard
        fadeindirec = {'left'}
        title={'Business Admin Lead'}
        timeline = {"Speech Dojo | Edmonton, AB | Sept 2023 - Jan 2025"}
        description = {" -Managed and organized event including open house, yearly competitions in Indianapolis, and STEM night presentations at local junior highs -Designed speeches, presentations, and activities for each of the events -Actively recruited several members through out the year, networking to gain new sponsorships, and gaining positive recognition"}
        amount = {0.15}
      />
      <div className="BackToTop">
        <UpOutlined className='arrowIcon' onClick={scrolltoHomePage}/>
        <p>Back To top</p>
      </div>




    </main>
  )
})

export default Experience