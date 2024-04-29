import { useContext } from "react";

import { SudokuLevelOptions, move, setStored } from "@/src/general";

import { SettingsContext } from "@/components/Contexts";
import { Sep } from "@/components/basics";
import { Modal } from "@/components/screens";
import { BoolSetting, Title, OptionsSetting } from "@/components/settings";


export default function SudokuSettings() {
  const { sudoku } = useContext(SettingsContext).settings;
  const updateSettings = useContext(SettingsContext).updateSettings;

  return (
    <Modal subtitle="SUDOKU">
      <Title title="Game" />

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
        size="medium"
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
        size="medium"
      />
      <BoolSetting
        title="Show Empty Count"
        description="Display how many empty slots are left."
        current={sudoku.show_empty_count}
        onSubmit={() => {
          setStored('sudoku', {...sudoku, show_empty_count: !sudoku.show_empty_count });
          updateSettings();
        }}
        size="medium"
      />
      <BoolSetting
        title="Show Numbers Count"
        description="Display how many numbers are left to use."
        current={sudoku.show_num_remaining}
        onSubmit={() => {
          setStored('sudoku', {...sudoku, show_num_remaining: !sudoku.show_num_remaining });
          updateSettings();
        }}
        size="medium"
      />
    </Modal>
  )
}