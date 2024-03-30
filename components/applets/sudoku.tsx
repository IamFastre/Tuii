import { B, C, L, T } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { State } from "@/src/general/types";
import { DimensionValue, Pressable, View, StyleSheet } from "react-native";
import { EmptyBoard, Position, SlotType, SudokuGrid } from "@/src/sudoku";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export const GridChild = ({ value, id, locked, faulty, selected, setSelected }: { value: SlotType; id: number; locked?: boolean; faulty?: boolean; selected: number | undefined; setSelected: State<number | undefined>; }) => {
  const colors = useColors();

  return (
    <>
      <Pressable
        style={{ ...styles.slot, borderColor: colors.secondary, backgroundColor: locked ? colors.secondary + colors.opacity.faint : selected === id ? colors.accent : "transparent" }}
        onPress={() => {
          if (!locked)
            setSelected(selected === id ? undefined : id);
        }}
        android_disableSound
      >
        {faulty ?
          <View
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              width: 8,
              aspectRatio: 1,
              borderRadius: 9999,
              backgroundColor: colors.hot,
            }} />
          :
          null}

        <T style={{ ...styles.slotText, color: selected === id ? colors.primary : colors.tertiary }}>
          {selected === id
            ? <B>{value?.toString() ?? ""}</B>
            : value?.toString() ?? ""}
        </T>

      </Pressable>

      {(id + 1) % 3 === 0 && (id + 1) % 9 !== 0 ? <View style={[styles.miniSepH, { backgroundColor: colors.primary }]} /> : null}
      {(id + 1) % 27 === 0 && (id + 1) % 81 !== 0 ? <View style={[styles.miniSepV, { backgroundColor: colors.primary }]} /> : null}
    </>
  );
};

export const Grid = ({ values, selected, setSelected, duplicates, poked }: { values: SudokuGrid | undefined; selected: number | undefined; setSelected: State<number | undefined>; duplicates: Position[]; poked: Position[]; }) => {
  const colors = useColors();
  const isFaulty = (r: number, c: number) => {
    for (let i = 0; i < duplicates.length; i++) {
      const d = duplicates[i];
      if (r === d[0] && c === d[1])
        return true;
    }
    return false;
  };

  const isPoked = (r: number, c: number) => {
    for (let i = 0; i < poked.length; i++) {
      const d = poked[i];
      if (r === d[0] && c === d[1])
        return false;
    }
    return true;
  };

  return (
    <View style={[styles.grid, { borderColor: colors.accent }]}>
      {(values ?? EmptyBoard).map((rows, r) => (
        rows.map((slot, c) => (
          <GridChild
            value={slot}
            id={r * 9 + c}
            locked={slot !== null && isPoked(r, c)}
            faulty={isFaulty(r, c)}
            selected={selected}
            setSelected={setSelected}
            key={r * 9 + c} />
        ))
      )).flat()}
    </View>
  );
};

export const Number = ({ value, selected, board, setBoard }: { value: SlotType; selected: number | undefined; board: SudokuGrid; setBoard: State<SudokuGrid>; }) => {
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
          });
        }
      } }
      android_disableSound
    >
      <View style={{ alignSelf: "center" }}>
        {value
          ? <>
            <B style={styles.buttonText}>
              {isPressed ?
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
                </C.HIGHLIGHT>}
            </B>
            <T style={[styles.buttonCount, { color: colors.accent }]}>{9 - amount}</T>
          </>
          : <Ionicons name={isPressed ? "backspace" : "backspace-outline"} size={styles.buttonText.fontSize * 1.5} color={colors.hot} />}
      </View>
    </Pressable>
  );
};

export const Controls = ({ selected, board, setBoard }: { selected: number | undefined; board: SudokuGrid; setBoard: State<SudokuGrid>; }) => {
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
            setBoard={setBoard} />
        ))}
      </View>
      <View style={styles.controls}>
        {([6, 7, 8, 9, null] as SlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={selected}
            board={board}
            setBoard={setBoard} />
        ))}
      </View>
      <T style={[styles.border, { left: consts.border, color: colors.accent }]}>
        <L>{colors.theme === "scarlatta" ? '(' : '['}</L>
      </T>
    </View>
  );
};

const consts = {
  slotDim: "10.88%" as DimensionValue,
  sepWidth: "1%" as DimensionValue,
  border: 5,
};

export const styles = StyleSheet.create({
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
