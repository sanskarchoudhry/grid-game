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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  const [cooldownTime, setCooldownTime] = useState<number>(0); // Cooldown time in seconds
  const ws = useRef<WebSocket | null>(null); // WebSocket instance
  const playerId = useRef<string | null>(null); // Player ID

  useEffect(() => {
    // Generate a unique playerId for the user
    playerId.current = Math.random().toString(36).substr(2, 9);

    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:3001");

    // Handle incoming messages from the server
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "gridUpdate") {
        setGrid(data.grid);
      } else if (data.type === "playerCount") {
        setOnlinePlayers(data.count); // Update online player count
      } else if (data.type === "error") {
        setErrorMessage(data.message); // Show cooldown error
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    // If cooldownTime is greater than 0, start the timer
    if (cooldownTime > 0) {
      const timerInterval = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrease the time every second

      // Cleanup the interval on component unmount
      return () => clearInterval(timerInterval);
    }
  }, [cooldownTime]);

  const handleCellClick = (row: number, col: number) => {
    if (cooldownTime > 0) {
      // If the user tries to click during cooldown, show error message
      setErrorMessage("You need to wait before making another move.");
    } else if (!grid[row][col]) {
      setSelectedCell({ row, col }); // Store clicked cell coordinates
      setShowPopup(true); // Show popup
    }
  };

  const handleCharacterSubmit = (char: string) => {
    if (selectedCell && ws.current && playerId.current) {
      const { row, col } = selectedCell;

      // Send the cell update to the server, including the playerId
      ws.current.send(
        JSON.stringify({
          type: "updateCell",
          row,
          col,
          char,
          playerId: playerId.current,
        })
      );

      // Start the cooldown timer
      setCooldownTime(60); // 60 seconds cooldown

      setSelectedCell(null); // Reset selected cell
    }
    setShowPopup(false); // Close popup
    setErrorMessage(null); // Reset error message after submission
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center relative">
      <h1 className="text-6xl font-pixel-bold text-center mb-4">
        Multiplayer Grid Game
      </h1>
      <p className="text-lg">Online Players: {onlinePlayers}</p>
      {cooldownTime > 0 && errorMessage && (
        <p className="text-red-error mt-2">{errorMessage}</p>
      )}{" "}
      {/* Show error message */}
      {cooldownTime > 0 && (
        <p className="text-lg text-red-500">
          Cooldown: {cooldownTime} seconds left
        </p>
      )}
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
