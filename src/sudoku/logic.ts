import { deepCopy, getRandomInt } from "@/src/general/funcs";
import { SudokuLevel } from "@/src/general/interfaces";

import { DigitType, Position, SudSlotType, SudokuGrid } from "./types";

export const EmptyBoard:SudokuGrid = Array(9).fill(Array(9).fill(null));

export function LevelToNumber(lvl:SudokuLevel) : number {
  return lvl === "easy" ? 36 : lvl === "medium" ? 48 : lvl === "hard" ? 57 : 64;
}

/* ========================================================================== */

export function MakeBoard(pokes?:number) : SudokuGrid {
  function pattern(r:number, c:number) {
    return (3 * (r % 3) + Math.floor(r / 3) + c) % 9;
  }

  function shuffle(list:DigitType[]) {
    return deepCopy(list).sort(() => 0.5 - Math.random());
  }

  const rBase = deepCopy(Object.keys(Array(3).fill(undefined))) as any as DigitType[];

  const rows:DigitType[] = [];
  const cols:DigitType[] = [];

  shuffle(rBase).forEach(r => {
    shuffle(rBase).forEach(g => {
      rows.push(g*3 + r as DigitType);
    });
  });

  shuffle(rBase).forEach(r => {
    shuffle(rBase).forEach(g => {
      cols.push(g*3 + r as DigitType);
    });
  });

  const nums = shuffle([1,2,3,4,5,6,7,8,9]);
  const table:SudokuGrid = [];

  rows.forEach((r) => {
    table.push(cols.map(c => nums[pattern(r, c)]))
  });

  return pokes ? Poke(table, pokes) : table;
}

export function Poke(board:SudokuGrid, pokes: number) : SudokuGrid {
  board = deepCopy(board);

  while (pokes) {
    let r = getRandomInt(0, board.length), c = getRandomInt(0, board[r].length);
    let before = board[r][c];
    board[r][c] = null;

    if (before)
      pokes--;
  }

  return board;
}

/* ========================================================================== */

export function GetRows(board:SudokuGrid) : SudSlotType[][] {
  return board;
}

export function GetCols(board:SudokuGrid) : SudSlotType[][] {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

export function GetSubs(board:SudokuGrid) : SudSlotType[][] {
  const size:number = Math.sqrt(board.length);
  const subs:SudSlotType[][] = [];

  for (let rowStart = 0; rowStart < board.length; rowStart += size) {
    for (let colStart = 0; colStart < board[0].length; colStart += size) {
      const subgrid: SudSlotType[] = [];
      for (let row = rowStart; row < rowStart + size; row++) {
        subgrid.push(...board[row].slice(colStart, colStart + size));
      }
      subs.push(subgrid as SudSlotType[]);
    }
  }

  return subs;
}

/* ========================================================================== */

export function CountEmpty(board:SudokuGrid) : number {
  var i = 0;
  board.forEach(row => row.forEach(v => v === null ? i++ : i))
  return i;
}

export function GetEmpty(board:SudokuGrid) : Position[] {
  var list:Position[] = [];
  board.forEach((row, r) => row.forEach((slot, c) => slot === null ? list.push([r, c]) : null))
  return list;
}

export function GetDuplicates(board:SudokuGrid) : Position[] {
  if (board.length === 0)
    return [];

  var list:Position[] = [];

  // Checking rows
  for (let r = 0; r < GetRows(board).length; r++) {
    const row = GetRows(board)[r];
    row.forEach((s, c) => {
      if (s !== null && row.indexOf(s) !== row.lastIndexOf(s))
        list.push([r, c]);
    });
  }

  // Checking cols
  for (let c = 0; c < GetCols(board).length; c++) {
    const col = GetCols(board)[c];
    col.forEach((s, r) => {
      if (s !== null && col.indexOf(s) !== col.lastIndexOf(s))
        list.push([r, c]);
    });
  }

  // Checking subs
  for (let b = 0; b < GetSubs(board).length; b++) {
    const sub = GetSubs(board)[b];
    sub.forEach((s, i) => {
      let r = Math.floor(i / 3) + Math.floor(b / 3) * 3, c = i % 3 + b % 3 * 3;
      if (s !== null && sub.indexOf(s) !== sub.lastIndexOf(s))
        list.push([r, c]);
    });
  }
  
  list.map(e => JSON.stringify(e)).map((item, index, arr) => {
    if (arr.indexOf(item) !== index)
      delete list[index]
  });

  return list.sort().filter(e => e);
}

/* ========================================================================== */

export function GetPosition(num:number) : Position {
  return [Math.floor(num / 9), Math.floor(num % 9)]
}

export function GetIndex([r, c]:Position) : number {
  return r * 9 + c;
}

/* ========================================================================== */

export function IsSolved(board:SudokuGrid, solution:SudokuGrid) {
  if (CountEmpty(board))
    return false;

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c <  board[r].length; c++) {
      if (board[r][c] !== solution[r][c])
        return false;
    }
  }

  return true;
}