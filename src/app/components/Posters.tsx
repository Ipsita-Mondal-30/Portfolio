"use client";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Posters = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const posters = [
    '/poster1.png',
    '/poster2.png',
    '/poster3.jpg',
    '/poster4.jpg',
    '/poster5.jpg',
    '/cover .jpg',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      ref={ref}
      className="py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 bg-gray-50 relative overflow-hidden"
    >
      {/* Decorative Flowers - Desktop Only */}
      <div className="hidden lg:block">
        {/* Top Left Flower */}
        <motion.div
          className="absolute top-8 left-8 w-24 h-24 opacity-20"
          initial={{ opacity: 0, rotate: -180 }}
          animate={isInView ? { opacity: 0.2, rotate: 0 } : { opacity: 0, rotate: -180 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-purple-400">
            <path d="M50 20c-8 0-15 7-15 15 0-8-7-15-15-15s-15 7-15 15c0 8 7 15 15 15-8 0-15 7-15 15s7 15 15 15c8 0 15-7 15-15 0 8 7 15 15 15s15-7 15-15c0-8-7-15-15-15 8 0 15-7 15-15s-7-15-15-15z"/>
            <circle cx="50" cy="50" r="8" className="fill-yellow-300"/>
          </svg>
        </motion.div>

        {/* Top Right Flower */}
        <motion.div
          className="absolute top-12 right-12 w-20 h-20 opacity-15"
          initial={{ opacity: 0, rotate: 180 }}
          animate={isInView ? { opacity: 0.15, rotate: 0 } : { opacity: 0, rotate: 180 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-pink-400">
            <path d="M50 15c-10 0-18 8-18 18 0-10-8-18-18-18s-18 8-18 18 8 18 18 18c-10 0-18 8-18 18s8 18 18 18 18-8 18-18c0 10 8 18 18 18s18-8 18-18-8-18-18-18c10 0 18-8 18-18s-8-18-18-18z"/>
            <circle cx="50" cy="50" r="6" className="fill-yellow-200"/>
          </svg>
        </motion.div>

        {/* Bottom Left Flower */}
        <motion.div
          className="absolute bottom-16 left-16 w-28 h-28 opacity-10"
          initial={{ opacity: 0, rotate: -90 }}
          animate={isInView ? { opacity: 0.1, rotate: 0 } : { opacity: 0, rotate: -90 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-indigo-400">
            <path d="M50 18c-9 0-16 7-16 16 0-9-7-16-16-16s-16 7-16 16 7 16 16 16c-9 0-16 7-16 16s7 16 16 16 16-7 16-16c0 9 7 16 16 16s16-7 16-16-7-16-16-16c9 0 16-7 16-16s-7-16-16-16z"/>
            <circle cx="50" cy="50" r="7" className="fill-yellow-300"/>
          </svg>
        </motion.div>

        {/* Bottom Right Flower */}
        <motion.div
          className="absolute bottom-8 right-8 w-22 h-22 opacity-20"
          initial={{ opacity: 0, rotate: 90 }}
          animate={isInView ? { opacity: 0.2, rotate: 0 } : { opacity: 0, rotate: 90 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-rose-400">
            <path d="M50 22c-7 0-14 6-14 14 0-8-6-14-14-14s-14 6-14 14 6 14 14 14c-8 0-14 6-14 14s6 14 14 14 14-6 14-14c0 8 6 14 14 14s14-6 14-14-6-14-14-14c8 0 14-6 14-14s-6-14-14-14z"/>
            <circle cx="50" cy="50" r="5" className="fill-yellow-200"/>
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 md:mb-12 lg:mb-16"
          style={{ 
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#8f5cae',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          Poster Designs
        </motion.h2>
                
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {posters.map((poster, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPoster(poster)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={poster}
                  alt={`Poster ${index + 1}`}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-medium">View Full Size</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for full-size view */}
        {selectedPoster && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
          >
            <motion.img
              src={selectedPoster}
              alt="Selected Poster"
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </div>
       {/* Bottom Right Flower */}
       <motion.div
          className="absolute bottom-8 right-8 w-22 h-22 opacity-20"
          initial={{ opacity: 0, rotate: 90 }}
          animate={isInView ? { opacity: 0.2, rotate: 0 } : { opacity: 0, rotate: 90 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-rose-400">
            <path d="M50 22c-7 0-14 6-14 14 0-8-6-14-14-14s-14 6-14 14 6 14 14 14c-8 0-14 6-14 14s6 14 14 14 14-6 14-14c0 8 6 14 14 14s14-6 14-14-6-14-14-14c8 0 14-6 14-14s-6-14-14-14z"/>
            <circle cx="50" cy="50" r="5" className="fill-yellow-200"/>
          </svg>
        </motion.div>
    </motion.section>
    
  );
};

export default Posters;