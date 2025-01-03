import { useGLTF } from '@react-three/drei'
import gsap from "gsap";
import React, { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



const TooltipCard = ({ ScrollTrigger, scale, position, rotation, color, ...props }) => {
  const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb')
  const customMaterial = React.useMemo(() => materials.lambert4.clone(), [materials.lambert4]);
  customMaterial.color.set(color);
  customMaterial.transparent = true;
  customMaterial.opacity = 1
  const meshRef = useRef()
  useEffect(() => {
    gsap.to(meshRef.current.material, {
      opacity:0,
      ease: 'none',
      scrollTrigger:{
        trigger: ScrollTrigger.current, 
        start: 'top+=150 top',  
        end: 'bottom+=130 top',  
        scrub: true,
      }
    });
  }, []);
  return (
    <group {...props} dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arctic_Tooltip_lambert4_0.geometry}
        material={customMaterial}
        ref={meshRef}
        scale={scale}
      />
    </group>
  )
}

useGLTF.preload('/src/assets/Models/Tooltip.glb')
export default TooltipCard