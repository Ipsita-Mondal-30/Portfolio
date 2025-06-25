"use client";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const WhatIDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section 
      ref={ref}
      className="w-full h-screen m-0 p-0 overflow-hidden"
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src="/what-i-do.png"
            alt="What I Do"
            width={600}
          height={400}
            className="w-full h-full object-cover"
          />
          
          {/* Animated border on hover */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhatIDo;
