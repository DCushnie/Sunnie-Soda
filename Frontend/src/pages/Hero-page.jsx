import React, { use } from 'react';
import {useRef, useEffect, useState} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
//import { DragControls, OrbitControls } from '@react-three/drei';
import useWindowDimensions from '../components/windowdimension.jsx';
import { AnimatedCan } from '../components/AnimatedCan.js';
import { DirectionalLight } from 'three';
import { Suspense } from 'react';
import labelimage from "/Images/watermelon.png";
import { Environment } from '@react-three/drei';
import Navbar from '../components/Navbar.jsx';
import OrbitControlsWithPointerEvents from '../components/OrbitControls.jsx';
import AnimatedBackground from '../components/HeroBackground.jsx';
import Scene from '../components/Scene.jsx';


function ResponsiveCamera() { //this changes the can sizing depending on the screen
  const { camera, size } = useThree();

  useEffect(() => {// this will run everytime to size of the screen changes
    const isSmall = size.width < 640;
    const isMedium = size.width <= 1024;
    camera.fov = isSmall ? 60 : isMedium ? 55 : 35;
    // camera.position.set(isSmall ? 6.5 : isMedium ? 6 : 5, isSmall ? -1 : 0, 0);
    camera.position.set(0, isSmall ? -1 : 0, isSmall ? 6.5 : isMedium ? 6 : 5)
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  return null;
}




gsap.registerPlugin(useGSAP); //registers the GSAP plugin





function HeroPage() {

  const dimensions = useWindowDimensions();
  const isSmall = dimensions.width < 640; 
  const heroPageTextRef = useRef(null);
  const sideHeroPageTextref = useRef(null);
  const [baselineY, setBaselineY] = useState(0);

  useEffect(() => {
    if(!heroPageTextRef.current) return;

    const updatebaseline = () =>{
      if (isSmall){
        const text_rect = sideHeroPageTextref.current.getBoundingClientRect()
        setBaselineY(text_rect.top)
      }else{
        const text_rect = heroPageTextRef.current.getBoundingClientRect()
        setBaselineY(text_rect.bottom)
      }
    };

    updatebaseline();
    window.addEventListener("resize", updatebaseline);

    return () => window.removeEventListener("resize", updatebaseline);
    
  }, []);

  return (
    <>

    <section className='relative top-0 left-0 w-full h-screen'>
      <AnimatedBackground />
      <Navbar />
      <div className='relative z-30 justify-center place-items-center '>
        
        <div className='relative pointer-events-none w-full h-[70vh] md:h-[70vh] lg:h-[80vh]'>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className='canvas' style={{ width: '100%', height: '100%' }}>

            <Suspense fallback={null}> {/*suspense is used to delay the rendering of the scene until all assets are loaded*/}

              <ResponsiveCamera />
              {/*The environment and lighting*/}
              <Environment files="/Images/HDR/meadow_2_4k.hdr" background={false} environmentIntensity={1.5}/>

              <ambientLight intensity={1.7}/>
              <directionalLight
                position={[5, 5, 3]}
                intensity={2}
              />
              <Scene baselineY={baselineY} />
      
        
            
             
            
            </Suspense>
 
          </Canvas>
        </div>

       
         

       
      </div>

      <div className='absolute top-0 left-0 w-full  justify-center items-center z-2 pointer-events-none'>
        <h1  className='lg:text-[26vh] text-[10vh]/24 md:text-6xl tracking-wide text-center font-bold text-black mt-24 md:mt-12'>Live Life on <span ref={heroPageTextRef} className='flex flex-col sm:flex-row mb-24'>The</span></h1>
        <h1 ref={sideHeroPageTextref}  className='lg:text-[26vh] text-[10vh]  tracking-wide text-center font-bold text-black ml-auto'><span></span> Side</h1>
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