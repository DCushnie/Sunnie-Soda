"use client"

import { useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import React, { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";

const metalMaterial = new THREE.MeshPhysicalMaterial({
    color: "#bbbbbb",
    metalness: 1,
    roughness: 0.4,
    clearcoat: 1,
    clearcoatRoughness: 0.4,
    reflectivity: 0.5,
    });

const flavourTextures = {
    watermelon: "/Images/watermelon.png",
    strawberry: "/Images/strawberry.png",
    cherry: "/Images/cherry.png",
    
};

export type SodaCanProps =  {
    flavour?: keyof typeof flavourTextures; // default is watermelon
    scale?: number;
    position?: [number, number, number];
};

export const SodaCan = forwardRef<THREE.Group, SodaCanProps>(
    ({ flavour = "watermelon", scale = 1, ...props }, ref) => {
        const label = useTexture(flavourTextures[flavour]);
    
    const profile = useMemo(() => {
        const start = new THREE.Vector3(0.7, 0, 0);   // bottom radius
        const control1 = new THREE.Vector3(0.75, 0.05, 0);
        const control2 = new THREE.Vector3(0.75, 1.95, 0);
        const end = new THREE.Vector3(0.7, 2, 0);

        const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);

        const points = curve.getPoints(50);

        return points.map(p => new THREE.Vector2(p.x, p.y));
    },[]);

    const topprofile = useMemo(() => {
        const start = new THREE.Vector3(0.7069, 0, 0);   // bottom radius
        const control1 = new THREE.Vector3(0.7, 0.05, 0);
        const control2 = new THREE.Vector3(0.4, 0.5, 0);
        const end = new THREE.Vector3(0.6, 0.2, 0);

        const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);

        const points = curve.getPoints(50);

        return points.map(p => new THREE.Vector2(p.x, p.y));
    },[]);

    const canlipprofile = useMemo(() => {
        const start = new THREE.Vector3(0.58, 0, 0);   // bottom radius
        const control1 = new THREE.Vector3(0.54, 0.1, 0);
        const control2 = new THREE.Vector3(0.58, 0.17, 0);
        const end = new THREE.Vector3(0.48, 0.1, 0);

        const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);

        const points = curve.getPoints(50);

        return points.map(p => new THREE.Vector2(p.x, p.y));
    },[]);
    
    const bottomprofile = useMemo(() => {
        const start = new THREE.Vector3(0.7069, 0, 0);   // bottom radius
        const control1 = new THREE.Vector3(0.7, 0.05, 0);
        const control2 = new THREE.Vector3(0.4, 0.35, 0);
        const end = new THREE.Vector3(0.4, 0.005, 0);

        const curve = new THREE.CubicBezierCurve3(start, control1, control2, end);

        const points = curve.getPoints(50);

        return points.map(p => new THREE.Vector2(p.x, p.y));
    },[]);

    

        return (
            <group ref={ref} scale={scale} {...props}>
    
                <mesh position={[0, 2.338, 0]} material={metalMaterial} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.12, 0.03, 128, 128, 3]} />
                </mesh>

                <mesh position={[-0.113, 2.333, -0.05]} material={metalMaterial} rotation={[1.5, 0, 0.05]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.18, 128]} />
                </mesh>

                <mesh position={[0.113, 2.333, -0.05]} material={metalMaterial} rotation={[1.5, 0, -0.05]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.18, 128]} />
                </mesh>

                <mesh position={[0, 2.33, -0.12]} material={metalMaterial} rotation={[-Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.112, 0.03, 128, 128, 3]} />
                </mesh>

                {/* <mesh position={[0, 2.34, -0.05]} material={metalMaterial} rotation={[Math.PI / 2, 0, 1.5]}>
                    <boxGeometry args={[0.15, 0.23, 0.03]} />
                </mesh> */}



                {/*closing the top of the can */}

                <mesh material={metalMaterial} position={[0, 2.3, 0]}>
                    <cylinderGeometry args={[0.5, 0.5, 0.03, 128]} />
                </mesh>
                
            {/*The lip part of the can */}

                <mesh material={metalMaterial} position={[0, 2.22, 0]}>
                    <latheGeometry args={[canlipprofile, 128]} /> 
                </mesh>

                {/*the bent in part of the can */}
                <mesh material={metalMaterial} position={[0, 1.99, 0]}>
                    <latheGeometry args={[topprofile, 128]} /> 
                </mesh>

                {/* The can Body */}

                <mesh material={metalMaterial} >
                    <latheGeometry args={[profile, 128]} />  {/* Revolve profile around Y-axis */}
                </mesh>

                {/*The bottom of the can */}
                <mesh material={metalMaterial} position={[0, 0.05, 0]} rotation={[Math.PI, 0, 0]}>
                    <latheGeometry args={[bottomprofile, 128]} />
                </mesh>

                {/*The can bottom lip */}

                <mesh material={metalMaterial} position={[0, 0., 0]} rotation={[Math.PI, 0, 0]}>
                    <latheGeometry args={[canlipprofile, 128]} /> 
                </mesh>

                {/*closing the bottom of the can */}

                <mesh material={metalMaterial} position={[0, 0.01, 0]} >
                    <cylinderGeometry args={[0.5, 0.5, 0.03, 128]} />
                </mesh>


                {/*Making the label */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[0.735, 0.745, 1.8, 128]} />
                    <meshStandardMaterial map={label}  roughness={0.3}/>
                </mesh>
                            

    {/* syntax is: radius, tube, radial segments, tubular segments */}
                

            



            
            

                {/*Making the can tab */}

                {/* <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.2, 0.03, 16, 100]} />
                    <meshStandardMaterial color="#ccc" metalness={1} roughness={0.2} />
                </mesh> */}
                
                
                    
                
            </group>
    
        );
    }
);

SodaCan.displayName = "SodaCan";


