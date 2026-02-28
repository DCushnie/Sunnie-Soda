import { AnimatedCan } from './AnimatedCan.js';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {useRef, useEffect, useState} from 'react';


function Scene({baselineY}) {
   const { camera, size } = useThree();
   const [canY, setCanY] = useState(null);

   useEffect(() => {
     if (canY === null) {
       const distance = camera.position.z;
       const vFov = (camera.fov * Math.PI) / 180;
       const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
       const pixel_calc = -(baselineY / size.height) * 2 + 1;
       const three_worldY = (pixel_calc * visibleHeight) / 2;
       setCanY(three_worldY);
     }
   }, [camera, size.height, baselineY, canY]);

   // Only render cans once canY is set
   if (canY === null) return null;

   return (
     <>
       <AnimatedCan
         flavour="strawberry"
         position={[0, canY, 0]}
         scale={0.7}
         dropDelay={0.2}
         rotation={[0, -Math.PI / 2, 0]}
       />

       <AnimatedCan
         flavour="watermelon"
         position={[1, canY, 0]}
         scale={0.7}
         dropDelay={0.5}
         rotation={[0, -Math.PI / 2, 0]}
       />

       <AnimatedCan
         flavour="cherry"
         position={[-1, canY, 0]}
         scale={0.7}
         dropDelay={0.8}
         rotation={[0, -Math.PI / 2, 0]}
       />
     </>
   );
}

export default Scene;