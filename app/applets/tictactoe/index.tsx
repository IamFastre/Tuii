import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { SettingsContext } from "@/components/Contexts";
import { Header } from "@/components/applets/Header";
import { B, Button, C, L, Section, T } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { CountEmpty, GetWinningPos, NumberToLetter, useXO } from "@/src/tictactoe";
import { Grid } from "@/components/applets/TicTacToe";

export default () : React.JSX.Element => {
  const colors = useColors();
  const [showWin, setShowWin] = useState<boolean>(true);
  const [xPoints, setXPoints] = useState<number>(0);
  const [oPoints, setOPoints] = useState<number>(0);

  const { tictactoe:config } = useContext(SettingsContext).settings;
  const xo = useXO(config.level);

  const dismissWin = () => setShowWin(false);

  useEffect(() => {
    xo.cpu = config.vs_cpu ? config.cpu_as : null;
  }, [config.vs_cpu, config.cpu_as, xo.turn]);

  useEffect(() => {
    const res = xo.verify();
    if (res) {
      xo.solved = true;
      xo.winId  = GetWinningPos(xo.board);
      xo.winner = typeof res === 'number' ? res : null;
      setShowWin(true);

      if (res === 1) setXPoints(x => x+1);
      if (res === 2) setOPoints(x => x+1);
    }
  }, [CountEmpty(xo.board)]);

  return (
    <View style={{ flex:1 }}>
      <Header title='TIC-TAC-TOE' options={"/applets/tictactoe/settings"} size="small" />
      <Section style={{ flex:1 }}>
        <Pressable style={styles.container} onPress={() => setShowWin(true)} android_disableSound>
        <View style={styles.scoreBoard}>
            <T style={{ fontFamily: colors.others.fonts.S, textAlign: 'center', fontSize: 32 }}>
              <C.ACCENT>
                { colors.theme === "scarlatta"
                ? <C.SECONDARY>{'❁  '}</C.SECONDARY>
                : <>•<C.SECONDARY>{'-< '}</C.SECONDARY></>
                }
                  Score
                { colors.theme === "scarlatta"
                ? <C.SECONDARY>{'  ❁'}</C.SECONDARY>
                : <><C.SECONDARY>{' >-'}</C.SECONDARY>•</>
                }
              </C.ACCENT>
            </T>
            <T style={[styles.scoreNums, { fontFamily: colors.others.fonts.S }]}>
              <C.RED>{xPoints}</C.RED>
              {' - '}
              <C.GREEN>{oPoints}</C.GREEN>
            </T>
          </View>
          <View style={styles.board}>
            <Grid xo={xo} vs_cpu={config.vs_cpu} />
              <T style={styles.turn}>
                <C.SECONDARY>
                  {'•-[ '}
                  <L>
                    <B>{xo.turn === 1 ? <C.RED>X</C.RED> : <C.GREEN>O</C.GREEN>}</B>
                    's turn
                  </L>
                  {' ]-•'}
                </C.SECONDARY>
              </T>
          </View>
          <View style={styles.actions}>
              <Button
                title="Replay"
                style={styles.action}
                textStyle={styles.actionText}
                icon={{ name:'refresh-circle' }}
                onPress={() => xo.restart()}
              />
          </View>
        </Pressable>

        {
        xo.solved && showWin ? 
        <Pressable style={[styles.winContainer, { backgroundColor: colors.primary + colors.opacity.most }]} onPress={dismissWin} android_disableSound>
          <Pressable android_disableSound>
            <Section containerStyle={styles.winMessageContainer} centered>
              <View style={[styles.winIcon, { backgroundColor: colors.accent }]}>
                { xo.winner === 1 ? <Ionicons name={"close-sharp"} size={50} color={colors.tertiary}/>
                : xo.winner === 2 ? <Ionicons name={"ellipse-outline"} size={40} color={colors.tertiary}/>
                : colors.theme === "scarlatta" ? <MaterialCommunityIcons name="bow-tie" size={50} color={colors.tertiary}/> : <MaterialCommunityIcons name="tie" size={45} color={colors.tertiary}/>}
              </View>
              <T style={styles.winTitle}>
                <B>
                  <C.ACCENT>
                    {'[ '}
                      <C.TERTIARY>
                        {xo.winner
                        ? <><T style={{ color: xo.winner === 1 ? colors.red : colors.green }} plain>{NumberToLetter(xo.winner)}</T> Won!</>
                        : `It's a tie!`}
                      </C.TERTIARY>
                    {' ]'}
                  </C.ACCENT>
                </B>
              </T>
              <T style={styles.winBody}>
                <C.SECONDARY>
                  {xo.winner ? <>Player <B>{NumberToLetter(xo.winner)}</B> has won this match!</> : `No one won this match, it's a tie!`}
                </C.SECONDARY>
              </T>
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

  turn: {
    marginTop: 10,
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
    margin: 5,
    flexBasis: "40%",
    flexGrow: 1,
  },

  actionText: {
    fontSize: 14,
  },

  scoreBoard: {
    marginTop: 20,
  },

  scoreNums: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 30,
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

});
