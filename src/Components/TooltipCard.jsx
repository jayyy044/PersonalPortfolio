import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TooltipCard = ({ ScrollTrigger, scale, position, rotation, color, ...props }) => {
  const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb');
  const customMaterial = React.useMemo(() => {
    const mat = materials.lambert4.clone();
    mat.color.set(color);
    mat.transparent = true; // Ensure transparency is enabled
    mat.opacity = 1;
    return mat;
  }, [materials.lambert4, color]);

  const meshRef = useRef();

  useEffect(() => {
    gsap.to(customMaterial, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current,
        start: 'top+=150 top',
        end: 'bottom+=130 top',
        scrub: true,
        markers: true
      },
    });

    gsap.to(meshRef.current.scale,{
      x: 0,
      y: 0,
      z: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: 'top+=150 top',  
        end: 'bottom+=30 top',  
        markers: true,  
        scrub: true,
      },
    })

  }, [ScrollTrigger]);

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
  );
};

useGLTF.preload('/src/assets/Models/Tooltip.glb');
export default TooltipCard;
