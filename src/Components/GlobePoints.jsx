import React, { useRef, useEffect } from 'react'
import gsap from "gsap";



const GlobePoints = ({ visible, position}) => {
  const meshRef = useRef()
  // useEffect(() => {
  //   if (meshRef.current) {
  //     gsap.to(meshRef.current.material, {
  //       opacity: visible ? 1 : 0,
  //       duration: 1,
  //       ease: 'power2.inOut',
  //     });
  //   }
  // }, [visible]);

  return (
    <>
      <mesh
        position={position}
        ref={meshRef}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color= 'red' transparent={true} opacity={visible ? 1 : 0} />
      </mesh>
    </>
  )
}

export default GlobePoints
