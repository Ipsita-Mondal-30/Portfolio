import { useRef, useEffect, FC } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Squares Background Component
interface SquaresProps {
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
}

const Squares: FC<SquaresProps> = ({
  direction = "down",
  speed = 1,
  borderColor = "#333333",
  squareSize = 60,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);
          
          ctx.lineWidth = 0.3;
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }
      
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [direction, speed, borderColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

// ModeCard Component
interface ModeCardProps {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

const ModeCard: FC<ModeCardProps> = ({ title, description, image, onClick }) => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group border border-gray-700/50 shadow-2xl"
      whileHover={{ scale: 1.05, y: -15 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-red-400 transition-all duration-300 drop-shadow-lg">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-400 drop-shadow-md">
          {description}
        </p>
      </div>

      {/* Enhanced glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-red-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

// Main Mode Component
const Mode: FC = () => {
  const router = useRouter();

  const handleDesignClick = () => {
    router.push('./design');
  };

  const handleTechClick = () => {
    router.push('./tech');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Grid Background - Made smaller and slower */}
      <Squares
        direction="diagonal"
        speed={0.2}
        borderColor="#404040"
        squareSize={40}
      />

      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hii, I'm Ipsita!<br />
            <span className="text-3xl md:text-5xl text-gray-300 font-medium">
              Choose how you want to explore ↓
            </span>
          </motion.h1>
         
          <motion.p 
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Explore my work through different perspectives and discover the intersection of creativity and technology
          </motion.p>
        </motion.div>

        {/* Netflix-style Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ModeCard
              title="Design Side"
              description="Explore my creative design work, visual storytelling, and artistic journey through innovative digital experiences"
              image="/design.png"
              onClick={handleDesignClick}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ModeCard
              title="Tech Side"
              description="Dive into my development projects, coding skills, and technical expertise in building cutting-edge solutions"
              image="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&crop=entropy&auto=format"
              onClick={handleTechClick}
            />
          </motion.div>
        </motion.div>

        {/* Subtle bottom decoration */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />
        </motion.div>
      </div>
    </div>
  );
};

export default Mode;