'use client';

import React from 'react';
import { NexusScene } from '../../components/nexus/NexusScene';
import { NexusOverlay } from '../../components/nexus/NexusOverlay';
import CustomCursor from '../../components/ui/custom-cursor';
import FloatingNav from '../../components/ui/floating-nav';

export default function NexusPage() {
    return (
        <main className="relative bg-black min-h-screen overflow-x-hidden">
            <CustomCursor />
            <FloatingNav />
            <NexusScene />
            <NexusOverlay />

            {/* Visual Accents */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            <div className="fixed top-1/2 left-0 w-1 h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-10" />
            <div className="fixed top-1/2 right-0 w-1 h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-pink-500/50 to-transparent z-10" />

            {/* Futuristic Border Overlay */}
            <div className="fixed inset-4 border border-white/5 pointer-events-none z-20 rounded-3xl" />
            <div className="fixed inset-8 border border-white/5 pointer-events-none z-20 rounded-[2.5rem]" />

            {/* Scanline Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </main>
    );
}
