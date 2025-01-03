import './HomePage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MeshGlobe from '../../Components/MeshGlobe.jsx'
import CanvasLoader from '../../Components/CanvasLoader.jsx'
import React, {Suspense, useRef, useState, useEffect} from 'react'
import { useInView } from 'react-intersection-observer';
import ProfilePic from '../../assets/Profile.png'
import { motion, useScroll, useTransform } from "motion/react"
import { useMotionValueEvent } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const [controls , setControls] = useState(true) 

  const ModelContainerRef = useRef()
  const IntroDivRef = useRef()

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Normalized scroll progress hdffhdh:", latest);
  //   // Execute your logic based on the scroll progress (0 to 1)
  //   if (latest > 0.2) {
  //     console.log("Scrolled more than 50%");
  //     setControls(false)
  //     // Your custom logic for 50% scroll progress or beyond
  //   }
  //   else{
  //     setControls(true)
  //   }
  // });

  useEffect(() => {
    gsap.fromTo(
      //Model current state
      ModelContainerRef.current,
      //Initial state of the element we are changing
      { y: 0, x: 0, height: '550px' },
      {
        y: 900,
        x: -800,
        height: '600px',
        ease: "none",
        scrollTrigger: {
          //Triggering animation based on viewport position with reference to intro div
          trigger: IntroDivRef.current,
          start: "top+=90 top",
          end: "bottom+=260 top",
          scrub: true,
          markers: true
        },
      }
    );

    // Cleanup function to remove ScrollTrigger instances
    return () => {
      ScrollTrigger.getById(ModelContainerRef.current)?.kill();
    };
  }, []);
  


  return (
    <main className='PageContainer'>
      <div className='HomePageContainer'>
          <div className="IntroContainer" ref={IntroDivRef}>
              <span>
                <h1>Hi, I'm</h1>
                <h1 style={{marginLeft: '15px',color: 'var(--AccentColor)'}}>
                  Maanas
                </h1>
              </span>
              <span>
                <h3 style={{marginRight: '11px'}}>A</h3> 
                <h3 style={{marginRight: '11px',color: 'var(--AccentColor)'}}>Computer Nano Engineer</h3> 
                <h3>at the University of Alberta</h3>
              </span>
          </div>
          <motion.div className="CanvasContainer" ref={ModelContainerRef}  >
            {/* <Leva /> */}
            <Canvas>
              <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight 
                  position={[10, 10, 10]} 
                  intensity={4} 
                  color="#ffffff"
                />
                <pointLight
                  position={[-10, -5, -10]}
                  intensity={0.5}
                  color="#ffffff"
                />
                <pointLight
                  position={[10, -5, -10]}
                  intensity={0.5}
                  color="#ffffff"
                />
                <spotLight
                  position={[0, -30, 20]}
                  intensity={2}
                  angle={0.3}
                  penumbra={1}
                  distance={200}
                  castShadow
                />
                <spotLight
                  position={[-20, -10, 20]}
                  intensity={1}
                  angle={0.2}
                  penumbra={1}
                  distance={100}
                />
                <spotLight
                  position={[20, -10, 20]}
                  intensity={1}
                  angle={0.2}
                  penumbra={1}
                  distance={100}
                />
                <PerspectiveCamera makeDefault position={[0, 0, 50]} />
                <MeshGlobe
                scale={4} 
                position={[0, -15.5, 0]} 
                // position={[0,-29,0]}
                rotation={[0, -Math.PI/2, 0]} 
                ScrollTrigger = {IntroDivRef}
                // Pass the rotation state to MeshGlobe
                />
                <OrbitControls   
                  enableZoom={false} 
                  enableRotate={controls} 
                  enableDamping={true} 
                  dampingFactor={0.05}
                /> 
              </Suspense>
            </Canvas>
          </motion.div>       
      </div>
      <div className='AboutMeContainer' >
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          variants={{
            hidden: { opacity: 0, translateX: -100 },
            visible: { opacity: 1, translateX: 0 },
          }}
          className='AboutMeSection'>
          <h1>About Me</h1>
          <div className="AboutMeText">
            <p>Hello, I'm Maanas <span className='wave'>👋</span></p>
            <p>
              
              I am Computer-Nano Engineering 
              Student at the University of Alberta. 
              My journey in this field has been fueled 
              by a passion for bringing software to life, 
              whether through crafting innovative projects 
              on Arduino, developing dynamic and responsive 
              websites, or diving into the world of data 
              analysis and visualization.
            </p>
          </div>
        </motion.section>
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}>
          <img src={ProfilePic}/>
        </motion.aside>
      </div>
    </main> 
  )
}

export default HomePage