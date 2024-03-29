import { DigitType, SlotType, SudokuGrid } from "./types";

export const EmptyBoard:SudokuGrid = Array(9).fill(Array(9).fill(null));

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
    function pattern(r:number, c:number) {
      return (3 * (r % 3) + Math.floor(r / 3) + c) % 9;
    }

    function shuffle(list:DigitType[]) {
      return [...list].sort(() => 0.5 - Math.random());
    }

    const rBase = [...Array(3).keys()] as DigitType[];

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

    return table;
  }
}
