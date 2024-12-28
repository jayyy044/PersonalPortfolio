import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import GlobePoints from './GlobePoints.jsx'
import Tooltip from './Tooltip.jsx'
import { useControls, Leva } from 'leva'



const MeshGlobe = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/src/assets/Models/MeshGlobe.glb') // Corrected path
  const { actions } = useAnimations(animations, group)
  const navigate = useNavigate()
  const [rotationEnabled, setRotationEnabled] = useState(true)

  const controls = useControls({
    positionX: { value: 0, min: -20, max: 20},
    positionY: { value: 0, min: -20, max: 30 },
    positionZ: { value: 0, min: -20, max: 20 },
    rotationX: { value: 0, min: -20, max: 20 },
    rotationY: { value: 0, min: -20, max: 20 },
    rotationZ: { value: 0, min: -20, max: 20 },
  })


  materials['neoner_light.013'].color.set('#ffffff')
  materials['neoner_light.013'].emissive.set('#ffffff')
  materials['neoner_light.010'].color.set('#197998')
  materials['neoner_light.010'].emissive.set('#197998')
  
  // useFrame(() => {
  //   if (rotationEnabled) {
  //     group.current.rotation.y += 0.006
  //   }
  // })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[1.571, 0, 0]}>
          <group
            name="4e3e383e73bb4272b226835d2a9dcc07fbx"
            rotation={[-Math.PI, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Stand" rotation={[Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Stand_neoner_wall004_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Stand_neoner_wall004_0.geometry}
                    material={materials['neoner_wall.004']}
                  />
                  <mesh
                    name="Stand_Material001_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Stand_Material001_0.geometry}
                    material={materials['Material.001']}
                  />
                  <mesh
                    name="Stand_neoner_light010_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Stand_neoner_light010_0.geometry}
                    material={materials['neoner_light.010']}
                  />
                </group>
                <group name="Sphere" rotation={[Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Sphere_neoner_light008_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_neoner_light008_0.geometry}
                    material={materials['neoner_light.008']}
                  />
                </group>
                <group name="Sphere001" rotation={[Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Sphere001_neoner_light013_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001_neoner_light013_0.geometry}
                    material={materials['neoner_light.013']}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
      <GlobePoints
        position={[0.93, 2, 2]}
      />
      <GlobePoints
        position={[2, 7, 1.9]}
      />
      <GlobePoints
        position={[-3.4, 5.8, 0.15]}
      />
      <GlobePoints
        position={[1.84, 5, -3]}
      />
      <Tooltip
        cardPosition={[1.2, 1.5, 2.6]}  
        cardRotation={[0, 2, 2.2]}
        tooltipPosition1={[1.3, 1.12, 2.85]}
        tooltipRotation1={[0, 2.0, 0.64]}
        // tooltipPosition1={[controls.positionX, controls.positionY, controls.positionZ]}  
        // tooltipRotation1={[controls.rotationX, controls.rotationY, controls.rotationZ]}
        // tooltipPosition1={[-14.4, -11.5, 6.8]}
        // tooltipRotation1={[0, 0.4, 6.7]}
        tooltipData={[1]}
        // tooltipPosition2={[-10.5, -9.4, 4.6]}
        // tooltipRotation2={[0, 3.5, -0.43]}
        // onClick={handleTooltipClick} // Pass the click handler
        // onHoverChange={handleHoverChange}
      />  

    </group>
  )
}

useGLTF.preload('/src/assets/Models/MeshGlobe.glb') // Corrected path
export default MeshGlobe

    // tooltipPosition1={[1.4, 1.1, 2.7]}
    // tooltipRotation1={[0, 2.0, 0.64]}
    // tooltipPosition2={[-14.4, -11.5, 6.8]}
    // tooltipRotation2={[0, 0.4, 6.7]} 