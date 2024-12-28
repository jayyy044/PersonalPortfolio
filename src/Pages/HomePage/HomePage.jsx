import './HomePage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import MeshGlobe from '../../Components/MeshGlobe.jsx'
import CanvasLoader from '../../Components/CanvasLoader.jsx'
import React, {Suspense} from 'react'
import { Leva } from 'leva'


const HomePage = () => {
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
              <PerspectiveCamera makeDefault position={[0, 0, 50]} />
              <MeshGlobe scale={4.5} 
              position={[0, -18, 0]} 
              rotation={[0, -Math.PI/2, 0]} 
               // Pass the rotation state to MeshGlobe
              />
              <OrbitControls enableZoom={true} enableRotate={true} enableDamping={true} dampingFactor={0.05}/>
            </Suspense>
          </Canvas>
        </div>

        
    </div>
  )
}

export default HomePage