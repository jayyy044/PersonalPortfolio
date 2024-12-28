import './HomePage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MeshGlobe from '../../Components/MeshGlobe.jsx'
import CanvasLoader from '../../Components/CanvasLoader.jsx'
import React, {Suspense, useState} from 'react'
import Tooltip from '../../Components/Tooltip.jsx'
import { useControls, Leva } from 'leva'
import { useNavigate } from 'react-router-dom'







const HomePage = () => {
  const [rotationEnabled, setRotationEnabled] = useState(true)
  const navigate = useNavigate()
  const controls = useControls({
    positionX: { value: 0, min: -20, max: 20},
    positionY: { value: 0, min: -20, max: 30 },
    positionZ: { value: 0, min: -20, max: 20 },
    rotationX: { value: 0, min: -20, max: 20 },
    rotationY: { value: 0, min: -20, max: 20 },
    rotationZ: { value: 0, min: -20, max: 20 },
  })

  const handleTooltipClick = (path) => {
    navigate(path)
  }

  const handleHoverChange = (isHovered) => {
    setRotationEnabled(!isHovered)
  }

  return (
    <div className='HomePageContainer'>
        <div className="IntroContainer">
            <span>
              <h1>Hi, I'm</h1>
              <h1 style={{marginLeft: '15px',color: 'var(--AccentColor)'}}>
                Maanas
              </h1>
            </span>
            <span>
              <h3 style={{marginRight: '11px'}}>A</h3> 
              <h3 style={{marginRight: '11px',color: 'var(--AccentColor)'}}>Computer Nano Engineer</h3> 
              <h3>at the University of Alberta</h3>
            </span>
        </div>
        <div className="CanvasContainer">
          <Leva />
          <Canvas>
            <Suspense fallback={<CanvasLoader />}>
              <ambientLight intensity={0.5} />
              <directionalLight 
                position={[10, 10, 10]} 
                intensity={4} 
                color="#ffffff"
              />
              <pointLight
                position={[-10, -5, -10]}
                intensity={0.5}
                color="#ffffff"
              />
              <pointLight
                position={[10, -5, -10]}
                intensity={0.5}
                color="#ffffff"
              />
              <spotLight
                position={[0, -30, 20]}
                intensity={2}
                angle={0.3}
                penumbra={1}
                distance={200}
                castShadow
              />
              <spotLight
                position={[-20, -10, 20]}
                intensity={1}
                angle={0.2}
                penumbra={1}
                distance={100}
              />
              <spotLight
                position={[20, -10, 20]}
                intensity={1}
                angle={0.2}
                penumbra={1}
                distance={100}
              />

              {/*Skills Tooltip */}
              {/* <Tooltip
                cardPosition={[-12.8, -9.8, 5.8]}  
                cardRotation={[0, 0.4, -4.3]}
                tooltipPosition1={[-14.4, -11.5, 6.8]}
                tooltipRotation1={[0, 0.4, 6.7]}
                tooltipData={[1]}
                tooltipPosition2={[-10.5, -9.4, 4.6]}
                tooltipRotation2={[0, 3.5, -0.43]}
                onClick={handleTooltipClick} // Pass the click handler
                onHoverChange={handleHoverChange}
              /> */}
            
              {/*Experience Tooltip */}

                {/* <Tooltip
                  position={[controls.positionX, controls.positionY, controls.positionZ]}
                  rotation={[controls.rotationX, controls.rotationY, controls.rotationZ]}
                />
                <Tooltip
                  position={[controls.positionX, controls.positionY, controls.positionZ]}
                  rotation={[controls.rotationX, controls.rotationY, controls.rotationZ]}
                /> */}
              {/* </group> */}

              <PerspectiveCamera makeDefault position={[0, 0, 50]} />
              <MeshGlobe scale={4.5} 
              position={[0, -17, 0]} 
              rotation={[0, -Math.PI/2, 0]} 
              rotationEnabled={rotationEnabled} // Pass the rotation state to MeshGlobe
              />
              
              <OrbitControls enableZoom={true} enableRotate={true} enableDamping={true} dampingFactor={0.05}/>
            </Suspense>
          </Canvas>
        </div>

        
    </div>
  )
}

export default HomePage