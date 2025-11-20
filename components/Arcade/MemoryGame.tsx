import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MemoryCard } from '../../types';
import { Aperture, Box, Component, Dna, Hexagon, Layers } from 'lucide-react';

const icons = [Aperture, Box, Component, Dna, Hexagon, Layers];

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<MemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<MemoryCard | null>(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ 
         id: index, 
         iconName: card.displayName || `icon-${index}`, // Simplified for demo, mapped by index usually
         Icon: card, // Store component ref
         isFlipped: false,
         isMatched: false 
      }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards as any);
    setTurns(0);
  };

  const handleChoice = (card: MemoryCard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if ((choiceOne as any).Icon === (choiceTwo as any).Icon) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.id === choiceOne.id || card.id === choiceTwo.id) {
              return { ...card, isMatched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-md mb-6">
        <h3 className="text-xl font-bold text-white">Memory RAM</h3>
        <div className="px-4 py-1 bg-white/10 rounded-full font-mono text-sm">Turns: {turns}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.isMatched}
            disabled={disabled}
          />
        ))}
      </div>

      <button onClick={shuffleCards} className="mt-8 text-sm text-white/50 hover:text-white underline">
        Reset Memory Banks
      </button>
    </div>
  );
};

interface CardProps {
  card: any;
  handleChoice: (card: any) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front (Icon) */}
        <div 
            className="absolute inset-0 bg-purple-600 rounded-xl flex items-center justify-center border border-white/20 backface-hidden" 
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
           <card.Icon className="text-white w-8 h-8" />
        </div>

        {/* Back (Cover) */}
        <div 
            className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 cursor-pointer hover:bg-white/20 transition-colors backface-hidden flex items-center justify-center"
            onClick={handleClick}
            style={{ backfaceVisibility: 'hidden' }}
        >
             <span className="text-purple-500/30 text-2xl font-bold">?</span>
        </div>
      </motion.div>
    </div>
  );
};