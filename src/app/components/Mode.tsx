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
      ctx.fillStyle = "#11111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);
          
          ctx.lineWidth = 0.5;
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
      className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <div className="aspect-video relative overflow-hidden">
      <Image
  src={image}
  alt={title}
  width={600}
  height={400}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold mb-2 group-hover:text-red-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {description}
        </p>
      </div>

      {/* Netflix-style glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

// Main Mode Component
const Mode: FC = () => {
  const router = useRouter();




  const handleDesignClick = () => {
    router.push('./design'); // ✅
  };

  const handleTechClick = () => {
    router.push('./tech'); // ✅
  };
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Grid Background */}
      <Squares
        direction="diagonal"
        speed={0.5}
        borderColor="#333333"
        squareSize={80}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
           {/* Header */}
     Hii, I’m Ipsita!<br />
        Choose how you want to explore ↓
      </h1>
         
          <p className="text-gray-400 text-lg md:text-xl">
            Explore my work through different perspectives
          </p>
        </motion.div>

        {/* Netflix-style Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <ModeCard
  title="Design Side"
  description="Explore my creative design work, and visual storytelling"
  image="/design.png" // ✅ fixed path
  onClick={handleDesignClick}
/>
          
          <ModeCard
            title="Tech Side"
            description="Dive into my development projects, coding skills, and technical expertise"
            image="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&crop=entropy&auto=format"
            onClick={handleTechClick}
          />
        </motion.div>
      </div>

    </div>
  );
};

export default Mode;