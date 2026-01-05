'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { HolographicDevice } from './HolographicDevice';
import { nexusShaders } from '../../lib/nexus/NexusShaders';

const CosmicDust = () => {
    const points = useMemo(() => {
        const p = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            p[i * 3] = (Math.random() - 0.5) * 50;
            p[i * 3 + 1] = (Math.random() - 0.5) * 50;
            p[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return p;
    }, []);

    const pointsRef = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#4f46e5" transparent opacity={0.6} />
        </points>
    );
};

const EnergyGrid = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#1e1b4b") }
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -5, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[100, 100, 100, 100]} />
            <shaderMaterial
                vertexShader={nexusShaders.energyField.vertexShader}
                fragmentShader={nexusShaders.energyField.fragmentShader}
                uniforms={uniforms}
                transparent
                wireframe
            />
        </mesh>
    );
};

export const NexusScene = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.5}
                />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ec4899" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <CosmicDust />
                <EnergyGrid />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <HolographicDevice position={[-3, 0, 0]} color="#3b82f6" active={true} />
                </Float>

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <HolographicDevice position={[3, 0, 0]} color="#ec4899" active={true} />
                </Float>

                <mesh position={[0, -2, -5]} rotation-x={Math.PI / 2}>
                    <ringGeometry args={[15, 15.2, 64]} />
                    <meshBasicMaterial color="#4f46e5" transparent opacity={0.2} side={THREE.DoubleSide} />
                </mesh>
            </Canvas>
        </div>
    );
};
