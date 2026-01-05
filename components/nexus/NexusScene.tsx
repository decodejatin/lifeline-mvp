'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { HolographicDevice } from './HolographicDevice';
import { nexusShaders } from '../../lib/nexus/NexusShaders';

const CosmicDust = ({ advantageScores }: { advantageScores: { device1: number, device2: number } }) => {
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
    const color = useMemo(() => {
        if (advantageScores.device1 > advantageScores.device2) return new THREE.Color("#3b82f6");
        if (advantageScores.device2 > advantageScores.device1) return new THREE.Color("#ec4899");
        return new THREE.Color("#4f46e5");
    }, [advantageScores]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
            (pointsRef.current.material as THREE.PointsMaterial).color.lerp(color, 0.05);
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

const EnergyGrid = ({ advantageScores }: { advantageScores: { device1: number, device2: number } }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#1e1b4b") }
    }), []);

    const targetColor = useMemo(() => {
        if (advantageScores.device1 > advantageScores.device2) return new THREE.Color("#001a33");
        if (advantageScores.device2 > advantageScores.device1) return new THREE.Color("#1a001a");
        return new THREE.Color("#0f0c29");
    }, [advantageScores]);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uColor.value.lerp(targetColor, 0.02);
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

const CinematicCamera = ({ isBattleStarted, focus }: { isBattleStarted: boolean, focus: 'left' | 'right' | 'center' }) => {
    const { camera } = useThree();

    useFrame(() => {
        let targetPos = new THREE.Vector3(0, 2, 10);

        if (isBattleStarted) {
            if (focus === 'left') {
                targetPos.set(-4, 1, 4);
            } else if (focus === 'right') {
                targetPos.set(4, 1, 4);
            } else {
                targetPos.set(0, 1.5, 7);
            }
        } else {
            targetPos.set(0, 2, 10);
        }

        camera.position.lerp(targetPos, 0.05);
    });

    return null;
};

interface NexusSceneProps {
    isBattleStarted: boolean;
    focus?: 'left' | 'right' | 'center';
    advantageScores?: { device1: number; device2: number };
    image1?: string;
    image2?: string;
}

export const NexusScene = ({
    isBattleStarted,
    focus = 'center',
    advantageScores = { device1: 0, device2: 0 },
    image1,
    image2
}: NexusSceneProps) => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas shadows gl={{ antialias: true }}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
                    <CinematicCamera isBattleStarted={isBattleStarted} focus={focus} />

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
                    <CosmicDust advantageScores={advantageScores} />
                    <EnergyGrid advantageScores={advantageScores} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <HolographicDevice
                            position={[-3, 0, 0]}
                            color="#3b82f6"
                            imageUrl={image1}
                            active={isBattleStarted && (focus === 'left' || focus === 'center')}
                            powerLevel={advantageScores.device1}
                        />
                    </Float>

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <HolographicDevice
                            position={[3, 0, 0]}
                            color="#ec4899"
                            imageUrl={image2}
                            active={isBattleStarted && (focus === 'right' || focus === 'center')}
                            powerLevel={advantageScores.device2}
                        />
                    </Float>

                    <mesh position={[0, -2, -5]} rotation-x={Math.PI / 2}>
                        <ringGeometry args={[15, 15.2, 64]} />
                        <meshBasicMaterial color="#4f46e5" transparent opacity={0.2} side={THREE.DoubleSide} />
                    </mesh>
                </Suspense>
            </Canvas>
        </div>
    );
};
