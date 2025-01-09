export interface InstructionType {
  title: string;
  instruction: {
    instructionTitle: string;
    instructions: string[];
  }[];
  instructionId: string;
}
