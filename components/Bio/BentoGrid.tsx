import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldAlert, Code, Terminal, Globe2, User } from 'lucide-react';

// @ts-ignore
import bioVideo from './vido.mp4';
// @ts-ignore
import avatarIcon from './icon.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export const Bio: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-full md:h-[80vh] w-full max-w-6xl mx-auto pb-24 md:pb-0"
    >
      {/* 1. Large Avatar Widget (Row 1-2, Col 1) */}
      <motion.div
        variants={itemVariants}
        className="md:row-span-2 md:col-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10 pointer-events-none" />
        
        {/* Background Video from current directory */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          src={bioVideo}
        />

        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <div className="flex items-center gap-4 mb-4">
             {/* Avatar Circle with Spinning Border */}
             <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Spinning ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-purple-500 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-1 rounded-full border border-white/20" />
                
                {/* Avatar Image */}
                <div className="w-full h-full rounded-full overflow-hidden p-1.5">
                  <img 
                    src={avatarIcon} 
                    alt="killwinparty" 
                    className="w-full h-full rounded-full object-cover bg-black/50"
                  />
                </div>
             </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-1">killwinparty</h2>
          <p className="text-purple-300 font-mono text-sm tracking-wider">Senior Creative Engineer</p>
        </div>
      </motion.div>

      {/* 2. Personality Card (Row 1, Col 2-3) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-xl flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-32 bg-purple-600/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="flex items-center gap-3 mb-4 text-purple-300">
            <User size={20} />
            <span className="uppercase tracking-widest text-xs font-bold">The Human Element</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          "Curious Explorer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Lifelong Learner.</span>"
        </h3>
        <p className="text-lg text-white/70">
          I don't just code; I explore. I have a deep passion for learning new things every day, dissecting complex systems, and reconstructing them with better UI.
        </p>
      </motion.div>

      {/* 3. Interest: AI (Row 2, Col 2) */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group"
      >
        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 text-purple-400 group-hover:text-white group-hover:scale-110 transition-all">
          <Brain size={24} />
        </div>
        <h4 className="text-xl font-semibold mb-2">AI & Neural Nets</h4>
        <p className="text-sm text-white/60 leading-relaxed">
          Fascinated by model architecture and advanced Prompt Engineering.
        </p>
      </motion.div>

      {/* 4. Interest: CyberSec (Row 2, Col 3) */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-green-900/10 transition-colors group overflow-hidden relative"
      >
        {/* Matrix effect overlay hint */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[url('https://media.giphy.com/media/fVeAI9dyD5ssIFyOyM/giphy.gif')] bg-cover pointer-events-none mix-blend-screen transition-opacity duration-500" />
        
        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4 text-green-400 group-hover:text-green-300 transition-all relative z-10">
          <ShieldAlert size={24} />
        </div>
        <h4 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-green-400 transition-colors">Cybersecurity</h4>
        <p className="text-sm text-white/60 leading-relaxed relative z-10">
          Diving into InfoSec. Interested in how systems break and how to protect them.
        </p>
      </motion.div>

      {/* 5. Skills Stats (Row 3, Col 1-3) */}
      <motion.div
        variants={itemVariants}
        className="md:col-span-3 p-6 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-center"
      >
        {/* Python */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2 text-yellow-400">
               <Code size={18} /> <span className="font-bold">Python</span>
             </div>
             <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded">17% LOADED</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "17%" }} 
               transition={{ duration: 1.5, delay: 0.5 }}
               className="h-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
             />
          </div>
          <p className="text-xs text-white/40">Basic Syntax. Loops. Still initializing core modules...</p>
        </div>

        {/* Languages divider */}
        <div className="hidden md:block w-px h-16 bg-white/10" />

        {/* Russian */}
        <div className="flex-1 w-full">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2 text-blue-400">
               <Globe2 size={18} /> <span className="font-bold">Russian</span>
             </div>
             <span className="text-xs font-mono text-green-400">100% MASTERED</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "100%" }} 
               transition={{ duration: 1, delay: 0.2 }}
               className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
             />
          </div>
          <p className="text-xs text-white/40">Native Speaker. Full vocabulary access.</p>
        </div>

        {/* English */}
        <div className="flex-1 w-full">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-2 text-red-400">
               <Terminal size={18} /> <span className="font-bold">English</span>
             </div>
             <span className="text-xs font-mono text-yellow-200">45% UPGRADING</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "45%" }} 
               transition={{ duration: 1.2, delay: 0.4 }}
               className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
             />
          </div>
          <p className="text-xs text-white/40">Conversational. Reading docs & upgrading vocab DB.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
