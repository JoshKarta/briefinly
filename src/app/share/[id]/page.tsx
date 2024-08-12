"use client"
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './Envelope';
import Letter from './Letter';


export default function EnvelopePage({ params }: { params: { id: string } }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
            <AnimatePresence mode='wait'>
                <motion.div
                    key="envelope"
                    className="relative"
                    initial={{ y: '100vh' }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
                >
                    <Envelope isOpen={isOpen} handleClick={handleClick} />
                    <Letter isOpen={isOpen} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}