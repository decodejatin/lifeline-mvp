'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { nexusShaders } from '../../lib/nexus/NexusShaders';

interface HolographicDeviceProps {
    position: [number, number, number];
    color: string;
    imageUrl?: string;
    active?: boolean;
    powerLevel?: number;
}

export const HolographicDevice = ({ position, color, imageUrl, active = false, powerLevel = 0 }: HolographicDeviceProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Default black texture if no imageUrl is provided
    const texture = useTexture(imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: active ? 1.0 : 0.2 },
        uTexture: { value: texture }
    }), [color, texture]);

    // Internal particle system for high power states
    const particleGeometry = useMemo(() => {
        const count = 50;
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 0.5;
            pos[i * 3 + 1] = Math.random() * 2;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
            vel[i * 3] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 1] = Math.random() * 0.02;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return { geo, vel };
    }, []);

    useFrame((state) => {
        const { clock } = state;
        const time = clock.getElapsedTime();

        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.2;
            const floatSpeed = active ? 2 : 1;
            const floatIntensity = active ? 0.2 : 0.05;
            meshRef.current.position.y = position[1] + Math.sin(time * floatSpeed) * floatIntensity;
            
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = time;
            mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, active ? 1.0 : 0.2, 0.1);
            mat.uniforms.uTexture.value = texture;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = time * (0.2 + powerLevel * 0.05);
            ringRef.current.rotation.x = time * (0.1 + powerLevel * 0.02);
            ringRef.current.scale.setScalar(active ? 1.2 : 1.0);
        }

        if (particlesRef.current && active) {
            const positions = particleGeometry.geo.attributes.position.array as Float32Array;
            for (let i = 0; i < 50; i++) {
                positions[i * 3 + 1] += particleGeometry.vel[i * 3 + 1] * (1 + powerLevel * 0.1);
                if (positions[i * 3 + 1] > 2) positions[i * 3 + 1] = 0;
            }
            particleGeometry.geo.attributes.position.needsUpdate = true;
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

            {/* Power Particles */}
            <points ref={particlesRef} visible={active}>
                <primitive object={particleGeometry.geo} attach="geometry" />
                <pointsMaterial size={0.02} color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
            </points>

            {/* Orbiting Rings */}
            <group ref={ringRef}>
                <mesh rotation-x={Math.PI / 2}>
                    <torusGeometry args={[1.5, 0.01, 16, 100]} />
                    <meshBasicMaterial color={color} transparent opacity={active ? 0.4 : 0.1} />
                </mesh>
                <mesh rotation-y={Math.PI / 2}>
                    <torusGeometry args={[1.3, 0.005, 16, 100]} />
                    <meshBasicMaterial color={color} transparent opacity={active ? 0.3 : 0.05} />
                </mesh>
            </group>

            {/* Ground platform */}
            <mesh position={[0, -1.2, 0]} rotation-x={-Math.PI / 2}>
                <cylinderGeometry args={[1, 1.2, 0.05, 32]} />
                <meshBasicMaterial color={color} transparent opacity={active ? 0.2 : 0.05} wireframe />
            </mesh>
        </group>
    );
};
