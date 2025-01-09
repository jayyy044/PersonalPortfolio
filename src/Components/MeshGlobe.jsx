import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import GlobePoints from './GlobePoints.jsx'
import Tooltip from './Tooltip.jsx'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MeshGlobe = ({onAboutMeClick, ScrollTrigger,...props}) => {
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
  materials['neoner_light.010'].color.set('#197998')
  materials['neoner_light.010'].emissive.set('#197998')

  //Allowing the change of opacity of the models materials
  const materialKeys = ['neoner_light.008','neoner_light.013']
  materialKeys.forEach(mat => {
      materials[mat].transparent = true;
      materials[mat].opacity = 1;
  })

  useEffect(() => {
    //Scale Animation for Spheres
    gsap.to([OuterSphere.current.scale, InnerSphere.current.scale], {
      x:1.43,
      y:1.43,
      z:1.43,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: "top+=90 top",
        end: "bottom+=260 top",
        scrub: true, // Sync with scroll
      },
    });

    //Position Animation for model(Spheres)
    gsap.to(ModelRef.current.position, {
      y:-27,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: "top+=90 top",
        end: "bottom+=260 top",
        scrub: true, // Sync with scroll
      },
    })

    //Changing Opacity of spheres
    materialKeys.forEach(mat => {
      gsap.to(materials[mat], {
        opacity: 0.09,
        ease: 'none',  
        scrollTrigger: {
          trigger: ScrollTrigger.current, 
          start: 'top+=90 top',  // Start when scroll reaches this position
          end: 'bottom+=260 top',  // End at this position
          scrub: true,  
        },
      });
    })
    //Changing the size of the base
    gsap.to(BaseRef.current.scale,{
      x: 0,
      y: 0,
      z: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: ScrollTrigger.current, 
        start: 'top+=50 top',  // Start when scroll reaches this position
        end: 'bottom+=200 top',  // End at this position
        scrub: true,  
      },
    })

    // Cleanup function for ScrollTrigger when component unmounts
    return () => {
      gsap.killTweensOf([
        OuterSphere.current.scale, 
        InnerSphere.current.scale, 
        ModelRef.current.position
      ]);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRotationEnabled(true)
    }, 500)
  }, [])

  useFrame(() => {
    if (rotationEnabled) {
      ModelRef.current.rotation.y += 0.005
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
        ScrollTrigger={ScrollTrigger}
      />
      <GlobePoints
        position={[2.5, 5.8, 2.3]}
        ScrollTrigger={ScrollTrigger}

      />
      <GlobePoints
        position={[-3.4, 5.8, 0.15]}
        ScrollTrigger={ScrollTrigger}

      />
      <GlobePoints
        position={[1.84, 5, -3]}
        ScrollTrigger={ScrollTrigger}

      />
      <Tooltip
        ScrollTrigger={ScrollTrigger}
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
        ScrollTrigger={ScrollTrigger}
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
        ScrollTrigger={ScrollTrigger}
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
        ScrollTrigger={ScrollTrigger}
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






