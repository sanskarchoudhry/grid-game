import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#344CB7] text-white py-20">
      <h1 className="text-7xl font-pixel-bold mb-14">Multiplayer Grid Game</h1>
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-5xl font-bold mb-6">Welcome to the Game!</h3>
        <p className="text-lg text-center mb-8 max-w-md">
          <strong>Multiplayer Grid Game</strong> is an exciting online game
          where players take turns filling a 10x10 grid with unique characters.
          With a cooldown timer after each move, strategy and timing are key!
          Who will dominate the grid?
        </p>
        <p className="text-xl italic text-center">
          `The grid is yours to conquer, one move at a time!`
        </p>
      </div>

      <div className=" flex justify-between items-center">
        <Link
          href="/instructions"
          className="px-6 py-3 text-lg font-semibold hover:scale-105 transition"
        >
          Go to Instructions
        </Link>

        <Link
          href="/game"
          className="px-6 py-3 text-lg font-semibold hover:scale-105 transition"
        >
          Start the Game
        </Link>
      </div>
    </div>
  );
}
