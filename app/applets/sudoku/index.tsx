import{ useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Section, Button, C, L, T } from "@/components/basics";
import { SettingsContext } from '@/components/Contexts';
import { Header } from '@/components/applets/Header';

import { Grid, Controls } from '@/components/applets/Sudoku';
import { CountEmpty, GetDuplicates, GetPosition, useSudoku } from "@/src/sudoku";

export default () : React.JSX.Element => {
  const [solved, setSolved] = useState<boolean>(false);
  const { sudoku:config } = useContext(SettingsContext).settings;
  const sudoku = useSudoku(config.level);

  useEffect(() => {
    setSolved(sudoku.verify());
  }, [CountEmpty(sudoku.board)])

  return (
    <View style={{ flex:1 }}>
      <Header title='SUDOKU' options={"/applets/sudoku/settings"}/>
      <Section style={{ flex:1 }}>
        { sudoku.ready ?

        <Pressable style={styles.container} onPress={() => sudoku.selected = undefined} android_disableSound>
            <View style={styles.board}>
              <Grid sudoku={sudoku} show_conflicts={config.show_conflicts} />

              {config.show_empty_count ?
              <T style={{ textAlign: 'center', marginTop: 15 }}>
                <L>
                  <C.SECONDARY>
                    Remaining: <C.HIGHLIGHT>{CountEmpty(sudoku.board)}</C.HIGHLIGHT>
                  </C.SECONDARY>
                </L>
              </T>
              : null}
            </View>

            <View style={styles.actions}>
              <Button
                title="Reveal Board"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{ name:'eye' }}
                onPress={sudoku.revealBoard}
              />
              <Button
                title="Reveal Slot"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{ name:'eye-outline' }}
                onPress={() => sudoku.selected !== undefined ? sudoku.revealSlot(GetPosition(sudoku.selected)) : null}
              />
              <Button
                title="New"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{ name:'reload-circle-outline' }}
                onPress={sudoku.regenerate}
              />
            </View>

            <View style={{ flex: 2 }} />

            <Controls
              sudoku={sudoku}
              show_num_remaining={config.show_num_remaining}
            />

            <View style={{ flex: 1 }} />
        </Pressable>

        : null }
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 15,
    paddingHorizontal: 15,
    width: "100%",
  },

  action: {
    margin: "0.75%",
    width: "48%",
    flexGrow: 1,
  },

  actionText: {
    fontSize: 14,
  },
});
