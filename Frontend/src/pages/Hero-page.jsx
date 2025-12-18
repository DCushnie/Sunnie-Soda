import React, { use } from 'react';
import {useRef, useEffect} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas,useFrame } from '@react-three/fiber';
import * as THREE from 'three';
//import { DragControls, OrbitControls } from '@react-three/drei';
import { AnimatedCan } from '../components/AnimatedCan.js';
import { DirectionalLight } from 'three';
import { Suspense } from 'react';
import labelimage from "/Images/watermelon.png";
import { Environment } from '@react-three/drei';
import Navbar from '../components/Navbar.jsx';
import OrbitControlsWithPointerEvents from '../components/OrbitControls.jsx';


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

  return (
    <>

    <section className='relative top-0 left-0 w-full h-screen bg-brown z-10'>
       <Navbar/>
      <div className='absolute grid grid-flow-row grid-rows-2 gap-12 top-0 left-0 w-full justify-center items-center z-20'>
        <h1 className='text-[26vh] tracking-wide text-center font-bold text-white mt-6'>Live Life on</h1>
        <h1 className='text-[26vh] tracking-wide text-center font-bold text-black mt-12 ml-auto'>The<span className="text-brown">Sunnie</span>Side</h1>
      </div>
      <div className=' w-full h-[700px] mt-[5%] relative z-30 justify-center place-items-center'>
        
        <div  className='w-full h-full  relative'>
          <Canvas camera={{ position: [5, 0, 0], fov: 60 }} style={{width:"100%",height:"100%"}}>

          <Suspense fallback={null}> {/*suspense is used to delay the rendering of the scene until all assets are loaded*/}
            {/*The environment and lighting*/}
            <Environment files="public/Images/HDR/charolettenbrunn_park_4k.hdr" background={false} />

            <ambientLight intensity={2}/>
            <directionalLight
              position={[5, 1, 5]}
              intensity={2}
              />
        
      
        
      
             {/* Animated cans */}
              <AnimatedCan
                flavour="strawberry"
                position={[0, -2, 0]}
                scale={1.5}
              />

              <AnimatedCan
                flavour="watermelon"
                position={[-1.5, -2.2, 1]}
                scale={1.2}
              />

              <AnimatedCan
                flavour="cherry"
                position={[1.5, -2.2, -1]}
                scale={1.2}
              />
            
          </Suspense>
 
        </Canvas>
        </div>

       
         

       
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