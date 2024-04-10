import { useEffect, useState } from "react";

import { TTTLevel } from "@/src/general/interfaces";

import { TTTSlotType, XOHook } from "./types";
import { Verify } from "./logic";

const NewTTT:TTTSlotType[] = [
  null, null, null,
  null, null, null,
  null, null, null];

export function useXO(lvl:TTTLevel, starter:1|2 = 1) : XOHook {
  const [level, setLevel] = useState<TTTLevel>(lvl);
  const [solved, setSolved] = useState<boolean>(false);
  const [board, setBoard] = useState<TTTSlotType[]>([]);
  const [turn, setTurn] = useState<1|2>(1);
  const [winner, setWinner] = useState<TTTSlotType>(null);

  const restart = () => {
    setLevel(lvl);
    setSolved(false);
    setBoard(NewTTT);
    setTurn(winner ?? starter);
    setWinner(null);
  };

  const verify = () => {
    return Verify(board);
  };

  const next = () => {
    setTurn(t => t === 1 ? 2 : 1);
  };

  useEffect(() => {
    restart();
  }, []);

  return {
    level,
    next,
    verify,
    restart,

    get board() : TTTSlotType[] {
      return board;
    },

    set board(value) {
      solved ? null : setBoard(value);
    },

    get solved() : boolean {
      return solved;
    },

    set solved(value) {
      setSolved(value);
    },

    get turn() : 1 | 2 {
      return turn;
    },

    set turn(value) {
      setTurn(value);
    },

    get winner() : TTTSlotType {
      return winner;
    },

    set winner(value) {
      setWinner(value);
    },
  };
}