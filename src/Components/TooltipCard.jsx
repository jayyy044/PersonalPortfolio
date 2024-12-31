import { useGLTF } from '@react-three/drei'
import gsap from "gsap";
import React, { useRef, useEffect } from 'react'



const TooltipCard = ({ visible, scale, position, rotation, color, ...props }) => {
  const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb')
  const customMaterial = React.useMemo(() => materials.lambert4.clone(), [materials.lambert4]);
  customMaterial.color.set(color);
  customMaterial.transparent = true;
  customMaterial.opacity = 1
  const meshRef = useRef()
  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.material, {
        opacity: visible ? 1 : 0,
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, [visible]);
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