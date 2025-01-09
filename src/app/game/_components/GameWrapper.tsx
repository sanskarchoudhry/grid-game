"use client";
import { useState } from "react";
import Grid from "./Grid";

const GameWrapper: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(""))
  );

  const handleCellClick = (row: number, col: number) => {
    const char = prompt("Enter a Unicode character:");
    if (char) {
      const newGrid = [...grid];
      newGrid[row][col] = char;
      setGrid(newGrid);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-pixel-bold text-center mb-4 ">
        Multiplayer Grid Game
      </h1>
      <Grid grid={grid} handleCellClick={handleCellClick} />
    </div>
  );
};

export default GameWrapper;
