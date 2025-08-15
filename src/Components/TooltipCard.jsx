import gsap from 'gsap';
import React, { useRef, useEffect, useMemo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const TooltipCard = ({ ScrollTrigger, scale, position, rotation, color, ...props }) => {
  const meshRef = useRef();
  
  // Create a rounded rectangle geometry for the tooltip
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 65;  // Made narrower
    const height = 110; // Made taller relative to width
    const radius = 15;  // Smaller radius for better proportions
    
    // Create rounded rectangle path
    shape.moveTo(-width/2 + radius, -height/2);
    shape.lineTo(width/2 - radius, -height/2);
    shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
    shape.lineTo(width/2, height/2 - radius);
    shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
    shape.lineTo(-width/2 + radius, height/2);
    shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
    shape.lineTo(-width/2, -height/2 + radius);
    shape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);
    
    return new THREE.ShapeGeometry(shape);
  }, []);

  const customMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color || 'white',
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      // Add subtle shadow/depth
      emissive: new THREE.Color(0x000000),
      roughness: 0.1,
      metalness: 0.1,
    });
  }, [color]);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(customMaterial, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current,
        start: 'top+=150 top',
        end: 'bottom+=130 top',
        scrub: true,
      },
    });

    gsap.to(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: 'top+=150 top',  
        end: 'bottom+=30 top',  
        scrub: true,
      },
    });

  }, [ScrollTrigger, customMaterial]);

  return (
    <group {...props} dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={customMaterial}
        ref={meshRef}
        scale={scale}
      />
    </group>
  );
};

export default TooltipCard;

// import { useGLTF } from '@react-three/drei';
// import gsap from 'gsap';
// import React, { useRef, useEffect } from 'react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const TooltipCard = ({ ScrollTrigger, scale, position, rotation, color, ...props }) => {
//   const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb');
//   const customMaterial = React.useMemo(() => {
//     const mat = materials.lambert4.clone();
//     mat.color.set(color);
//     mat.transparent = true; 
//     mat.opacity = 1;
//     return mat;
//   }, [materials.lambert4, color]);

//   const meshRef = useRef();

//   useEffect(() => {
//     gsap.to(customMaterial, {
//       opacity: 0,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: ScrollTrigger.current,
//         start: 'top+=150 top',
//         end: 'bottom+=130 top',
//         scrub: true,
//       },
//     });

//     gsap.to(meshRef.current.scale,{
//       x: 0,
//       y: 0,
//       z: 0,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: ScrollTrigger.current, 
//         start: 'top+=150 top',  
//         end: 'bottom+=30 top',  
//         scrub: true,
//       },
//     })

//   }, [ScrollTrigger]);

//   return (
//     <group {...props} dispose={null} position={position} rotation={rotation}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Arctic_Tooltip_lambert4_0.geometry}
//         material={customMaterial}
//         ref={meshRef}
//         scale={scale}
//       />
//     </group>
//   );
// };

// useGLTF.preload('/src/assets/Models/Tooltip.glb');
// export default TooltipCard;
