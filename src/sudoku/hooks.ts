import { useEffect, useState } from 'react';

import { SudokuLevel } from '@/src/general/interfaces';
import { deepCopy } from '@/src/general/funcs';

import { CountEmpty, GetEmpty, LevelToNumber, MakeBoard, Poke } from './logic';
import { Position, SudokuGrid, SudokuHook } from './types';

export function useSudoku(lvl:SudokuLevel) : SudokuHook {
  const [level, setLevel] = useState<SudokuLevel>(lvl);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [isReady, setReady] = useState<boolean>(false);
  const [solution, setSolution] = useState<SudokuGrid>([]);
  const [board, setBoard] = useState<SudokuGrid>([]);
  const [poked, setPoked] = useState<Position[]>([]);
  const [revealed, setRevealed] = useState<Position[]>([]);

  const generate = () => {
    const sol = MakeBoard();
    const puz = Poke(deepCopy(sol), LevelToNumber(level));
    setSolution(sol);
    setBoard(puz);
    setPoked(GetEmpty(puz));
    setSelected(undefined);
    setRevealed([]);
  };

  const revealSlot = ([r, c]:Position) => {
    let hasPos = false;
    for (let s of revealed) {
      if (s[0] === r && s[1] === c) {
        hasPos = true
        break;
      }
    }
    hasPos ? null : setRevealed(current => [...current, [r,c]]);

    setBoard(current => {
      current[r][c] = solution[r][c];
      return current;
    });
    setSelected(undefined);
  };

  const revealBoard = () => {
    setRevealed(r => r.concat(GetEmpty(board)));
    setBoard(b =>
      b.map((row, r) => {
        return row.map((slot, c) => {
          if (slot === null) {
            return solution[r][c];
          }
          return slot;
        });
      })
    );
    setSelected(undefined);
  };

  const verify = () : boolean => {
    if (CountEmpty(board))
      return false;

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c <  board[r].length; c++) {
        if (board[r][c] !== solution[r][c])
          return false;
      }
    }

    return true;
  };

  useEffect(() => {
    generate();
    setReady(true);
  }, []);

  return {
    ready: isReady,
    solution,
    level,
    poked,
    revealed,
    revealSlot,
    revealBoard,
    verify,
    regenerate: generate,

    get board() : SudokuGrid {
      return board;
    },

    set board(value:SudokuGrid) {
      setBoard(value);
    },

    get selected() : number | undefined {
      return selected;
    },

    set selected(value:number | undefined) {
      setSelected(value);
    },
  };
}