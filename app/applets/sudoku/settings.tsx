import { MiniHeader } from "@/components/applets/Header";
import { Section } from "@/components/basics";
import { SettingsContext } from "@/components/Contexts";
import { BoolSetting, Sep, Title, OptionsSetting } from "@/components/settings";
import { move } from "@/src/general/funcs";
import { SudokuLevelOptions } from "@/src/general/interfaces";
import { setStored } from "@/src/general/storage";
import { useContext } from "react";


export default function SudokuSettings() {
  const { sudoku } = useContext(SettingsContext).settings;
  const updateSettings = useContext(SettingsContext).updateSettings;

  return (
    <Section style={{ flex: 1 }} centered>
      <MiniHeader title='OPTIONS' subtitle='SUDOKU'/>
      <Title title="Game" />

      <Sep noThickness />

      <OptionsSetting
        title="Difficulty"
        description={"Decide how many empty slots are there to be initially.\neasy: 36, medium: 48, hard: 57, max: 64"}
        index={SudokuLevelOptions.indexOf(sudoku.level)}
        options={SudokuLevelOptions}
        onSubmit={(forward:boolean = true) => {
          setStored('sudoku', {...sudoku, level: move(forward)(SudokuLevelOptions, sudoku.level)});
          updateSettings();
        }}
        icon={sudoku.level === "easy" ? "heart-outline" : sudoku.level === "medium" ? "heart-half" : sudoku.level === "hard" ? "heart" : "heart-dislike"}
        size="small"
      />

      <Sep />
      <Title title="Visuals" />

      <BoolSetting
        title="Show Conflicts"
        description="Display a red circle if there's a conflict in a row, column or subgrid."
        current={sudoku.show_conflicts}
        onSubmit={() => {
          setStored('sudoku', {...sudoku, show_conflicts: !sudoku.show_conflicts });
          updateSettings();
        }}
        size="small"
      />
      <BoolSetting
        title="Show Empty Count"
        description="Display how many empty slots are left."
        current={sudoku.show_empty_count}
        onSubmit={() => {
          setStored('sudoku', {...sudoku, show_empty_count: !sudoku.show_empty_count });
          updateSettings();
        }}
        size="small"
      />
      <BoolSetting
        title="Show Numbers Count"
        description="Display how many numbers are left to use."
        current={sudoku.show_num_remaining}
        onSubmit={() => {
          setStored('sudoku', {...sudoku, show_num_remaining: !sudoku.show_num_remaining });
          updateSettings();
        }}
        size="small"
      />
    </Section>
  )
}