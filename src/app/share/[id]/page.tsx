"use client"
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './Envelope';
import Letter from './Letter';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import ParticleSwarmLoader from '@/components/magicui/particle-loader';


export default function EnvelopePage() {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [letter, setLetter] = useState<any>()
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const fetchLetters = async () => {
            setLoading(true)
            const { data } = await supabase.from('letters').select().eq('letter_id', params.id)
            setLetter(data)
            setLoading(false)
        }
        fetchLetters()
    }, [])

    if (loading) {
        return (
            <div className="w-full flex justify-center h-full ">
                <ParticleSwarmLoader />
            </div>
        )
    }

    if (letter)
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
                        <Envelope isOpen={isOpen} handleClick={handleClick} data={letter[0]} />
                        <Letter isOpen={isOpen} data={letter[0]} />
                    </motion.div>
                </AnimatePresence>
            </div>
        )
}