import Link from "next/link"; // Import Link from Next.js

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#344CB7] text-white py-20">
      <h1 className="text-7xl font-pixel-bold mb-14">Grid Game</h1>
      <div className="flex flex-col">
        <h3 className="text-5xl font-bold mb-6">Welcome to the Game!</h3>

        <div className="space-y-4 flex justify-between items-center">
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
    </div>
  );
}
