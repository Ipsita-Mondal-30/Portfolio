'use client';
import { useEffect, useState, HTMLAttributes } from 'react';
import classNames from 'classnames';

// Define props with optional values and spread support
interface MeteorsProps extends HTMLAttributes<HTMLSpanElement> {
  number?: number;
  meteorWidth?: number;
  autoTrigger?: boolean;
}

interface MeteorStyle {
  top: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

const Meteors: React.FC<MeteorsProps> = ({ 
  number = 20, 
  meteorWidth = 50, 
  autoTrigger = true,
  ...props 
}) => {
  const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Auto-trigger on component mount (page load/refresh)
    if (autoTrigger) {
      setIsActive(true);
      
      // Generate meteor styles
      const styles: MeteorStyle[] = new Array(number).fill(null).map(() => ({
        top: -5,
        left: `${Math.floor(Math.random() * (typeof window !== 'undefined' ? window.innerWidth - meteorWidth : 1200))}px`,
        animationDelay: `${Math.random() * 1 + 0.2}s`,
        animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
      }));
      setMeteorStyles(styles);

      // Optional: Reset and restart animation every 15 seconds for continuous effect
      const interval = setInterval(() => {
        const newStyles: MeteorStyle[] = new Array(number).fill(null).map(() => ({
          top: -5,
          left: `${Math.floor(Math.random() * (typeof window !== 'undefined' ? window.innerWidth - meteorWidth : 1200))}px`,
          animationDelay: `${Math.random() * 1 + 0.2}s`,
          animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
        }));
        setMeteorStyles(newStyles);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [number, meteorWidth, autoTrigger]);

  // Handle window resize to recalculate positions
  useEffect(() => {
    const handleResize = () => {
      if (isActive) {
        const styles: MeteorStyle[] = new Array(number).fill(null).map(() => ({
          top: -5,
          left: `${Math.floor(Math.random() * (window.innerWidth - meteorWidth))}px`,
          animationDelay: `${Math.random() * 1 + 0.2}s`,
          animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
        }));
        setMeteorStyles(styles);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive, number, meteorWidth]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {meteorStyles.map((style, idx) => (
        <span
          key={`meteor-${idx}`}
          className={classNames(
            "pointer-events-none absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff20] opacity-70"
          )}
          style={{
            ...style,
            // Add some variation in opacity and glow
            boxShadow: `0_0_6px_2px rgba(148, 163, 184, ${0.3 + Math.random() * 0.4})`
          }}
          {...props}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-400 to-transparent opacity-80" />
        </span>
      ))}
      
      {/* Add CSS keyframes for meteor animation if not already defined */}
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
        
        .animate-meteor {
          animation: meteor linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Meteors;