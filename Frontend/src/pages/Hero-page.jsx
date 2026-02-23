import React, { use } from 'react';
import {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
//import { DragControls, OrbitControls } from '@react-three/drei';
import { AnimatedCan } from '../components/AnimatedCan.js';
import { DirectionalLight } from 'three';
import { Suspense } from 'react';
import labelimage from "/Images/watermelon.png";
import { Environment } from '@react-three/drei';
import Navbar from '../components/Navbar.jsx';
import OrbitControlsWithPointerEvents from '../components/OrbitControls.jsx';
import AnimatedBackground from '../components/HeroBackground.jsx'


function ResponsiveCamera() { //this changes the can sizing depending on the screen
  const { camera, size } = useThree();

  useEffect(() => {// this will run everytime to size of the screen changes
    const isSmall = size.width < 640;
    const isMedium = size.width <= 1024;
    camera.fov = isSmall ? 75 : isMedium ? 67 : 60;
    // camera.position.set(isSmall ? 6.5 : isMedium ? 6 : 5, isSmall ? -1 : 0, 0);
    camera.position.set(0, isSmall ? -1 : 0, isSmall ? 6.5 : isMedium ? 6 : 5)
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  return null;
}

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

const responsiveDrop = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const cameraDistance = camera.position.z;
    const Fov = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(Fov / 2) * distance;
  },[]);
  

  return visibleHeight
}



// function Box() {
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="hotpink" />
//     </mesh>
//   );
// }
gsap.registerPlugin(useGSAP); //registers the GSAP plugin





function HeroPage() {
  visibleHeight = responsiveDrop();

  const drop = -visibleHeight * 0.3;
  return (
    <>

    <section className='relative top-0 left-0 w-full h-screen'>
      <AnimatedBackground />
      <Navbar />
      <div className='relative z-30 justify-center place-items-center '>
        
        <div className='relative pointer-events-none w-full h-[70vh] md:h-[70vh] lg:h-[80vh]'>
          <Canvas camera={{ position: [5, 0, 0], fov: 60 }} className='canvas' style={{ width: '100%', height: '100%' }}>

            <Suspense fallback={null}> {/*suspense is used to delay the rendering of the scene until all assets are loaded*/}

              <ResponsiveCamera />
              {/*The environment and lighting*/}
              <Environment files="/Images/HDR/meadow_2_4k.hdr" background={false} environmentIntensity={1.5}/>

              <ambientLight intensity={1.7}/>
              <directionalLight
                position={[5, 5, 3]}
                intensity={2}
              />
        
      
        
            
             {/* Animated cans */}
              <AnimatedCan
                flavour="strawberry"
                position={[2, drop, 0]}
                scale={0.7}
                dropDelay={0.2}
                rotation = {[0,0, isSmall ? 0.1 : 0]}
              />

              <AnimatedCan
                flavour="watermelon"
                position={[2, drop, 1]}
                scale={0.7}
                dropDelay={0.5}
                rotation = {[0,0, isSmall ? 0.1 : 0]}
              />

              

              <AnimatedCan
                flavour="cherry"
                position={[2 ,drop, -1]} //to-do get height of screen work out percentage
                scale={0.7}
                dropDelay={0.8}
                rotation = {[0,0, isSmall ? 0.1 : 0]}
              />
            
            </Suspense>
 
          </Canvas>
        </div>

       
         

       
      </div>

      <div className='absolute top-0 left-0 w-full  justify-center items-center z-2 pointer-events-none'>
        <h1 className='lg:text-[26vh] text-[10vh]/24 md:text-6xl tracking-wide text-center font-bold text-black mt-24 md:mt-12'>Live Life on <span className='flex flex-col sm:flex-row'>The</span></h1>
        <h1 className='lg:text-[26vh] text-[10vh]  tracking-wide text-center font-bold text-black ml-auto mt-24 md:mt-12'><span></span> Side</h1>
      </div>
      
        
    </section>
    
    
    <section className='relative z-40 mt-96 p-8 text-center'>
      
      <p className='text-lg text-black mb-8'>Discover our range of delicious soda flavors, crafted to quench your thirst and delight your taste buds.</p>
      <button className='bg-white text-brown font-semibold py-2 px-4 rounded hover:bg-gray-200 transition ani'>Shop Now</button>
    </section>
    
    </>
    
  );
}

// document.addEventListener('DOMContentLoaded', function(event) {
//   if (!container) {
//     container = document.getElementById('root1') as HTMLElement;
//     const root = createRoot(container)
//     root.render(<HeroPage />);
//   }
// });


export default HeroPage;