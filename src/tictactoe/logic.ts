import { TTTSlotType } from "./types";

export function NumberToLetter(p:1|2) {
  return p === 1 ? "X" : "O";
}

export function CountEmpty(board:TTTSlotType[]) : number {
  return board.filter(x => x === null).length;
}

export function Verify(board:TTTSlotType[]) : TTTSlotType | boolean {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

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