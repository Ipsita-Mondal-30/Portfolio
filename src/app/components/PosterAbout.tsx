"use client";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });

  return (
    <motion.section 
      ref={ref}
      className="w-full h-screen m-0 p-0 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/pos.png"
          alt="About Me"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.section>
  );
};

export default AboutMe;
