import React from 'react'
import { useGLTF } from '@react-three/drei'

const TooltipCard = ({ position, rotation,color, ...props }) => {
  const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb')

  return (
    <group {...props} dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arctic_Tooltip_lambert4_0.geometry}
        material={materials.lambert4}
        material-color={color}
        scale={[0.009, 0.010, 0.001]}
        // scale={[0.01, 0.01, 0.005]}
      />
    </group>
  )
}

useGLTF.preload('/src/assets/Models/Tooltip.glb')
export default TooltipCard