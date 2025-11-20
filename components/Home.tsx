import React from 'react';
import { motion } from 'framer-motion';
import { PageState } from '../types';
import { ArrowRight, Gamepad2 } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageState) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative"
      >
        <div className="relative p-12 bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl max-w-3xl">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            killwinparty's website
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(PageState.BIO)}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-shadow"
            >
              Explore Bio <ArrowRight size={18} />
            </motion.button>
            
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(PageState.ARCADE)}
              className="w-full sm:w-auto px-8 py-4 bg-purple-900/50 text-white font-bold rounded-full border border-purple-500/50 flex items-center justify-center gap-2 hover:bg-purple-800/50 transition-colors"
            >
              Play Minigames <Gamepad2 size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};