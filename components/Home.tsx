import React from 'react';
import { motion } from 'framer-motion';
import { PageState } from '../types';
import { ArrowRight, Binary, Fingerprint } from 'lucide-react';

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
        {/* Removed gradient oval here */}
        <div className="relative p-8 bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl max-w-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-500/30">
              <Fingerprint size={48} className="text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            System Online
          </h1>
          
          <p className="text-xl text-purple-200/60 mb-8 font-light">
            Welcome to the digital mindscape. <br/>
            Explore the bio-data, visualize the gallery, or hack the arcade.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(PageState.BIO)}
              className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-shadow"
            >
              Initialize Bio <ArrowRight size={18} />
            </motion.button>
            
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(PageState.ARCADE)}
              className="px-8 py-4 bg-purple-900/50 text-white font-bold rounded-full border border-purple-500/50 flex items-center gap-2 hover:bg-purple-800/50"
            >
              Enter Arcade <Binary size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};