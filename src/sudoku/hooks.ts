import { useEffect, useState } from 'react';

import { SudokuLevel } from '@/src/general/interfaces';
import { deepCopy } from '@/src/general/funcs';

import { GetEmpty, LevelToNumber, MakeBoard, Poke } from './logic';
import { Position, SudokuGrid, SudokuHook } from './types';

export function useSudoku(level:SudokuLevel) : SudokuHook {
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

  const revealBoard = () => {
    setRevealed(revealed.concat(GetEmpty(board)));
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
    revealBoard,
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