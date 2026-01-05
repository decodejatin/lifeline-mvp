'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
}

export const ScrollReveal = ({
    children,
    width = "100%",
    direction = "up",
    delay = 0.2,
    duration = 0.8,
    distance = 50,
    className = ""
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getHiddenX = () => {
        if (direction === "left") return distance;
        if (direction === "right") return -distance;
        return 0;
    };

    const getHiddenY = () => {
        if (direction === "up") return distance;
        if (direction === "down") return -distance;
        return 0;
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }} className={className}>
            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        y: getHiddenY(),
                        x: getHiddenX(),
                        scale: 0.95,
                        filter: "blur(10px)"
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                        filter: "blur(0px)"
                    },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for premium feel
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
