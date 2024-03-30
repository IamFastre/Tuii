import { Section } from '@/components/basics';
import{ useEffect, useState } from "react";
import { Button, C, L, T } from "@/components/basics";
import { Pressable, StyleSheet, View } from "react-native";
import { CountEmpty, GetDuplicates, MakeBoard, SudokuGrid, GetEmpty, Position } from "@/src/sudoku";
import { Header } from '@/components/applets/Header';
import { Grid } from '@/components/applets/sudoku';
import { Controls } from '@/components/applets/sudoku';

const pokes = 35;
export default function Applets() : React.JSX.Element | null {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const [ready, setReady] = useState<boolean>(false);

  const [board, setBoard] = useState<SudokuGrid>([]);
  const [poked, setPoked] = useState<Position[]>([]);

  const generate = () => {
    setSelected(undefined);

    const gen = MakeBoard(pokes);
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
      <Header title='SUDOKU' />
      <Section style={{ flex:1 }}>
        <Pressable style={styles.container} onPress={() => setSelected(undefined)} android_disableSound>
            <View style={styles.board}>
              <Grid values={board} selected={selected} setSelected={setSelected} duplicates={GetDuplicates(board)} poked={poked} />
              <T style={{ textAlign: 'center', marginTop: 15 }}>
                <L>
                  <C.SECONDARY>
                    Remaining: <C.HIGHLIGHT>{CountEmpty(board)}</C.HIGHLIGHT>
                  </C.SECONDARY>
                </L>
              </T>
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
              selected={selected}
              board={board}
              setBoard={setBoard}
            />
            <View style={{ flex: 1 }} />
        </Pressable>
        {/* <View
          style={[StyleSheet.absoluteFill, {
            zIndex: 2,
            backgroundColor: colors.primary + colors.opacity.most,
          }]}
        >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }} centerContent>
            <Section containerStyle={{ padding: 10 }}>
              <T style={{ fontSize: 18, marginBottom: 10 }}>
                <C.ACCENT>
                  [
                  <C.TERTIARY>i</C.TERTIARY>
                  ]
                </C.ACCENT>
                {' '}
                Title
              </T>

              <T>
                <C.SECONDARY>
                  This is the message's body message!
                </C.SECONDARY>
              </T>
            </Section>
          </ScrollView>
        </View> */}
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
