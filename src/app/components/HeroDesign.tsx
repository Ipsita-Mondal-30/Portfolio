"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const HeroDesign = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <motion.section 
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/portfolio.mp4" type="video/mp4" />
      </video>
      
      
      {/* Optional floating elements for extra visual interest */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.section>
  );
};

export default HeroDesign;