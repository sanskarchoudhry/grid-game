"use client";

import { useState, useEffect, useRef } from "react";
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
  const [onlinePlayers, setOnlinePlayers] = useState<number>(0); // State for online players
  const ws = useRef<WebSocket | null>(null); // WebSocket instance

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:3001");

    // Handle incoming messages from the server
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "gridUpdate") {
        setGrid(data.grid);
      } else if (data.type === "playerCount") {
        setOnlinePlayers(data.count); // Update online player count
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.current?.close();
    };
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col]) {
      setSelectedCell({ row, col }); // Store clicked cell coordinates
      setShowPopup(true); // Show popup
    }
  };

  const handleCharacterSubmit = (char: string) => {
    if (selectedCell && ws.current) {
      const { row, col } = selectedCell;

      // Send the cell update to the server
      ws.current.send(
        JSON.stringify({
          type: "updateCell",
          row,
          col,
          char,
        })
      );

      setSelectedCell(null); // Reset selected cell
    }
    setShowPopup(false); // Close popup
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center relative">
      <h1 className="text-6xl font-pixel-bold text-center mb-4">
        Multiplayer Grid Game
      </h1>
      <p className="text-lg">Online Players: {onlinePlayers}</p>{" "}
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
