import { B, Button, C, L, T } from "@/components/basics";
import { useColors } from "@/constants/colors";
import { State } from "@/src/general/types";
import React, { useState } from "react";
import { DimensionValue, Pressable, StyleSheet, View, ViewProps, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { EmptyBoard, SlotType, Sudoku, SudokuGrid, generateSolvedSudoku } from "@/src/sudoku";

const GridChild = ({value, id, locked, selected, setSelected}:{value:SlotType, id:number, locked?:boolean, selected:number | undefined, setSelected:State<number | undefined>}) => {
  const colors = useColors();

  return (
    <>
      <Pressable
        style={{...styles.slot, borderColor: colors.secondary, backgroundColor: selected == id ? colors.accent : "transparent"}}
        onPress={() => {
          if (!locked)
            setSelected(selected == id ? undefined : id)
        }}
        android_disableSound
      >

        <T style={{...styles.slotText, color: locked ? colors.highlight : (selected == id ? colors.primary : colors.tertiary)}}>
          {selected == id
          ? <B>{value?.toString() ?? ""}</B>
          : value?.toString() ?? ""}
        </T>
    
      </Pressable>
    
      {(id+1) % 3  === 0 && (id+1) % 9  !== 0 ? <View style={[styles.miniSepH, { backgroundColor: colors.primary } ]} /> : null}
      {(id+1) % 27 === 0 && (id+1) % 81 !== 0 ? <View style={[styles.miniSepV, { backgroundColor: colors.primary } ]} /> : null}
    </>
  );
};

const Grid = ({values, selected, setSelected}:{values:SudokuGrid | undefined, selected:number | undefined, setSelected:State<number | undefined>}) => {
  const colors = useColors();

  return (
    <View style={[styles.grid, { borderColor: colors.accent }]}>
      {(values ?? EmptyBoard).flat().map((v, i) => (
        <GridChild
          value={v}
          id={i}
          locked={false}
          selected={selected}
          setSelected={setSelected}

          key={i}
        />
      ))}
    </View>
  );
}

const Number = ({value, selected, setList}:{value:SlotType, selected:number | undefined, setList:State<SudokuGrid | undefined>}) => {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  return (
    <Pressable
      style={styles.button}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        if (selected !== undefined) {
          const row = Math.floor(selected / 9);
          const col = selected % 9;

          setList(l => {
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
      <T style={styles.buttonText}>
        {value
        ? <B>
            { isPressed ?
              <C.SECONDARY>
                {"["}
                <C.HIGHLIGHT>{value}</C.HIGHLIGHT>
                {"]"}
              </C.SECONDARY> :
              <C.HIGHLIGHT>
                {"{"}
                <C.SECONDARY>{value}</C.SECONDARY>
                {"}"}
              </C.HIGHLIGHT> 
            }
          </B>
        : <Ionicons name={isPressed ? "backspace" : "backspace-outline"} size={styles.buttonText.fontSize * 1.5} color={colors.hot}/>}
      </T>
    </Pressable>
  );
}

const Controls = ({selected, setList}:{selected:number | undefined, setList:State<SudokuGrid | undefined>}) => {
  const colors = useColors();

  return (
    <View style={styles.controlsContainer}>
      <T style={[styles.border, { right: consts.border, color: colors.accent }]}>
        <L>{']'}</L>
      </T>
      <View style={styles.controls}>
        {([1, 2, 3, 4, 5] as SlotType[]).map((val, i) => (
          <Number
            key={i}
            value={val}
            selected={selected}
            setList={setList}
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
          setList={setList}
          />
          ))
        }
      </View>
      <T style={[styles.border, { left: consts.border, color: colors.accent }]}>
        <L>{'['}</L>
      </T>
    </View>
  );
}
export function Board(props:ViewProps) : React.JSX.Element {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [list, setList] = useState<SudokuGrid | undefined>(undefined);

  return (
    <Pressable style={styles.container} onPress={() => setSelected(undefined)} android_disableSound>
        <View {...props} style={styles.board}>
          <Grid values={list} selected={selected} setSelected={setSelected} />
        </View>

        <View style={styles.actions}>
          <Button
            title="Check"
            style={styles.action}
            textStyle={styles.actionText}
            icon={{name:'checkmark-circle-outline'}}
            />

          <Button
            title="New"
            style={styles.action}
            textStyle={styles.actionText}
            icon={{name:'reload-circle-outline'}}
            onPress={() => {
              setList(generateSolvedSudoku())
            }}
            />
          <Button
            title="Print"
            style={styles.action}
            textStyle={styles.actionText}
            icon={{name:'refresh-circle-outline'}}
            onPress={() => {
              let sud = new Sudoku(1)
              sud.board = generateSolvedSudoku();
              console.log(sud.subs)
            }}
            />
        </View>

        <View style={{ flex: 5 }}/>

        <Controls
          selected={selected}
          setList={setList}
          />

        <View style={{ flex: 1 }}/>
    </Pressable>
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
    marginTop: 20,
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
    width: "70%",
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

  border: {
    fontSize: 95,
    position: 'absolute',
    zIndex: 1,
  },
});
