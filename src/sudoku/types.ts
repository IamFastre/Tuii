import { SudokuLevel } from "../general/interfaces";

export type DigitType   = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SlotType    = DigitType | null;
export type SudokuGrid  = SlotType[][];
export type Position    = [r: number, c: number];

export interface SudokuHook {
  ready: boolean;
  solution: SudokuGrid;
  level: SudokuLevel;
  poked: Position[];
  revealed: Position[];
  reveal: () => void;
  regenerate: () => void;
  board: SudokuGrid;
  selected: number | undefined;
}