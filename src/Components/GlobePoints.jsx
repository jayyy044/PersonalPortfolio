import React, { useRef, useEffect } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobePoints = ({ ScrollTrigger, position}) => {
  const meshRef = useRef()
  useEffect(() => {
    gsap.to(meshRef.current.material, {
      opacity:0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: 'top+=25 top',  
        end: 'bottom+=90 top',  
        scrub: true,  
        markers: true
      },
    });
  }, []);

  return (
    <>
      <mesh
        position={position}
        ref={meshRef}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color= 'red' transparent={true} opacity={1} />
      </mesh>
    </>
  )
}

export default GlobePoints
