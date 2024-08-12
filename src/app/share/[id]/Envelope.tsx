"use client"
import React from 'react'
import { motion } from "framer-motion";

type Envelope = {
    isOpen: boolean
    handleClick: () => void
}

export default function Envelope({ isOpen, handleClick }: Envelope) {
    return (
        <div
            className="z-50 relative w-96 h-60 bg-yellow-200 rounded-lg shadow-md cursor-pointer"
            onClick={handleClick}
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
    )
}
