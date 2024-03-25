import { SlotType, SudokuGrid } from "./types";

export const EmptyBoard:SudokuGrid = Array(9).fill(Array(9).fill(null));

export function generateSolvedSudoku() : SudokuGrid {
  const gridSize:number = 9;
  const grid:SudokuGrid = Array.from({ length:gridSize }, () => Array.from({ length:gridSize }, () => null));


  function isValid(row:number, col:number, value:number) : boolean {
    for (let i = 0; i < gridSize; i++) {
      if (grid[row][i] === value || grid[i][col] === value) return false;
    }

    const subgridRowStart:number = Math.floor(row / 3) * 3;
    const subgridColStart:number = Math.floor(col / 3) * 3;
    for (let i = subgridRowStart; i < subgridRowStart + 3; i++) {
      for (let j = subgridColStart; j < subgridColStart + 3; j++) {
        if (grid[i][j] === value) return false;
      }
    }
    return true;
  }

  function solve(row:number, col:number) : boolean {
    if (col === gridSize) {
      col = 0;
      row++;
    }

    if (row === gridSize) {
      return true;
    }

    if (grid[row][col] !== null) {
      return solve(row, col + 1);
    }

    for (let value = 1; value <= gridSize; value++) {
      if (isValid(row, col, value)) {
        grid[row][col] = value as SlotType;
        if (solve(row, col + 1)) {
          return true;
        }
        grid[row][col] = null;
      }
    }

    return false;
  }

  solve(0, 0);
  return grid;
}


export class Sudoku {
  board:SudokuGrid;
  poked:number;

  constructor(poked:number) {
    this.poked = poked;
    this.board = this.#makeBoard()
  }

  get rows() : SlotType[][] {
    return this.board;
  }

  get cols() : SlotType[][] {
    return this.board[0].map((_, colIndex) => this.board.map(row => row[colIndex]));
  }

  get subs() : SlotType[][] {
    const size:number = Math.sqrt(this.board.length);
    const subs:SlotType[][] = [];
  
    for (let rowStart = 0; rowStart < this.board.length; rowStart += size) {
      for (let colStart = 0; colStart < this.board[0].length; colStart += size) {
        const subgrid: SlotType[] = [];
        for (let row = rowStart; row < rowStart + size; row++) {
          subgrid.push(...this.board[row].slice(colStart, colStart + size));
        }
        subs.push(subgrid as SlotType[]);
      }
    }
  
    return subs;
  }


  #makeBoard() : SudokuGrid {
    const board = [...EmptyBoard];

    // Logic

    return board;
  }
}