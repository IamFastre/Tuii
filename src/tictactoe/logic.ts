import { getRandomInt } from "@/src/general/funcs";
import { TTTLevel } from "@/src/general/interfaces";

import { TTTSlotType } from "./types";

const winConditions:[number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

function GetDouble(list:TTTSlotType[]) : 0 | 1 | 2 {
  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    if (s !== null && list.indexOf(s) !== list.lastIndexOf(s)) {
      return s;
    }
  }
  return 0;
}

export function NumberToLetter(p:1|2) {
  return p === 1 ? "X" : "O";
}

export function LevelToWeight(level:TTTLevel) : number {
  return level === "easy" ? 0.25 : level === "medium" ? 0.5 : level === "hard" ? 1 : 0;
}

export function CountEmpty(board:TTTSlotType[]) : number {
  return board.filter(x => x === null).length;
}

export function Verify(board:TTTSlotType[]) : TTTSlotType | boolean {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const value = board[condition[0]];

    if (value === null || value !== board[condition[1]] || value !== board[condition[2]]) {
      continue;
    }

    return value;
  }

  return board.every(cell => cell !== null);
}

export function GetWinningPos(board:TTTSlotType[]) : [number, number, number] | null {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const value = board[condition[0]];

    if (value === null || value !== board[condition[1]] || value !== board[condition[2]]) {
      continue;
    }

    return condition;
  }

  return null;
}

export function CPUMove(board:TTTSlotType[], cpu:TTTSlotType, level:TTTLevel = "medium") : number {
  const roll = (factor:number = 1) => Math.random() <= LevelToWeight(level) * factor;

  // Aggressive
  if (roll(1.25))
    for (let win of winConditions) {
      const line = win.map(v => board[v]);
      const dup = GetDouble(line);
      if (dup === cpu) {
        const spaces = win.filter(v => board[v] === null);
        if (spaces.length)
          return spaces[0];
      }
    }

  // Defensive
  if (roll())
    for (let win of winConditions) {
      const line = win.map(v => board[v]);
      const dup = GetDouble(line);
      if (dup) {
        const spaces = win.filter(v => board[v] === null);
        if (spaces.length)
          return spaces[0];
      }
    }

  // Get center
  if (roll())
    if (board[4] === null)
      return 4;

  // Get corners
  if (roll()) {
    const emptyCorners = [0, 2, 6, 8].filter(i => board[i] === null);
    if (emptyCorners.length)
      return emptyCorners[getRandomInt(0, emptyCorners.length)];
  }

  // Desperate, get a random space
  const emptySpaces = [...board.keys()].filter(i => board[i] === null);
  return emptySpaces.length ? emptySpaces[getRandomInt(0, emptySpaces.length)] : -1;
}
