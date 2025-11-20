import React, { useState, useEffect } from 'react';
import { Bomb, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const BOARD_SIZE = 8;
const BOMB_COUNT = 8;

interface Cell {
  row: number;
  col: number;
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export const Minesweeper: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard: Cell[][] = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        row.push({ row: r, col: c, isBomb: false, isRevealed: false, isFlagged: false, neighborCount: 0 });
      }
      newBoard.push(row);
    }

    // Place bombs
    let bombsPlaced = 0;
    while (bombsPlaced < BOMB_COUNT) {
      const r = Math.floor(Math.random() * BOARD_SIZE);
      const c = Math.floor(Math.random() * BOARD_SIZE);
      if (!newBoard[r][c].isBomb) {
        newBoard[r][c].isBomb = true;
        bombsPlaced++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (!newBoard[r][c].isBomb) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (r+i >= 0 && r+i < BOARD_SIZE && c+j >= 0 && c+j < BOARD_SIZE && newBoard[r+i][c+j].isBomb) {
                count++;
              }
            }
          }
          newBoard[r][c].neighborCount = count;
        }
      }
    }
    setBoard(newBoard);
    setGameOver(false);
    setWon(false);
  };

  const revealCell = (r: number, c: number) => {
    if (gameOver || won || board[r][c].isFlagged || board[r][c].isRevealed) return;

    const newBoard = [...board];
    const cell = newBoard[r][c];
    cell.isRevealed = true;

    if (cell.isBomb) {
      setGameOver(true);
      // Reveal all bombs
      newBoard.forEach(row => row.forEach(c => { if(c.isBomb) c.isRevealed = true; }));
      setBoard(newBoard);
      return;
    }

    if (cell.neighborCount === 0) {
      // Flood fill
      const queue = [{r, c}];
      while(queue.length > 0) {
        const {r: cr, c: cc} = queue.shift()!;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const nr = cr+i, nc = cc+j;
              if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isBomb && !newBoard[nr][nc].isFlagged) {
                  newBoard[nr][nc].isRevealed = true;
                  if (newBoard[nr][nc].neighborCount === 0) queue.push({r: nr, c: nc});
                }
              }
            }
          }
      }
    }

    setBoard(newBoard);
    checkWin(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won || board[r][c].isRevealed) return;
    const newBoard = [...board];
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (currentBoard: Cell[][]) => {
    let revealedCount = 0;
    currentBoard.forEach(row => row.forEach(cell => {
      if (cell.isRevealed) revealedCount++;
    }));
    if (revealedCount === (BOARD_SIZE * BOARD_SIZE - BOMB_COUNT)) {
      setWon(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4">
        <div className="text-red-400 font-bold">{gameOver ? 'SYSTEM FAILURE' : won ? 'SYSTEM SECURED' : 'CLEAR THE SECTORS'}</div>
        <button onClick={initializeBoard} className="text-xs px-3 py-1 bg-white/10 rounded hover:bg-white/20">RESET</button>
      </div>
      <div 
        className="grid gap-1 p-2 bg-black/40 rounded-lg border border-purple-500/30"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
      >
        {board.map((row, r) => (
          row.map((cell, c) => (
            <motion.div
              key={`${r}-${c}`}
              initial={false}
              animate={{ scale: cell.isRevealed ? 0.95 : 1 }}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded cursor-pointer text-sm font-bold select-none
                ${cell.isRevealed 
                  ? (cell.isBomb ? 'bg-red-900/80 border border-red-500' : 'bg-white/10 text-purple-200') 
                  : 'bg-purple-900/40 hover:bg-purple-800/50 border border-white/5'}
              `}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
            >
              {cell.isRevealed ? (
                cell.isBomb ? <Bomb size={16} /> : (cell.neighborCount > 0 ? cell.neighborCount : '')
              ) : (
                cell.isFlagged ? <Flag size={16} className="text-yellow-400" /> : ''
              )}
            </motion.div>
          ))
        ))}
      </div>
    </div>
  );
};