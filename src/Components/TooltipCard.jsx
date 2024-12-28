import React from 'react'
import { useGLTF } from '@react-three/drei'

const TooltipCard = ({ scale, position, rotation, color, ...props }) => {
  const { nodes, materials } = useGLTF('/src/assets/Models/Tooltip.glb')
  const customMaterial = React.useMemo(() => materials.lambert4.clone(), [materials.lambert4]);

  // Set the custom color for the cloned material
  customMaterial.color.set(color);
  return (
    <group {...props} dispose={null} position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arctic_Tooltip_lambert4_0.geometry}
        material={customMaterial}

        scale={scale}
      />
    </group>
  )
}

useGLTF.preload('/src/assets/Models/Tooltip.glb')
export default TooltipCard