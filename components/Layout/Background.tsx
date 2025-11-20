import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Globe, Hexagon, Layers, Zap, Wifi } from 'lucide-react';

const icons = [Code2, Cpu, Database, Globe, Hexagon, Layers, Zap, Wifi];

interface FloatingIcon {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

export const Background: React.FC = () => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Generate random icons for background
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1, // 0.5 to 1.5
      duration: 15 + Math.random() * 20, // Slow movement
      delay: Math.random() * 5,
    }));
    setFloatingIcons(items);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0f0518]">
      {/* Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-fuchsia-900/10 rounded-full blur-[80px]" />

      {/* Grid overlay for 'Cyber' feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Icons */}
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-purple-500/10"
          initial={{ x: `${item.x}vw`, y: `${item.y}vh`, opacity: 0 }}
          animate={{
            y: [`${item.y}vh`, `${(item.y + 20) % 100}vh`, `${item.y}vh`],
            x: [`${item.x}vw`, `${(item.x + 10) % 100}vw`, `${item.x}vw`],
            opacity: [0, 0.4, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay,
          }}
        >
          <item.Icon size={48 * item.scale} />
        </motion.div>
      ))}
    </div>
  );
};