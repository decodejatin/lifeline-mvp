'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { nexusShaders } from '../../lib/nexus/NexusShaders';

interface HolographicDeviceProps {
    position: [number, number, number];
    color: string;
    active?: boolean;
}

export const HolographicDevice = ({ position, color, active = false }: HolographicDeviceProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: active ? 0.8 : 0.4 }
    }), [color, active]);

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
            meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1;
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
            ringRef.current.rotation.x = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group position={position}>
            {/* Main holographic body */}
            <mesh ref={meshRef}>
                <boxGeometry args={[1, 1.8, 0.1]} />
                <shaderMaterial
                    fragmentShader={nexusShaders.hologram.fragmentShader}
                    vertexShader={nexusShaders.hologram.vertexShader}
                    uniforms={uniforms}
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Orbiting Rings */}
            <group ref={ringRef}>
                <mesh rotation-x={Math.PI / 2}>
                    <torusGeometry args={[1.5, 0.02, 16, 100]} />
                    <meshBasicMaterial color={color} transparent opacity={0.3} />
                </mesh>
                <mesh rotation-y={Math.PI / 2}>
                    <torusGeometry args={[1.2, 0.01, 16, 100]} />
                    <meshBasicMaterial color={color} transparent opacity={0.2} />
                </mesh>
            </group>

            {/* Ground platform */}
            <mesh position={[0, -1.2, 0]} rotation-x={-Math.PI / 2}>
                <cylinderGeometry args={[1, 1.2, 0.1, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
            </mesh>

            {/* Light beam */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.01, 0.5, 1.2, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.05} />
            </mesh>
        </group>
    );
};
