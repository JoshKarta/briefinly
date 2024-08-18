"use client"
import React, { useRef, useState } from 'react'
import { motion } from "framer-motion";
import Confetti, { ConfettiRef } from '@/components/magicui/confetti';
import { basicConfetti, customConfetti, starsConfetti } from '@/constants/confetti-types';

type Envelope = {
    isOpen: boolean
    handleClick: () => void
    data: any
}

export default function Envelope({ isOpen, handleClick, data }: Envelope) {
    const confettiRef = useRef<ConfettiRef>(null)

    const handleConfetti = () => {
        switch (data.confetti_type) {
            case "basic":
                basicConfetti()
                break;

            case "stars":
                starsConfetti()
                break;

            case "custom":
                customConfetti(data.confetti_emoji)
                break;

            default:
                break;
        }
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
