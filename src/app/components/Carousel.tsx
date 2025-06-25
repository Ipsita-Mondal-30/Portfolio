"use client";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Carousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const websites = [
    { image: '/website1.jpg', title: 'E-commerce Platform' },
    { image: '/website2.jpg', title: 'Portfolio Website' },
    { image: '/website3.jpg', title: 'Corporate Dashboard' },
    { image: '/website4.jpg', title: 'Mobile App Design' },
    { image: '/website5.jpg', title: 'Landing Page' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % websites.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + websites.length) % websites.length);
  };

  return (
    <motion.section 
      ref={ref}
      className="py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          Website UI Designs
        </motion.h2>
        
        <div className="relative max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          {/* Phone Frame */}
          <motion.div
            className="relative bg-black rounded-3xl p-2 md:p-3 lg:p-4 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Screen */}
            <div className="relative bg-white rounded-2xl overflow-hidden aspect-[9/16]">
              <motion.img
                key={currentIndex}
                src={websites[currentIndex].image}
                alt={websites[currentIndex].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
              >
                →
              </button>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full opacity-50" />
          </motion.div>
          
          {/* Title */}
          <motion.h3
            key={currentIndex}
            className="text-center mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {websites[currentIndex].title}
          </motion.h3>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {websites.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-blue-500 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Carousel;