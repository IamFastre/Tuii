import { SudokuLevel } from "@/src/general/interfaces";

export type DigitType   = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudSlotType = DigitType | null;
export type SudokuGrid  = SudSlotType[][];
export type Position    = [r: number, c: number];

export interface SudokuHook {
  ready: boolean;
  solution: SudokuGrid;
  level: SudokuLevel;
  poked: Position[];
  revealed: Position[];
  revealSlot: ([r, c]:Position) => void;
  revealBoard: () => void;
  verify: () => boolean;
  regenerate: () => void;
  board: SudokuGrid;
  solved: boolean;
  selected: number | undefined;
}