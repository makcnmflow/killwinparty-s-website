import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bomb, Grid3X3, BrainCircuit, ArrowLeft } from 'lucide-react';
import { Minesweeper } from './Minesweeper';
import { TicTacToe } from './TicTacToe';
import { MemoryGame } from './MemoryGame';

type GameType = 'MINES' | 'TICTACTOE' | 'MEMORY' | null;

export const ArcadeHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  if (activeGame) {
    return (
      <div className="h-full flex flex-col pb-24">
        <button 
          onClick={() => setActiveGame(null)}
          className="mb-6 flex items-center gap-2 text-purple-300 hover:text-white transition-colors self-start px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5"
        >
          <ArrowLeft size={20} /> Back to Arcade
        </button>
        
        <div className="flex-grow flex items-center justify-center p-4 border border-white/10 rounded-3xl bg-black/20 backdrop-blur-sm">
            {activeGame === 'MINES' && <Minesweeper />}
            {activeGame === 'TICTACTOE' && <TicTacToe />}
            {activeGame === 'MEMORY' && <MemoryGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center pb-20">
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 uppercase">
        SELECT A GAME
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Minesweeper Card */}
        <GameCard 
          title="Minesweeper" 
          icon={Bomb} 
          color="text-red-400" 
          onClick={() => setActiveGame('MINES')} 
          desc="Classic Minesweeper game."
        />

        {/* Tic Tac Toe Card */}
        <GameCard 
          title="Tic Tac Toe (with stupid ai)" 
          icon={Grid3X3} 
          color="text-blue-400" 
          onClick={() => setActiveGame('TICTACTOE')} 
          desc="Play against the computer."
        />

        {/* Memory Card */}
        <GameCard 
          title="Memory Game" 
          icon={BrainCircuit} 
          color="text-green-400" 
          onClick={() => setActiveGame('MEMORY')} 
          desc="Flip cards to find pairs."
        />
      </div>
    </div>
  );
};

const GameCard: React.FC<{ title: string; icon: any; color: string; onClick: () => void; desc: string }> = ({ title, icon: Icon, color, onClick, desc }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="relative group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col items-center text-center hover:bg-white/10 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
  >
    <div className={`p-6 rounded-2xl bg-black/40 mb-6 ${color} group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={48} />
    </div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-white/50 text-sm">{desc}</p>
  </motion.button>
);
