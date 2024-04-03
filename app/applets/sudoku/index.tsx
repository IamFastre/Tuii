import{ useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Section, Button, C, L, T } from "@/components/basics";
import { SettingsContext } from '@/components/Contexts';
import { Header } from '@/components/applets/Header';

import { Grid, Controls } from '@/components/applets/sudoku';
import { CountEmpty, GetDuplicates, useSudoku } from "@/src/sudoku";

export default () : React.JSX.Element => {
  const { sudoku:config } = useContext(SettingsContext).settings;
  const sudoku = useSudoku(config.level);

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
                title="Reveal"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{name:'eye-outline'}}
                onPress={sudoku.reveal}
              />

              <Button
                title="New"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{name:'reload-circle-outline'}}
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
