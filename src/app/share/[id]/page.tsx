"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "./Envelope";
import Letter from "./Letter";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import ParticleSwarmLoader from "@/components/magicui/particle-loader";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function EnvelopePage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  // const [letter, setLetter] = useState<any>()
  const [isOpen, setIsOpen] = useState(false);

  const letter = useQuery(api.letters.getLettterById, {
    letter_id: params.id as string,
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchLetters = async () => {
      setLoading(true);
      setLoading(false);
    };
    fetchLetters();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center">
        <ParticleSwarmLoader />
      </div>
    );
  }

  if (letter)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key="envelope"
            className="relative"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.2,
            }}
          >
            <Envelope
              isOpen={isOpen}
              handleClick={handleClick}
              data={letter[0]}
            />
            <Letter isOpen={isOpen} data={letter[0]} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
}
