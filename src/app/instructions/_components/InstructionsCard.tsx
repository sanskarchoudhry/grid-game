import React from "react";

interface InstructionsCardProps {
  instruction: {
    title: string;
    instruction: Array<{
      instructionTitle: string;
      instructions: string[];
    }>;
    instructionId: string;
  };
}

export default function InstructionsCard({
  instruction,
}: InstructionsCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">{instruction.title}</h2>
      {instruction.instruction.map((section) => (
        <div key={section.instructionTitle} className="mb-4">
          <h3 className="text-xl font-semibold">{section.instructionTitle}</h3>
          <ul className="list-disc pl-5">
            {section.instructions.map((instructionText, index) => (
              <li key={index}>{instructionText}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
