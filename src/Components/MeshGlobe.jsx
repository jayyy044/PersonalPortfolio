import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import GlobePoints from './GlobePoints.jsx'
import Tooltip from './Tooltip.jsx'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MeshGlobe = ({ onAboutMeClick, introDivScrollTrigger, aboutMeDivScrollTrigger,...props}) => {
  const { nodes, materials, animations } = useGLTF('/src/assets/Models/MeshGlobe.glb') // Corrected path
  const navigate = useNavigate()
  const [rotationEnabled, setRotationEnabled] = useState(false)

  //Creating Refs to preform animations
  const ModelRef = useRef()
  const BaseRef = useRef()
  const OuterSphere = useRef()
  const InnerSphere = useRef()

  const { actions } = useAnimations(animations, ModelRef)

  //Changing Material Colors 
  materials['neoner_light.013'].color.set('#ffffff')
  materials['neoner_light.013'].emissive.set('#ffffff')
  materials['neoner_light.010'].color.set('#ffffff') // Changed button to white
  materials['neoner_light.010'].emissive.set('#ffffff') // Changed button emissive to white
  
  // Change base materials to silver
  materials['neoner_wall.004'].color.set('#c0c0c0') // Silver color for base
  materials['Material.001'].color.set('#e8e8e8') // Light silver for base details

  useLayoutEffect(() => {
    // Set initial states for materials
    gsap.set([materials['neoner_light.008'], materials['neoner_light.013']], {
      transparent: true,
      opacity: 1,
    });
  
    // Scale Animation for Spheres
    gsap.to([OuterSphere.current.scale, InnerSphere.current.scale], {
      x: 1.43,
      y: 1.43,
      z: 1.43,
      ease: 'none',
      scrollTrigger: {
        trigger: introDivScrollTrigger.current,
        start: 'top+=90 top',
        end: 'bottom+=260 top',
        scrub: true,
      },
    });
  
    // Position Animation for Model
    gsap.to(ModelRef.current.position, {
      y: -27,
      ease: 'none',
      scrollTrigger: {
        trigger: introDivScrollTrigger.current,
        start: 'top+=90 top',
        end: 'bottom+=260 top',
        scrub: true,
      },
    });
  
    // Scale Animation for Base
    gsap.to(BaseRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: introDivScrollTrigger.current,
        start: 'top+=50 top',
        end: 'bottom+=120 top',
        scrub: true,
      },
    });
  
    // Opacity Animation: 1 -> 0.09
    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: introDivScrollTrigger.current,
        start: 'top+=90 top',
        end: 'bottom+=260 top',
        scrub: true,
      },
    });

    timeline1.to([materials['neoner_light.008'], materials['neoner_light.013']], {
      opacity: 0.09,
      ease: 'none',
    });
  
    // Opacity Animation: 0.09 -> 1
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: aboutMeDivScrollTrigger.current,
        start: 'top+=90 top',
        end: 'bottom-=150 top',
        scrub: true,
      },
    });

    timeline2.to([materials['neoner_light.008'], materials['neoner_light.013']], {
      opacity: 0.7,
      ease: 'none',
    });
  
    // Cleanup on component unmount
    return () => {
      gsap.killTweensOf([
        OuterSphere.current.scale,
        InnerSphere.current.scale,
        ModelRef.current.position,
        BaseRef.current.scale,
      ]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  

  useEffect(() => {
    setTimeout(() => {
      setRotationEnabled(true)
    }, 500)
  }, [])

  useFrame(() => {
    if (rotationEnabled) {
      // ModelRef.current.rotation.y += 0.005
      ModelRef.current.rotation.y += 0.000000000001

    }
  })

  return (
    <group ref={ModelRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[1.571, 0, 0]}>
          <group
            name="4e3e383e73bb4272b226835d2a9dcc07fbx"
            rotation={[-Math.PI, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Stand" rotation={[Math.PI / 2, 0, 0]} ref={BaseRef}>
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
                    ref={OuterSphere}
                  />
                </group> 
                 <group name="Sphere001" rotation={[Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Sphere001_neoner_light013_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere001_neoner_light013_0.geometry}
                    material={materials['neoner_light.013']}
                    ref={InnerSphere}
                  />
                </group> 
              </group>
            </group>
          </group>
        </group>
      </group>
       <GlobePoints
        position={[0.93, 2, 2]}
        ScrollTrigger={introDivScrollTrigger}
      />
      <GlobePoints
        position={[2.5, 5.8, 2.3]}
        ScrollTrigger={introDivScrollTrigger}

      />
      <GlobePoints
        position={[-3.4, 5.8, 0.15]}
        ScrollTrigger={introDivScrollTrigger}

      />
      <GlobePoints
        position={[1.84, 5, -3]}
        ScrollTrigger={introDivScrollTrigger}

      />
      <Tooltip
        ScrollTrigger={introDivScrollTrigger}
          cardScale={[0.009, 0.011, 0.001]}
        cardPosition={[1.2, 1.5, 2.6]}  
        cardRotation={[0, 2, 2.2]}
        tooltipPosition1={[1.3, 1.12, 2.85]}
        tooltipRotation1={[0, 2.0, 0.64]}
        tooltipData={[1]}
        tooltipPosition2={[1.01, 1.66, 2.15]}
        tooltipRotation2={[0, -1.145, -0.64]}
        onClick={() => navigate('/skills')} // Pass the click handler
        onHoverChange={() => setRotationEnabled(!rotationEnabled)}
      />  
      <Tooltip
        ScrollTrigger={introDivScrollTrigger}
        cardScale={[0.009, 0.015, 0.001]}
        cardPosition={[3.08, 6.27, 2.9]}  
        cardRotation={[-0.4, 2.2, 1.4]}
        tooltipPosition1={[3.442, 6.45, 3.39]}
        tooltipRotation1={[-0.4, 2.2, -0.18]}
        tooltipData={[2]}
        tooltipPosition2={[2.77, 5.86, 2.587]}
        tooltipRotation2={[-0.4, 5.3418, 0.18]}
        onClick={onAboutMeClick} 
        onHoverChange={() => setRotationEnabled(!rotationEnabled)}
      />
      <Tooltip
        ScrollTrigger={introDivScrollTrigger}
        cardScale={[0.009, 0.019, 0.001]}
        cardPosition={[2.31, 5.41, -3.95]}  
        cardRotation={[-18.8, 1.1, -1.23]}
        tooltipPosition1={[1.98, 5.0, -3.35]}
        tooltipRotation1={[-18.8, 1.1, 0.33]}
        tooltipData={[3]}
        tooltipPosition2={[2.68, 5.6, -4.65]}
        tooltipRotation2={[-18.8, -2.04, -0.37]}
        onClick={() => navigate('/projects')} 
        onHoverChange={() => setRotationEnabled(!rotationEnabled)}
      />
      <Tooltip
        ScrollTrigger={introDivScrollTrigger}
        cardScale={[0.009, 0.019, 0.001]}
        cardPosition={[-4.5, 6.28, 0.14]}  
        cardRotation={[0, 0, 1.2]}
        tooltipPosition1={[-5.33, 6.43, 0.14]}
        tooltipRotation1={[0, 0, -0.38]}
        tooltipData={[4]}
        tooltipPosition2={[-3.8, 5.8, 0.15]}
        tooltipRotation2={[0, 3.14 , 0.38 ]}
        onClick={() => navigate('/contact')} 
        onHoverChange={() => setRotationEnabled(!rotationEnabled)}
      />

    </group>
  )
}

useGLTF.preload('/src/assets/Models/MeshGlobe.glb') // Corrected path
export default MeshGlobe
