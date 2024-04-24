import { useEffect, useState } from 'react';

import { ISudokuSave, SudokuLevel } from '@/src/general/interfaces';
import { deepCopy } from '@/src/general/funcs';

import { GetEmpty, IsSolved, LevelToNumber, MakeBoard, Poke } from './logic';
import { Position, SudokuGrid, SudokuHook } from './types';
import { getStored, setStored } from '../general';

export function useSudoku(restoreGame:boolean, lvl:SudokuLevel) : SudokuHook {
  const [level, setLevel] = useState<SudokuLevel>(lvl);
  const [solved, setSolved] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const [solution, setSolution] = useState<SudokuGrid>([]);
  const [board, setBoard] = useState<SudokuGrid>([]);
  const [poked, setPoked] = useState<Position[]>([]);
  const [revealed, setRevealed] = useState<Position[]>([]);

  const generate = () => {
    const sol = MakeBoard();
    const puz = Poke(deepCopy(sol), LevelToNumber(lvl));
    const pok = GetEmpty(puz);
    setLevel(lvl);
    setSolved(false);
    setSolution(sol);
    setBoard(puz);
    setPoked(pok);
    setSelected(undefined);
    setRevealed([]);

    setStored('sudokuSaved', { board: puz, level: lvl, poked: pok, revealed: [], solution: sol, type: "sudokuSave" })
  };

  const resume = async () => {
    const save = await getStored('sudokuSaved');
    if (save) {
      setLevel(save.level);
      setSolved(IsSolved(save.board, save.solution));
      setSolution(save.solution);
      setBoard(save.board);
      setPoked(save.poked);
      setRevealed(save.revealed);
    } else {
      generate();
    }
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
      setStored('sudokuSaved', { board: current, level, poked, revealed, solution, type: "sudokuSave" })
      return current;
    });
    setSelected(undefined);
  };

  const revealBoard = () => {
    setRevealed(r => r.concat(GetEmpty(board)));
    setBoard(b => {
      const r2:Position[] = [];
      const b2 = b.map((row, r) => {
        return row.map((slot, c) => {
          if (slot === null) {
            r2.push([r, c]);
            return solution[r][c];
          }
          return slot;
        });
      })

      setStored('sudokuSaved', { board: b2, level, poked, revealed: r2, solution, type: "sudokuSave" })
      return b2;
    });
    setSelected(undefined);
  };

  const verify = () : boolean => IsSolved(board, solution);

  useEffect(() => {
    const start = async () => {
      if (restoreGame) {
        await resume();
      } else {
        generate();
      }
      setReady(true);
    };

    start();
  }, []);

  return {
    ready,
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
      if (!solved) {
        setBoard(value);
        setStored('sudokuSaved', { board: value, level, poked, revealed, solution, type: "sudokuSave" })
      }
    },

    get solved() : boolean {
      return solved;
    },

    set solved(value:boolean) {
      setSolved(value);
    },

    get selected() : number | undefined {
      return selected;
    },

    set selected(value:number | undefined) {
      setSelected(value);
    },
  };
}