'use client';

import React, { useState, useEffect } from 'react';

const LeftBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Delay appearance for smooth entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      const progress = Math.min((scrolled / windowHeight) * 100, 100);
      setScrollProgress(progress);
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-1 z-50 pointer-events-none">
      {/* Background bar */}
      <div
        className={`h-full w-full bg-[#fae8e6] transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 w-full transition-all duration-300 ease-out"
        style={{
          height: `${scrollProgress}%`,
          background: 'linear-gradient(to bottom, #8f5cae, #e9bfc3)',
          boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
          borderRadius: '0 0 4px 4px',
        }}
      />

      {/* Glow effect overlay */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: `${scrollProgress}%`,
          boxShadow: '0 0 30px rgba(219, 39, 119, 0.3)',
          transition: 'height 300ms ease-out',
        }}
      />
    </div>
  );
};

export default LeftBar;
