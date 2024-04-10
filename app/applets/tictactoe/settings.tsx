import { MiniHeader } from "@/components/applets/Header";
import { Section, Sep } from "@/components/basics";
import { SettingsContext } from "@/components/Contexts";
import { Title, OptionsSetting } from "@/components/settings";
import { move } from "@/src/general/funcs";
import { TTTLevelOptions } from "@/src/general/interfaces";
import { setStored } from "@/src/general/storage";
import { useContext } from "react";
import { ScrollView } from "react-native";


export default function TicTacToeSettings() {
  const { tictactoe } = useContext(SettingsContext).settings;
  const updateSettings = useContext(SettingsContext).updateSettings;

  return (
    <Section style={{ flex: 1 }}>
      <MiniHeader title='OPTIONS' subtitle='TIC-TAC-TOE'/>
      <ScrollView style={{ flex: 1 }}>
        <Title title="Game" />

        <Sep noThickness />

        <OptionsSetting
          title="Difficulty"
          description={"Decide aggressive or smart the CPU is."}
          index={TTTLevelOptions.indexOf(tictactoe.level)}
          options={TTTLevelOptions}
          onSubmit={(forward:boolean = true) => {
            setStored('tictactoe', {...tictactoe, level: move(forward)(TTTLevelOptions, tictactoe.level)});
            updateSettings();
          }}
          icon={tictactoe.level === "easy" ? "heart-outline" : tictactoe.level === "medium" ? "heart-half" : "heart"}
          size="medium"
        />

      </ScrollView>
    </Section>
  )
}