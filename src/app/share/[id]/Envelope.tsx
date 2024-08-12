"use client"
import React from 'react'
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';

type Envelope = {
    isOpen: boolean
    handleClick: () => void
    data: any
}

export default function Envelope({ isOpen, handleClick, data }: Envelope) {
    const handleConfetti = () => {
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ["star"],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ["circle"],
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    return (
        <>
            <div
                className="z-50 relative w-96 h-60 bg-yellow-200 rounded-lg shadow-md cursor-pointer"
                onClick={() => {
                    handleClick()
                    if (data.confetti && !isOpen) {
                        handleConfetti()
                    }
                }}
            >
                {/* Envelope Flap */}
                <motion.div
                    className="absolute top-1 w-0 h-0 border-l-[190px] border-l-transparent rounded-lg border-t-[150px] border-t-yellow-200 border-r-[190px] border-r-transparent origin-top"
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Envelope Front */}
                <div
                    className="absolute top-0 w-0 h-0 border-l-[190px] border-l-transparent rounded-lg border-t-[150px] border-t-yellow-300 border-r-[190px] border-r-transparent origin-top z-50"
                />
            </div >
        </>
    )
}
