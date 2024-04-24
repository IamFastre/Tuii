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

  const saveObj:ISudokuSave = {
    board,
    level,
    poked,
    revealed,
    solution,
    type: "sudokuSave"
  };

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

    setStored('sudokuSaved', { ...saveObj, board: puz, level: lvl, poked: pok, revealed: [], solution: sol })
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
      setStored('sudokuSaved', { ...saveObj, board: current, revealed: [...revealed, [r,c]]})
      return current;
    });
    setSelected(undefined);
  };

  const revealBoard = () => {
    const r2 = revealed.concat(GetEmpty(board));
    setRevealed(r2);
    setBoard(b => {
      const b2 = b.map((row, r) => {
        return row.map((slot, c) => {
          if (slot === null) {
            return solution[r][c];
          }
          return slot;
        });
      })

      setStored('sudokuSaved', { ...saveObj, board: b2, revealed: r2 })
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
        setStored('sudokuSaved', { ...saveObj, board: value })
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