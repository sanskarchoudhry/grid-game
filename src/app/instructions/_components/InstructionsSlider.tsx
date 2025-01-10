"use client";
import React, { useState } from "react";
import InstructionsCard from "./InstructionsCard";
import { instructionData } from "@/data";
import Link from "next/link";

export default function InstructionsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to the next instruction card
  const nextSlide = () => {
    if (currentIndex < instructionData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to navigate to the previous instruction card
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-[40rem] h-auto bg-[#344CB7] rounded-3xl py-10 px-6">
      <section>
        <InstructionsCard instruction={instructionData[currentIndex]} />
      </section>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-md ${
            currentIndex ? "hover:scale-105" : "invisible"
          }`}
        >
          Previous
        </button>

        {currentIndex === instructionData.length - 1 ? (
          <Link href="/game">
            <button className="px-4 py-2 rounded-md hover:scale-110">
              Play the Game
            </button>
          </Link>
        ) : (
          <button
            onClick={nextSlide}
            disabled={currentIndex === instructionData.length - 1}
            className="px-4 py-2 rounded-md hover:scale-110"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
