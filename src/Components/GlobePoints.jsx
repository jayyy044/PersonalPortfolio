import React, { useState } from 'react'


const GlobePoints = ({ position}) => {
  return (
    <>
      <mesh
        position={position}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color= 'red' />
      </mesh>
    </>
  )
}

export default GlobePoints
