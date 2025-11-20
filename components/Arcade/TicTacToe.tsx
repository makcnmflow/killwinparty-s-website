import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Player is X
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (i: number) => {
    if (winner || board[i] || !isXNext) return; // Prevent move if won, filled, or CPU turn

    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXNext(false); // CPU Turn
    }
  };

  // CPU Move
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        if (emptyIndices.length > 0) {
          const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIdx] = 'O';
          setBoard(newBoard);
          const w = checkWinner(newBoard);
          if (w) setWinner(w);
          else if (!newBoard.includes(null)) setWinner('Draw');
          else setIsXNext(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  return (
    <div className="flex flex-col items-center">
       <div className="mb-6 text-xl font-mono text-purple-200">
         {winner ? (winner === 'Draw' ? 'DRAW' : `WINNER: ${winner}`) : (isXNext ? 'YOUR TURN (X)' : 'CPU COMPUTING...')}
       </div>

       <div className="grid grid-cols-3 gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
         {board.map((cell, i) => (
           <button
             key={i}
             onClick={() => handleClick(i)}
             className="w-20 h-20 sm:w-24 sm:h-24 bg-black/40 rounded-xl flex items-center justify-center text-4xl hover:bg-white/5 transition-colors disabled:cursor-default"
             disabled={!!cell || !!winner || !isXNext}
           >
             {cell === 'X' && <X size={48} className="text-purple-400" />}
             {cell === 'O' && <Circle size={40} className="text-blue-400" />}
           </button>
         ))}
       </div>
       
       <button 
         onClick={resetGame}
         className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2 text-sm transition-colors"
       >
         <RotateCcw size={16} /> RESTART SEQUENCE
       </button>
    </div>
  );
};