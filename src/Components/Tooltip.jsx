import React, { useState } from 'react'
import TooltipCard from './TooltipCard'
import { Text3D } from '@react-three/drei'

const Tooltip = ({
    cardPosition, 
    cardRotation, 
    tooltipData, // Array containing the data
    tooltipPosition1, 
    tooltipRotation1,
    tooltipPosition2, 
    tooltipRotation2,     
    onClick, // Click handler
    onHoverChange // Hover change handler
    }) => {
  
  // Determine the tooltip text based on the first element of the array
  let tooltipText = ''
  if (Array.isArray(tooltipData) && tooltipData.length > 0) {
    switch (tooltipData[0]) {
      case 1:
        tooltipText = "Skills"
        break
      case 2:
        tooltipText = "Experience"
        break
      case 3:
        tooltipText = "Projects"
        break
      default:
        tooltipText = "Default Text"
    }
  }

  // State to manage hover effect
  const [isHovered, setIsHovered] = useState(false)

  // Handle hover state change
  const handlePointerOver = () => {
    setIsHovered(true)
    if (onHoverChange) onHoverChange(true)
  }

  const handlePointerOut = () => {
    setIsHovered(false)
    if (onHoverChange) onHoverChange(false)
  }

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={onClick}
    >
        <TooltipCard
            position={cardPosition}
            rotation={cardRotation}
            color={isHovered ? 'black' : 'white' } // Change color on hover
        />
        <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json" 
            size={0.31} 
            height={0.1} 
            curveSegments={12} 
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={tooltipPosition1}
            rotation={tooltipRotation1} 
        >
            {tooltipText}
            <meshStandardMaterial 
              color="rgb(32, 143, 180)" 
            />
        </Text3D>
        <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json" 
            size={1.5} 
            height={0.1} 
            curveSegments={12} 
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={tooltipPosition2}
            rotation={tooltipRotation2}
        >
            {tooltipText}
            <meshStandardMaterial 
            color="rgb(26, 114, 143)" 
            emissive="rgb(32, 143, 180)" 
            emissiveIntensity={0.8} 
            />
        </Text3D>
    </group>
  )
}

export default Tooltip