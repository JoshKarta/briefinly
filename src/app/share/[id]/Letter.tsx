"use client"
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Letter: React.FC<{ isOpen: boolean, data: any }> = ({ isOpen, data }) => {
    return (
        <motion.div
            className={cn("absolute top-5 left-0 right-0 bg-white p-4 rounded-lg shadow-inner", isOpen && "z-50")}
            initial={{ y: '100%' }}
            animate={{ y: isOpen ? '-100%' : '10%' }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold mb-2">{data.title}</h2>
            <p className="text-sm">{data.text}</p>
        </motion.div>
    );
};

export default Letter;