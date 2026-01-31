'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  goToEarlierLevel,
  goToLaterLevel,
  move,
  undo,
  requestHint,
  resetLevel,
  selectCurrent,
  selectGoal,
  selectLevelIndex,
  selectSolved,
  selectShowingHint,
  selectHint,
  WALL,
  PAWN,
  NORTH,
  WEST,
  SOUTH,
  EAST,
} from '@/lib/features/gridGame/gridGameSlice';
import type { Direction } from '@/lib/features/gridGame/graphSearch';

interface CellProps {
  row: number;
  column: number;
  isWall: boolean;
  isPawn: boolean;
  isGoal: boolean;
}

function Cell({ row, column, isWall, isPawn, isGoal }: CellProps) {
  let cellContent = null;
  let bgColor = 'bg-lion-blue-50';

  if (isGoal) {
    bgColor = 'bg-lion-gold/30';
    cellContent = (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full border-4 border-dashed border-lion-gold animate-pulse" />
      </div>
    );
  }

  if (isPawn) {
    bgColor = isGoal ? 'bg-green-200' : 'bg-lion-blue-100';
    cellContent = (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full bg-lion-blue-600 shadow-lg" />
      </div>
    );
  }

  if (isWall) {
    bgColor = 'bg-lion-blue-800';
    cellContent = null;
  }

  return (
    <div
      className={`${bgColor} border border-lion-blue-200 transition-all duration-200`}
      style={{
        gridColumn: column + 1,
        gridRow: row + 1,
      }}
    >
      {cellContent}
    </div>
  );
}

function getDirectionName(direction: Direction | undefined): string {
  if (!direction) return '';
  if (direction[0] === NORTH[0] && direction[1] === NORTH[1]) return 'North (Up)';
  if (direction[0] === SOUTH[0] && direction[1] === SOUTH[1]) return 'South (Down)';
  if (direction[0] === EAST[0] && direction[1] === EAST[1]) return 'East (Right)';
  if (direction[0] === WEST[0] && direction[1] === WEST[1]) return 'West (Left)';
  return '';
}

export default function GridGameDemo() {
  const current = useAppSelector(selectCurrent);
  const goal = useAppSelector(selectGoal);
  const level = useAppSelector(selectLevelIndex);
  const showHint = useAppSelector(selectShowingHint);
  const generatedHint = useAppSelector(selectHint);
  const solved = useAppSelector(selectSolved);
  const dispatch = useAppDispatch();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          dispatch(move({ direction: NORTH }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          dispatch(move({ direction: SOUTH }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          dispatch(move({ direction: WEST }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          dispatch(move({ direction: EAST }));
          break;
        case 'z':
        case 'Z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            dispatch(undo());
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  const cells: JSX.Element[] = [];
  for (const [row, column] of current.getLocations()) {
    const currentCellType = current.get([row, column]);
    const goalCellType = goal.get([row, column]);
    cells.push(
      <Cell
        key={`${row},${column}`}
        row={row}
        column={column}
        isWall={currentCellType === WALL}
        isPawn={currentCellType === PAWN}
        isGoal={goalCellType === PAWN}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lion-blue-900 to-lion-blue-800 text-white">
      {/* Header */}
      <header className="p-4 border-b border-lion-blue-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="flex items-center gap-2 text-lion-gold hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-xl font-bold">Grid Puzzle Game</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Level Info */}
        <div className="text-center mb-6">
          <span className="text-lion-gold text-lg font-semibold">Level {level + 1}</span>
          {solved && (
            <div className="mt-2 text-green-400 text-xl font-bold animate-bounce">
              🎉 Complete! 🎉
            </div>
          )}
          {showHint && generatedHint && (
            <div className="mt-2 text-yellow-300 text-lg">
              💡 Hint: Move {getDirectionName(generatedHint)}
            </div>
          )}
        </div>

        {/* Level Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => dispatch(goToEarlierLevel())}
            className="px-4 py-2 bg-lion-blue-700 hover:bg-lion-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={level === 0}
          >
            ← Previous
          </button>
          <button
            onClick={() => dispatch(goToLaterLevel())}
            className="px-4 py-2 bg-lion-blue-700 hover:bg-lion-blue-600 rounded-lg transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center mb-8">
          <div
            className="grid gap-0 bg-lion-blue-200 p-1 rounded-lg shadow-2xl"
            style={{
              gridTemplateColumns: `repeat(${current.width}, minmax(40px, 60px))`,
              gridTemplateRows: `repeat(${current.height}, minmax(40px, 60px))`,
            }}
          >
            {cells}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          {/* Direction Buttons */}
          <div className="grid grid-cols-3 gap-2 w-fit">
            <div />
            <button
              onClick={() => dispatch(move({ direction: NORTH }))}
              className="w-14 h-14 bg-lion-gold hover:bg-yellow-400 text-lion-blue-900 rounded-lg font-bold text-xl shadow-lg transition-all active:scale-95"
            >
              ↑
            </button>
            <div />
            <button
              onClick={() => dispatch(move({ direction: WEST }))}
              className="w-14 h-14 bg-lion-gold hover:bg-yellow-400 text-lion-blue-900 rounded-lg font-bold text-xl shadow-lg transition-all active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => dispatch(move({ direction: SOUTH }))}
              className="w-14 h-14 bg-lion-gold hover:bg-yellow-400 text-lion-blue-900 rounded-lg font-bold text-xl shadow-lg transition-all active:scale-95"
            >
              ↓
            </button>
            <button
              onClick={() => dispatch(move({ direction: EAST }))}
              className="w-14 h-14 bg-lion-gold hover:bg-yellow-400 text-lion-blue-900 rounded-lg font-bold text-xl shadow-lg transition-all active:scale-95"
            >
              →
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => dispatch(undo())}
              className="px-6 py-2 bg-lion-blue-600 hover:bg-lion-blue-500 rounded-lg transition-colors"
            >
              Undo
            </button>
            <button
              onClick={() => dispatch(requestHint())}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors"
            >
              Hint
            </button>
            <button
              onClick={() => dispatch(resetLevel())}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-lion-blue-800/50 rounded-xl p-6">
          <h2 className="text-lion-gold font-bold text-lg mb-4">How to Play</h2>
          <ul className="space-y-2 text-lion-blue-100">
            <li>• Move all pawns (blue circles) to their goal positions (dashed circles)</li>
            <li>• All pawns move together in the same direction</li>
            <li>• Pawns cannot move through walls (dark squares)</li>
            <li>• Use arrow keys or WASD to move, Ctrl+Z to undo</li>
            <li>• Click &quot;Hint&quot; if you get stuck!</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 text-center text-lion-blue-300 text-sm">
          <p>Built with React, Redux Toolkit, and Graph Search Algorithms (BFS)</p>
        </div>
      </main>
    </div>
  );
}
