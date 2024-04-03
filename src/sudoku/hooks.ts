import { useEffect, useState } from 'react';
import { GetEmpty, LevelToNumber, MakeBoard } from './logic';
import { Position, SudokuGrid, SudokuHook } from './types';
import { SudokuLevel } from '../general/interfaces';

export function useSudoku(level:SudokuLevel, onStart?:() => void, onFinish?:() => void) : SudokuHook {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [isReady, setReady] = useState<boolean>(false);
  const [board, setBoard] = useState<SudokuGrid>([]);
  const [poked, setPoked] = useState<Position[]>([]);

  const generate = () => {
    const gen = MakeBoard(LevelToNumber(level));
    setBoard(gen);
    setPoked(GetEmpty(gen));
    setSelected(undefined);
  }

  useEffect(() => {
    onStart ? onStart() : null;
    generate();
    setReady(true);
    onFinish ? onFinish() : null;
  }, []);

  return {
    ready: isReady,
    level,
    poked,
    regenerate:generate,

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