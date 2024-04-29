import { useContext } from "react";

import { useColors } from "@/constants/colors";
import { TTTLevelOptions, TTTPlayers, move, setStored } from "@/src/general";

import { SettingsContext } from "@/components/Contexts";
import { C, I, Sep } from "@/components/basics";
import { Modal } from "@/components/screens";
import { Title, OptionsSetting, BoolSetting } from "@/components/settings";


export default function TicTacToeSettings() {
  const colors = useColors();
  const { tictactoe } = useContext(SettingsContext).settings;
  const updateSettings = useContext(SettingsContext).updateSettings;

  return (
    <Modal subtitle='TIC-TAC-TOE'>
      <Title title="Game" />
      <Sep noThickness />

      <OptionsSetting
        title="Difficulty"
        description={"Decide how aggressive or smart the CPU is."}
        index={TTTLevelOptions.indexOf(tictactoe.level)}
        options={TTTLevelOptions}
        onSubmit={(forward:boolean = true) => {
          setStored('tictactoe', {...tictactoe, level: move(forward)(TTTLevelOptions, tictactoe.level)});
          updateSettings();
        }}
        icon={tictactoe.level === "easy" ? "heart-outline" : tictactoe.level === "medium" ? "heart-half" : "heart"}
        size="medium"
      />

      <BoolSetting
        title="Play vs CPU"
        description={<>Play solo against the CPU <I>(lonely people mode)</I>.</>}
        current={tictactoe.vs_cpu}
        onSubmit={() => {
          setStored('tictactoe', {...tictactoe, vs_cpu: !tictactoe.vs_cpu });
          updateSettings();
        }}
        size="medium"
      />

      <OptionsSetting
        title="CPU Plays as"
        description={<>Decides whether the CPU play as <C.RED>X</C.RED> or <C.GREEN>O</C.GREEN></>}
        index={TTTPlayers.indexOf(tictactoe.cpu_as)}
        onSubmit={(forward:boolean = true) => {
          setStored('tictactoe', {...tictactoe, cpu_as: move(forward)(TTTPlayers, tictactoe.cpu_as)});
          updateSettings();
        }}
        icon={tictactoe.cpu_as === 1 ? "close-sharp" : "ellipse-outline"}
        color={tictactoe.cpu_as === 1 ? colors.red : colors.green}
        size="small"
        disabled={!tictactoe.vs_cpu}
      />
    </Modal>
  )
}