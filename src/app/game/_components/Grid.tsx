import React from "react";

interface GridProps {
  grid: string[][];
  handleCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, handleCellClick }) => {
  return (
    <div className="grid grid-cols-10 w-[41.25rem]">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={`w-[4rem] h-[4rem] border-[0.125rem] text-BH-primary text-3xl font-pixel-semibold ${
              cell
                ? "bg-grey-secondary cursor-not-allowed "
                : "bg-grey-primary hover:bg-grey-secondary cursor-pointer"
            }`}
            disabled={!!cell} // Disable the cell if it's already filled
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
};

export default Grid;
