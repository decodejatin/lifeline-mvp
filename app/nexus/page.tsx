'use client';

import React, { useState } from 'react';
import { NexusScene } from '../../components/nexus/NexusScene';
import { NexusOverlay } from '../../components/nexus/NexusOverlay';
import CustomCursor from '../../components/ui/custom-cursor';
import FloatingNav from '../../components/ui/floating-nav';

export default function NexusPage() {
    const [isBattleStarted, setIsBattleStarted] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
    const [advantageScores, setAdvantageScores] = useState({ device1: 0, device2: 0 });
    const [focus, setFocus] = useState<'left' | 'right' | 'center'>('center');

    return (
        <main className="relative bg-black min-h-screen overflow-x-hidden">
            <CustomCursor />
            <FloatingNav />

            <NexusScene
                isBattleStarted={isBattleStarted}
                focus={focus}
                advantageScores={advantageScores}
            />

            <NexusOverlay
                isBattleStarted={isBattleStarted}
                setIsBattleStarted={setIsBattleStarted}
                selectedDevices={selectedDevices}
                setSelectedDevices={setSelectedDevices}
                advantageScores={advantageScores}
                setAdvantageScores={setAdvantageScores}
                setFocus={setFocus}
            />

            {/* Visual Accents */}
            <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Scanline Effect Overlay */}
            <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </main>
    );
}
