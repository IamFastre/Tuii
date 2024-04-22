import { B, C, L, T } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { DimensionValue, Pressable, View, StyleSheet, ColorValue } from "react-native";
import { EmptyBoard, GetDuplicates, SudSlotType, SudokuGrid, SudokuHook } from "@/src/sudoku";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const config = {
  duration: 500,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

const lockedConfig = {
  duration: 750,
  easing: Easing.inOut(Easing.quad),
}

export const GridChild = ({ value, id, revealed, locked, faulty, selected, setSelected }:{ value:SudSlotType; id:number; revealed?:boolean; locked?:boolean; faulty?:boolean; selected:boolean | undefined; setSelected:(v:number | undefined) => void; }) => {
  const colors = useColors();
  const lockedColor = colors.secondary + colors.opacity.mid;
  const backgroundColor = useSharedValue<ColorValue>(lockedColor);
  const dotOpacity = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);

  useEffect(() => {
    if (locked)
      backgroundColor.value = withTiming(lockedColor, lockedConfig);
    else if (selected)
      backgroundColor.value = withTiming(colors.accent, config);
    else 
      backgroundColor.value = backgroundColor.value === lockedColor
                            ? withDelay(250, withTiming("transparent", lockedConfig))
                            : withTiming("transparent", config);

    dotOpacity.value = withTiming(faulty ? 1 : 0, config);
    opacity.value = withTiming(value ? 1 : 0);

  }, [locked, revealed, selected, id, faulty, value]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
    width: 8 * dotOpacity.value,
  }));

  const bg = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }));

  return (
    <>
      <AnimatedPressable
        style={[styles.slot, { borderColor: colors.secondary, borderRadius: colors.others.section_radius/2 }, bg]}
        onPress={() => {
          if (!locked && !revealed)
            setSelected(selected ? undefined : id);
        }}
        android_disableSound
      >
        <Animated.View style={{ opacity }}>
          <T style={[styles.slotText, { color: revealed ? colors.cold : selected ? colors.primary : colors.tertiary }]}>
            {selected
              ? <B>{value?.toString() ?? ""}</B>
              : value?.toString() ?? ""}
          </T>
        </Animated.View>

        <Animated.View
          style={[{ position: "absolute", aspectRatio: 1, top: 4, left: 4, borderRadius: 9999, backgroundColor: colors.hot }, dotStyle]}
        />
      </AnimatedPressable>

      {(id + 1) % 3  === 0 && (id + 1) % 9  !== 0 ? <View style={[styles.miniSepH, { backgroundColor: colors.primary }]} /> : null}
      {(id + 1) % 27 === 0 && (id + 1) % 81 !== 0 ? <View style={[styles.miniSepV, { backgroundColor: colors.primary }]} /> : null}
    </>
  );
};

export const Grid = ({ sudoku, show_conflicts }:{ sudoku:SudokuHook; show_conflicts:boolean; }) => {
  const colors = useColors();
  const duplicates = GetDuplicates(sudoku.board);

  const isFaulty = (r: number, c: number) => {
    for (let i = 0; i < duplicates.length; i++) {
      const d = duplicates[i];
      if (r === d[0] && c === d[1])
        return true;
    }
    return false;
  };

  const isPoked = (r: number, c: number) => {
    for (let i = 0; i < sudoku.poked.length; i++) {
      const d = sudoku.poked[i];
      if (r === d[0] && c === d[1])
        return false;
    }
    return true;
  };

  const isRevealed = (r: number, c: number) => {
    for (let i = 0; i < sudoku.revealed.length; i++) {
      const d = sudoku.revealed[i];
      if (r === d[0] && c === d[1])
        return true;
    }
    return false;
  };

  return (
    <View style={[styles.grid, { borderColor: colors.accent, borderRadius: colors.others.section_radius/2 }]}>
      {(sudoku.board ?? EmptyBoard).map((rows, r) => (
        rows.map((slot, c) => (
          <GridChild
            value={slot}
            id={r * 9 + c}
            revealed={slot !== null && isRevealed(r, c)}
            locked={slot !== null && isPoked(r, c)}
            faulty={show_conflicts && isFaulty(r, c)}
            selected={r * 9 + c === sudoku.selected}
            setSelected={(v:number | undefined) => sudoku.selected = v}
            key={r * 9 + c} />
        ))
      )).flat()}
    </View>
  );
};


export const Number = ({ show_num_remaining, value, selected, solved, board, setBoard }:{ show_num_remaining:boolean; value:SudSlotType; selected:number | undefined; solved:boolean; board:SudokuGrid; setBoard:(v:SudokuGrid) => void; }) => {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const amount = board.flat().filter(x => x === value).length;

  return (
    <Pressable
      style={[styles.button, { opacity: value !== null && amount >= 9 ? 0.33 : 1 }]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        if (selected !== undefined && !solved) {
          const row = Math.floor(selected / 9);
          const col = selected % 9;
          if (board) {
            const copy = [...board];
            copy[row][col] = value;
            setBoard(copy);
          }
        }
      } }
      android_disableSound
    >
      <View style={{ alignSelf: "center" }}>
        {value
          ? <>
            <T style={styles.buttonText}>
              <B>
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
            </T>
            {show_num_remaining ? <T style={[styles.buttonCount, { color: colors.accent }]}>{9 - amount}</T> : null}
          </>
          : <Ionicons name={isPressed ? "backspace" : "backspace-outline"} size={styles.buttonText.fontSize * 1.5} color={colors.hot} />}
      </View>
    </Pressable>
  );
};


export const Controls = ({ sudoku, show_num_remaining }:{ sudoku:SudokuHook; show_num_remaining:boolean; }) => {
  const colors = useColors();

  return (
    <View style={styles.controlsContainer}>
      <T style={[styles.border, { right: consts.border, color: colors.accent }]}>
        <L>{colors.theme === "scarlatta" ? ')' : ']'}</L>
      </T>
      <View style={styles.controls}>
        {([1, 2, 3, 4, 5] as SudSlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={sudoku.selected}
            solved={sudoku.solved}
            board={sudoku.board}
            show_num_remaining={show_num_remaining}
            setBoard={(v:SudokuGrid) => sudoku.board = v}
          />
        ))}
      </View>
      <View style={styles.controls}>
        {([6, 7, 8, 9, null] as SudSlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={sudoku.selected}
            solved={sudoku.solved}
            board={sudoku.board}
            show_num_remaining={show_num_remaining}
            setBoard={(v:SudokuGrid) => sudoku.board = v}
          />
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

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 350,
    aspectRatio: 1,
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
