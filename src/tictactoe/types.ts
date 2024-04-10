import { TTTLevel } from "@/src/general/interfaces";

export type TTTSlotType = null | 1 | 2;

export interface XOHook {
  level: TTTLevel;
  next: () => void;
  verify: () => TTTSlotType | boolean;
  restart: (winner?: 1 | 2) => void;
  board: TTTSlotType[];
  solved: boolean;
  turn: 1 | 2;
  winner: TTTSlotType;
  winId: [number, number, number] | null;
}