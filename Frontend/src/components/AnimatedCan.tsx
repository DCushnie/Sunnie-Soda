import { forwardRef, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { SodaCan } from "../components/sodaCan.js";



export const AnimatedCan = forwardRef<
    THREE.Group,
    {
        flavour: "watermelon"|"strawberry"|"cherry";
        scale?: number;
        position: [number, number, number];
        rotation?: [number, number, number];
        dropDelay?: number; // delay before drop animation starts
        animate?: boolean;
    }
    >(({flavour, position, scale = 1, rotation = [0,0,0], dropDelay = 0, animate = true}, externalRef) => {
        const internalRef = useRef<THREE.Group>(null);
        const canref = (externalRef as React.RefObject<THREE.Group | null>) || internalRef;
        const dropPlayed = useRef(false);

        useEffect(() => {
            if (!canref.current) return;
            // if (!animate){
            //     console.log(animate);
            //     canref.current.position.y = position[1] + 7;
            //     return;
            // }
            if(!dropPlayed.current){
                gsap.fromTo(
                    canref.current.position,
                {
                    y: position[1] + 7, //from here
                },
                {
                    y: position[1],
                    duration: 2,
                    ease: "power3.out",
                    delay: dropDelay,
                    onComplete: () => {dropPlayed.current = true;}
                }
            );
            }
                
            
        }, [position, dropDelay]);

        return (
            <SodaCan
                ref={canref}
                flavour={flavour}
                position={[position[0], position[1], position[2]]}
                rotation={rotation}
                scale={scale}
            />
        );
    });

AnimatedCan.displayName = "AnimatedCan";