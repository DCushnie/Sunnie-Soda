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
  const EntireHeroPageTextref = useRef(null);
  const canvasInfo = useRef(null);
  const [sideTextPos, setsideTextPos] = useState(0);
  const [maintextPos, setmaintextPos] = useState(0);
  const [baselineY, setBaselineY] = useState(0);
  const [animateCan, setAnimateCan] = useState(false);
  const triggerRef = useRef(null);

 
  //const canvasInfo = 

  useEffect(() => {
    if(!heroPageTextRef.current) return;

     if (isSmall){
        const canvasInfoHeight = canvasInfo.current.getBoundingClientRect();
        const heroPageInfo = EntireHeroPageTextref.current.getBoundingClientRect();
        console.log(canvasInfoHeight);

        setsideTextPos(canvasInfoHeight.bottom)
        setmaintextPos(heroPageInfo.height)
    }

    const updatebaseline = () =>{
      // if (isSmall){
      //   const text_rect = sideHeroPageTextref.current.getBoundingClientRect()
      //   setBaselineY(text_rect.bottom)
      // }else{
      //   const text_rect = heroPageTextRef.current.getBoundingClientRect()
      //   setBaselineY(text_rect.bottom)

      const text_rect = heroPageTextRef.current.getBoundingClientRect();
      setBaselineY(text_rect.bottom);
      
    };

    updatebaseline();
    window.addEventListener("resize", updatebaseline);

    return () => window.removeEventListener("resize", updatebaseline);
    
  }, []);

  // useEffect(() => {
  //   const observer = new window.IntersectionObserver(
  //     ([entry]) => setAnimateCan(entry.isIntersecting),
  //     { threshold: 1 }
  //   );
  //   if (triggerRef.current) observer.observe(triggerRef.current);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <>

    <section ref={triggerRef} className='relative top-0 left-0 w-full h-screen'>
      <AnimatedBackground />
      <Navbar />
      <div className='relative z-30 justify-center place-items-center '>
        
        <div ref={canvasInfo} className='relative pointer-events-none w-full h-[60vh] md:h-[70vh] lg:h-[80vh] z-20'>
          <Canvas  camera={{ position: [0, 0, 5], fov: 60 }} className='canvas' style={{ width: '100%', height: '100%' }}>

            <Suspense fallback={null}> {/*suspense is used to delay the rendering of the scene until all assets are loaded*/}

              <ResponsiveCamera />
              {/*The environment and lighting*/}
              <Environment files="/Images/HDR/meadow_2_4k.hdr" background={false} environmentIntensity={1.5}/>

              <ambientLight intensity={1.7}/>
              <directionalLight
                position={[5, 5, 3]}
                intensity={2}
              />
              <Scene baselineY={baselineY} animateCan={animateCan} />
      
        
            
             
            
            </Suspense>
 
          </Canvas>
        </div>

       
          <div className='absolute top-0 left-0 w-full justify-center items-center z-2'>
          <h1 ref={EntireHeroPageTextref} className=' xl:text-[26vh]/48 text-[10vh]/24 md:text-1xl tracking-wide text-center font-bold text-black mt-12 lg:mt-24 md:mt-12'>
            Live Life on
            <span ref={heroPageTextRef} className='flex flex-col sm:flex-row mt-10 md:mt-18 sm:pb-28 lg:pb-0 xl:ml-24'>
              The
              <span className={`absolute left-1/2 -translate-x-1/2 sm:left-1/2 xl:static xl:flex xl:flex-row xl:ml-auto xl:mr-[-12rem]`} style={{top: sideTextPos}}>
                Side
                {/* Render button under 'Side' for small screens */}
                {isSmall && (
                  <button className='flex flex-col mt-12 w-fit bg-white text-2xl text-brown font-semibold py-2 px-4 rounded hover:bg-gray-200 transition relative z-10'>Shop Now</button>
                )}
              </span>
            </span>
          </h1>
          {/* Render button under cans for large screens */}
          {!isSmall && (
            <div className='flex justify-center w-full mt-8'>
              <button className='mt-32 bg-yellow-300 w-xs text-brown font-semibold py-2 px-4 rounded-full hover:bg-yellow-200 transition-colors z-10  cursor-pointer'>Shop Now</button>
            </div>
          )}
        </div>
      

       
      </div>


      
        
    </section>
    
    
    <section  className='relative h-[80vh] text-center bg-blue-100'>
      
      
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