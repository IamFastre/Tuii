import { B, Button, C, L, Section, T } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { State } from "@/src/general/types";
import{ useEffect, useState } from "react";
import { DimensionValue, Pressable, ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CountEmpty, GetDuplicates, EmptyBoard, MakeBoard, SlotType, SudokuGrid, GetEmpty, Position } from "@/src/sudoku";

const GridChild = ({value, id, locked, faulty, selected, setSelected}:{value:SlotType, id:number, locked?:boolean, faulty?:boolean, selected:number | undefined, setSelected:State<number | undefined>}) => {
  const colors = useColors();

  return (
    <>
      <Pressable
        style={{...styles.slot, borderColor: colors.secondary, backgroundColor: locked ? colors.secondary + colors.opacity.faint : selected === id ? colors.accent : "transparent"}}
        onPress={() => {
          if (!locked)
            setSelected(selected === id ? undefined : id)
        }}
        android_disableSound
      >
        {
          faulty ?
          <View
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              width: 8,
              aspectRatio: 1,
              borderRadius: 9999,
              backgroundColor: colors.hot,
            }}
          />
          :
          null
        }

        <T style={{ ...styles.slotText, color: selected === id ? colors.primary : colors.tertiary }}>
          {selected === id
          ? <B>{value?.toString() ?? ""}</B>
          : value?.toString() ?? ""}
        </T>
    
      </Pressable>
    
      {(id+1) % 3  === 0 && (id+1) % 9  !== 0 ? <View style={[styles.miniSepH, { backgroundColor: colors.primary } ]} /> : null}
      {(id+1) % 27 === 0 && (id+1) % 81 !== 0 ? <View style={[styles.miniSepV, { backgroundColor: colors.primary } ]} /> : null}
    </>
  );
};

const Grid = ({values, selected, setSelected, duplicates, poked}:{values:SudokuGrid | undefined, selected:number | undefined, setSelected:State<number | undefined>, duplicates:Position[], poked:Position[]}) => {
  const colors = useColors();
  const isFaulty = (r:number, c:number) => {
    for (let i = 0; i < duplicates.length; i++) {
      const d = duplicates[i];
      if (r === d[0] && c === d[1])
        return true; 
    }
    return false;
  }

  const isPoked = (r:number, c:number) => {
    for (let i = 0; i < poked.length; i++) {
      const d = poked[i];
      if (r === d[0] && c === d[1])
        return false; 
    }
    return true;
  }

  return (
    <View style={[styles.grid, { borderColor: colors.accent }]}>
      {(values ?? EmptyBoard).map((rows, r) => (
        rows.map((slot, c) => (
          <GridChild
            value={slot}
            id={r*9+c}
            locked={slot !== null && isPoked(r, c)}
            faulty={isFaulty(r, c)}
            selected={selected}
            setSelected={setSelected}
            key={r*9+c}
          />
        ))
      )).flat()}
    </View>
  );
}

const Number = ({value, selected, board, setBoard}:{value:SlotType, selected:number | undefined, board:SudokuGrid, setBoard:State<SudokuGrid>}) => {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const amount = board.flat().filter(x => x === value).length;

  return (
    <Pressable
      style={[styles.button, { opacity: value !== null && amount >= 9 ? 0.33 : 1 }]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        if (selected !== undefined) {
          const row = Math.floor(selected / 9);
          const col = selected % 9;
          setBoard(l => {
            if (l) {
              const copy = [...l];
              copy[row][col] = value;
              return copy;
            }
            return l;
          })
        }
      }}
      android_disableSound
    >
      <View style={{ alignSelf: "center" }}>
        {value
        ? <>
            <B style={styles.buttonText}>
              { isPressed ?
                <C.SECONDARY>
                  {"["}
                  <C.HIGHLIGHT>{value}</C.HIGHLIGHT>
                  {"]"}
                </C.SECONDARY>
                :
                <C.HIGHLIGHT>
                  {"{"}
                  <C.SECONDARY>{value}</C.SECONDARY>
                  {"}"}
                </C.HIGHLIGHT> }
            </B>
            <T style={[styles.buttonCount, { color: colors.accent }]}>{9 - amount}</T>
          </>
        : <Ionicons name={isPressed ? "backspace" : "backspace-outline"} size={styles.buttonText.fontSize * 1.5} color={colors.hot}/>}
      </View>
    </Pressable>
  );
}

const Controls = ({selected, board, setBoard}:{selected:number | undefined, board:SudokuGrid, setBoard:State<SudokuGrid>}) => {
  const colors = useColors();

  return (
    <View style={styles.controlsContainer}>
      <T style={[styles.border, { right: consts.border, color: colors.accent }]}>
        <L>{colors.theme === "scarlatta" ? ')' : ']'}</L>
      </T>
      <View style={styles.controls}>
        {([1, 2, 3, 4, 5] as SlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={selected}
            board={board}
            setBoard={setBoard}
          />
          ))
        }
      </View>
      <View style={styles.controls}>
        {([6, 7, 8, 9, null] as SlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={selected}
            board={board}
            setBoard={setBoard}
          />
          ))
        }
      </View>
      <T style={[styles.border, { left: consts.border, color: colors.accent }]}>
        <L>{colors.theme === "scarlatta" ? '(' : '['}</L>
      </T>
    </View>
  );
}

const pokes = 35;
export function Board(props:ViewProps) {
  const colors = useColors();
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
    <>
      <Pressable style={styles.container} onPress={() => setSelected(undefined)} android_disableSound>
          <View {...props} style={styles.board}>
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
    </>
  );
}

const consts = {
  slotDim: "10.88%" as DimensionValue,
  sepWidth: "1%" as DimensionValue,
  border: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  board: {
    marginTop: 20,
    alignItems: "center",
  },

  grid: {
    width: 350,
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: "space-between",
    justifyContent: "space-between",
    borderWidth: 3,
    padding: 3,
  },

  slot: {
    height: consts.slotDim,
    width: consts.slotDim,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  miniSepH: {
    height: consts.slotDim,
    width: consts.sepWidth,
  },

  miniSepV: {
    height: consts.sepWidth,
    width: "100%",
  },

  slotText: {
    fontSize: 23,
    textAlign: "center",
    textAlignVertical: "center",
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


  controlsContainer: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    width: "75%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: "space-between",
    justifyContent: "center",
  },

  button: {
    width: "20%",
    height: 80,
    aspectRatio: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 23,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
  },
  
  buttonCount: {
    position: "absolute",
    fontSize: 12,
    bottom: -7,
    right: -3,
  },

  border: {
    fontSize: 95,
    position: 'absolute',
    zIndex: 1,
  },
});
