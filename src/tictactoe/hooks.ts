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
  const [cpu, setCpu] = useState<TTTSlotType>(null);
  const [winner, setWinner] = useState<TTTSlotType>(null);
  const [winId, setWinId] = useState<[number, number, number] | null>(null);

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

    set board(value:TTTSlotType[]) {
      solved ? null : setBoard(value);
    },

    get solved() : boolean {
      return solved;
    },

    set solved(value:boolean) {
      setSolved(value);
    },

    get cpu() : TTTSlotType {
      return cpu;
    },

    set cpu(value:TTTSlotType) {
      setCpu(value);
    },

    get turn() : 1 | 2 {
      return turn;
    },

    set turn(value:1|2) {
      setTurn(value);
    },

    get winner() : TTTSlotType {
      return winner;
    },

    set winner(value:TTTSlotType) {
      setWinner(value);
    },

    get winId() : [number, number, number] | null {
      return winId;
    },

    set winId(value:[number, number, number] | null) {
      setWinId(value);
    },
  };
}