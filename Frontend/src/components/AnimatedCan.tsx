import { forwardRef, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { SodaCan } from "../components/sodaCan.js";

/**
 * AnimatedCan
 * - Controls GSAP entry animation
 * - Controls idle rotation
 * - Wraps the reusable SodaCan model
 */
export const AnimatedCan = forwardRef<
    THREE.Group,
    {
        flavour: "watermelon"|"strawberry"|"cherry";
        scale?: number;
        position: [number, number, number];
        dropDelay?: number; // delay before drop animation starts
    }
    >(({flavour, position, scale = 1, dropDelay = 0}, externalRef) => {
        const internalRef = useRef<THREE.Group>(null);
        const canref =
            (externalRef as React.RefObject<THREE.Group | null>) || internalRef;

        useEffect(() => {
            if (!canref.current) return;

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
                }
            );
        }, [position, dropDelay]);


        return (
            <SodaCan
                ref={canref}
                flavour={flavour}
                position={[position[0], position[1] + 5, position[2]]}
                scale={scale}
            />
        );
    });

AnimatedCan.displayName = "AnimatedCan";