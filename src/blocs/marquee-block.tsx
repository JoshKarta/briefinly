"use client"
import { techStack } from "@/constants/marquee-images";
import { Icon } from '@iconify/react';
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { fadeUp } from "@/constants/variants";

export default function MarqueeBlock() {
    return (
        <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: .75 }}
            className="mx-auto max-w-screen-xl w-full px-8">
            <h3 className="text-center text-3xl font-semibold dark:text-neutral-100">
                Tech stack <p className="hidden md:inline-block">used for this project</p>.
            </h3>
            <Marquee autoFill className="w-full mt-12">
                {techStack.map((image, i) => (
                    <Icon icon={image} key={i} className="w-10 h-10 md:w-12 md:h-12 ml-20" style={{color:"white"}}/>
                ))}
            </Marquee>
        </motion.div>
    )
}
