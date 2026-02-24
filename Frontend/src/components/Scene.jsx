import { AnimatedCan } from './AnimatedCan.js';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';


function Scene({baselineY}) {
   const { camera, size } = useThree(); //grab the camera from my scene

  
  const distance = camera.position.z; //how far away my camera is from the cans
  const vFov = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;

  const pixel_calc = -(baselineY / size.height) * 2 + 1;

  const three_worldY = (pixel_calc * visibleHeight) / 2;

  
  const drop = -visibleHeight * 0.3;

  return (
    <>
      <AnimatedCan
        flavour="strawberry"
        position={[0, three_worldY, 0]}
        scale={0.7}
        dropDelay={0.2}
        rotation={[0, -Math.PI / 2, 0]}
      />

      <AnimatedCan
        flavour="watermelon"
        position={[1, three_worldY, 0]}
        scale={0.7}
        dropDelay={0.5}
        rotation={[0, -Math.PI / 2, 0]}
      />

      <AnimatedCan
        flavour="cherry"
        position={[-1, three_worldY, 0]}
        scale={0.7}
        dropDelay={0.8}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </>
  );
}

export default Scene;