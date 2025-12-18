import { useRef, useEffect } from "react";
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
export function AnimatedCan({
    flavour,
    position = [0, 0, 0],
    scale = 1,
    }: {
        flavour: "watermelon" | "strawberry" | "cherry";
        position?: [number, number, number];
        scale?: number;
}) {
  const canRef = useRef<THREE.Group>(null);

  // GSAP entrance animation (runs once on mount)
  useEffect(() => {
    if (!canRef.current) return;

    gsap.fromTo(
      canRef.current.position,
      { y: position[1] + 5 }, // start above the scene
      {
        y: position[1],       // land at final position
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [position]);

  // Subtle idle rotation (runs every frame)
  useFrame((_, delta) => {
    if (!canRef.current) return;
    canRef.current.rotation.y += delta * 0.4;
  });

  return (
    <SodaCan
      ref={canRef}
      flavour={flavour}
      position={position}
      scale={scale}
    />
  );
}
