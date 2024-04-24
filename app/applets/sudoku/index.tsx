import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Section, Button, C, L, T, B } from "@/components/basics";
import { SettingsContext } from '@/components/Contexts';
import { Header } from '@/components/applets/Header';

import { Grid, Controls } from '@/components/applets/Sudoku';
import { CountEmpty, GetPosition, LevelToNumber, useSudoku } from "@/src/sudoku";
import { useColors } from "@/constants/colors";
import { Ionicons } from '@expo/vector-icons';

export default () : React.JSX.Element => {
  const colors = useColors();
  const [showWin, setShowWin] = useState<boolean>(true);

  const { sudoku:config } = useContext(SettingsContext).settings;
  const sudoku = useSudoku(true, config.level);

  const dismissWin = () => setShowWin(false);

  useEffect(() => {
    if (sudoku.ready && sudoku.verify()) {
      sudoku.solved = true;
      setShowWin(true);
    }
  }, [CountEmpty(sudoku.board)])

  return (
    <View style={{ flex:1 }}>
      <Header title='SUDOKU' options={"/applets/sudoku/settings"}/>
      <Section style={{ flex:1 }}>
        { sudoku.ready ?

        <Pressable style={styles.container} onPress={() => {sudoku.selected = undefined; setShowWin(true)}} android_disableSound>
            <View style={styles.board}>
              <Grid sudoku={sudoku} show_conflicts={config.show_conflicts} />

              {config.show_empty_count ?
              <T style={styles.remaining}>
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
                icon={{ name:'pencil' }}
                onPress={() => sudoku.selected !== undefined ? sudoku.revealSlot(GetPosition(sudoku.selected)) : null}
              />
              <Button
                title="New"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{ name:'refresh-circle' }}
                onPress={() => {
                  sudoku.regenerate();
                }}
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
      {
        sudoku.solved && showWin ? 
        <Pressable style={[styles.winContainer, { backgroundColor: colors.primary + colors.opacity.most }]} onPress={dismissWin} android_disableSound>
          <Pressable android_disableSound>
            <Section containerStyle={styles.winMessageContainer} centered>
              <View style={[styles.winIcon, { backgroundColor: colors.accent }]}>
                <Ionicons name={sudoku.revealed.length === LevelToNumber(sudoku.level) ? "star-outline" : "star"} size={40} color={colors.tertiary}/>
              </View>
              <T style={styles.winTitle}>
                <B>
                  <C.ACCENT>
                    {'[ '}
                      <C.TERTIARY>
                        {sudoku.revealed.length === LevelToNumber(sudoku.level) ? "Congrats?" : "Congrats!"}
                      </C.TERTIARY>
                    {' ]'}
                  </C.ACCENT>
                </B>
              </T>

              <T style={styles.winBody}>
                <C.SECONDARY>
                  You have {sudoku.revealed.length === LevelToNumber(sudoku.level) ? "revealed" : "completed"} {sudoku.level === "easy" ? "an" : "a"} <C.TERTIARY><B>{sudoku.level}</B></C.TERTIARY> sudoku puzzle.
                </C.SECONDARY>
              </T>
              <View style={styles.winStats}>
                <T>
                    Slots Solved:   <C.ACCENT>{sudoku.poked.length - sudoku.revealed.length - CountEmpty(sudoku.board)}</C.ACCENT>
                </T>
                <T>
                    Slots Revealed: <C.ACCENT>{sudoku.revealed.length}</C.ACCENT>
                </T>
              </View>
              { sudoku.revealed.length === LevelToNumber(sudoku.level) ?
                <T style={styles.winShame}>
                  <C.SECONDARY>
                    Have you even tried?!
                    { sudoku.level === "easy" ? "\nLike, dude, it was on easy." : "" }
                  </C.SECONDARY>
                </T> 
              : null }
            </Section>
          </Pressable>
        </Pressable>
        : null
      }
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
    marginTop: 22.5,
    alignItems: "center",
  },

  remaining: {
    textAlign: 'center',
    marginTop: 10
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 5,
    paddingHorizontal: 15,
    width: "100%",
  },

  action: {
    margin: 5,
    flexBasis: "40%",
    flexGrow: 1,
  },

  actionText: {
    fontSize: 14,
  },

  winContainer: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  winIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    aspectRatio: 1,
    padding: 12.5,
    marginTop: 5,
    marginBottom: 20,
  },

  winMessageContainer: {
    flex: undefined,
    alignItems: 'center',
    padding: 15,
  },

  winTitle: {
    fontSize: 22,
    marginBottom: 10,
  },

  winBody: {
    marginVertical: 10,
  },

  winStats: {
    alignSelf: 'flex-start',
    marginLeft: 15
  },

  winShame: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 15,
    fontSize: 10,
  },
});
