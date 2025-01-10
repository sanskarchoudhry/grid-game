import { v4 as uuidv4 } from "uuid";

export const instructionData = [
  {
    title: "How to Play",
    instruction: [
      {
        instructionTitle: "Select a Block:",
        instructions: [
          "Click on an empty block in the grid to make your move.",
        ],
      },
      {
        instructionTitle: "Input Your Character:",
        instructions: [
          "Type any valid Unicode character and press Submit.",
          "Your selection will lock the block for all players.",
        ],
      },
    ],
    instructionId: uuidv4(),
  },
  {
    title: "Rules",
    instruction: [
      {
        instructionTitle: "One Submission:",
        instructions: [
          "You can only submit one character until further updates. ",
        ],
      },
      {
        instructionTitle: "No Retakes:",
        instructions: [
          "Once you submit, your character choice is permanent for the block.",
        ],
      },
    ],
    instructionId: uuidv4(),
  },
];
