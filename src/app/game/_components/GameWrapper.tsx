"use client";
import { useState } from "react";
import Grid from "./Grid";
import CharacterInputPopup from "./CharacterInputPopup";

const GameWrapper: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(""))
  );

  const [showPopup, setShowPopup] = useState<boolean>(false); // Popup visibility state
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col]) {
      setSelectedCell({ row, col }); // Store clicked cell coordinates
      setShowPopup(true); // Show popup
    }
  };

  const handleCharacterSubmit = (char: string) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newGrid = [...grid];
      newGrid[row][col] = char; // Update grid with character
      setGrid(newGrid);
      setSelectedCell(null); // Reset selected cell
    }
    setShowPopup(false); // Close popup
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center relative">
      <h1 className="text-6xl font-pixel-bold text-center mb-4 ">
        Multiplayer Grid Game
      </h1>
      <Grid grid={grid} handleCellClick={handleCellClick} />
      {showPopup && (
        <CharacterInputPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleCharacterSubmit}
        />
      )}
    </div>
  );
};

export default GameWrapper;
