import{ useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Section, Button, C, L, T } from "@/components/basics";
import { SettingsContext } from '@/components/Contexts';
import { Header } from '@/components/applets/Header';

import { Grid, Controls } from '@/components/applets/sudoku';
import { CountEmpty, GetDuplicates, MakeBoard, SudokuGrid, GetEmpty, Position, LevelToNumber } from "@/src/sudoku";

export default function Applets() : React.JSX.Element | null {
  const { sudoku } = useContext(SettingsContext).settings;
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const [ready, setReady] = useState<boolean>(false);

  const [board, setBoard] = useState<SudokuGrid>([]);
  const [poked, setPoked] = useState<Position[]>([]);

  const generate = () => {
    setSelected(undefined);

    const gen = MakeBoard(LevelToNumber(sudoku.level));
    setBoard(gen);
    setPoked(GetEmpty(gen));
  }

  useEffect(() => {
    generate()
    setReady(true);
  }, []);

  if (!ready)
    return null;

  return (
    <View style={{ flex:1 }}>
      <Header title='SUDOKU' options={"/applets/sudoku/settings"}/>
      <Section style={{ flex:1 }}>
        <Pressable style={styles.container} onPress={() => setSelected(undefined)} android_disableSound>
            <View style={styles.board}>
              <Grid values={board} show_conflicts={sudoku.show_conflicts} selected={selected} setSelected={setSelected} duplicates={GetDuplicates(board)} poked={poked} />

              {sudoku.show_empty_count ?
              <T style={{ textAlign: 'center', marginTop: 15 }}>
                <L>
                  <C.SECONDARY>
                    Remaining: <C.HIGHLIGHT>{CountEmpty(board)}</C.HIGHLIGHT>
                  </C.SECONDARY>
                </L>
              </T>
              : null}
            </View>

            <View style={styles.actions}>
              <Button
                title="Check"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{name:'checkmark-circle-outline'}}
                onPress={() => {
                  console.log("checking...")
                  console.log(GetDuplicates(board))
                }}
              />

              <Button
                title="New"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{name:'reload-circle-outline'}}
                onPress={() => {
                  generate()
                }}
              />
            </View>

            <View style={{ flex: 2 }} />

            <Controls
              show_num_remaining={sudoku.show_num_remaining}
              selected={selected}
              board={board}
              setBoard={setBoard}
            />

            <View style={{ flex: 1 }} />
        </Pressable>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  board: {
    marginTop: 20,
    alignItems: "center",
  },

  actions: {
    flexDirection: 'row',
    marginTop: 15,
    width: "100%",
  },

  action: {
    marginHorizontal: 10,
    flex: 1,
  },

  actionText: {
    fontSize: 16,
  },
});
