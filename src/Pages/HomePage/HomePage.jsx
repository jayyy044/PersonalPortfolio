import './HomePage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MeshGlobe from '../../Components/MeshGlobe.jsx'
import CanvasLoader from '../../Components/CanvasLoader.jsx'
import React, {Suspense, useRef, useState, useEffect} from 'react'
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.2) {
      setControls(false)
    }
    else{
      setControls(true)
    }
  });

  useEffect(() => {
    gsap.fromTo(
      //Model current state
      ModelContainerRef.current,
      //Initial state of the element we are changing
      { y: 0, x: 0, height: '550px' },
      {
        y: 900,
        x: -800,
        height: '640px',
        ease: "none",
        scrollTrigger: {
          //Triggering animation based on viewport position with reference to intro div
          trigger: IntroDivRef.current,
          start: "top+=90 top",
          end: "bottom+=260 top",
          scrub: true,
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
          <div className="CanvasContainer" ref={ModelContainerRef}>
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
                rotation={[0, -Math.PI/2, 0]} 
                ScrollTrigger = {IntroDivRef}
                />
                <OrbitControls   
                  enableZoom={false} 
                  enableRotate={controls} 
                  enableDamping={true} 
                  dampingFactor={0.05}
                /> 
              </Suspense>
            </Canvas>
          </div>       
      </div>
      <div className='AboutMeContainer' >
        <motion.section 
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
        </motion.section>
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 3,
            ease: "linear",
          }}
          variants={{
            hidden: { opacity: 0, translateX: 300 },
            visible: { opacity: 1, translateX: 0 },
          }}
          className='ImgAside'>
          <img src={ProfilePic}/>
        </motion.aside>
      </div>
    </main> 
  )
}

export default HomePage