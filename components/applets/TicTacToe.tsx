import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { useColors } from "@/constants/colors";
import { XOHook } from "@/src/tictactoe";

export const GridChild = ({xo, id}:{ xo:XOHook; id:number; }) => {
  const colors = useColors();

  return (
    <>
      <Pressable
        style={[styles.slot, { backgroundColor: colors.primary, borderColor: colors.secondary, borderRadius: colors.others.section_radius/2 }]}
        onPress={() => {
          if (xo.board[id] === null && !xo.solved) {
            const copy = [...xo.board];
            copy[id] = xo.turn;
            xo.board = copy;
            xo.next();
          }
        }}
        android_disableSound
      >
        {
          xo.board[id] === 1 ?
          <Ionicons name="close-sharp"     size={65} color={colors.red} />
          : xo.board[id] === 2 ?
          <Ionicons name="ellipse-outline" size={60} color={colors.green} />
          :
          null
        }
      </Pressable>
    </>
  );
};

export const Grid = ({xo}:{xo:XOHook}) => {
  const colors = useColors();

  return (
    <View style={[styles.grid, { borderColor: colors.accent, borderRadius: colors.others.section_radius/2 }]}>
      {
        xo.board.map((_, i) => (
          <GridChild
            xo={xo}
            id={i}
            key={i}
          />
          )
        )
      }
    </View>
  );
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
    width: "32.65%",
    height: "32.65%",
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

});