import { Pressable, View, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { useColors } from "@/constants/colors";
import { CPUMove, TTTSlotType, XOHook } from "@/src/tictactoe";
import { useEffect, useRef } from "react";

export const Icon = ({id}:{id:TTTSlotType}) => {
  const colors = useColors();
  const scaler = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaler.value },
        id === 2 ? { rotateX: `${scaler.value*360}deg` } : { rotate: `${scaler.value*270}deg` },
      ]
    };
  }, [scaler, id]);

  useEffect(() => {
    if (id !== null) {
      scaler.value = withTiming(1, {
        duration: 750,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      });
    }

    return () => {
      scaler.value = 0;
    };
  }, [id])

  return (
    <Animated.View style={style}>
      {
        id === 1 ?
        <Ionicons name="close-sharp" size={65} color={colors.red} />
        :
        id === 2 ?
        <Ionicons name="ellipse-outline" size={55} color={colors.green} />
        :
        null
      }
    </Animated.View>
  )
};

export const GridChild = ({xo, id}:{ xo:XOHook; id:number; }) => {
  const colors = useColors();

  return (
    <>
      <Pressable
        style={[styles.slot, {
          backgroundColor: xo.solved && xo.winId?.includes(id) ? colors.secondary + colors.opacity.faint : colors.primary,
          borderColor: colors.secondary,
          borderRadius: colors.others.section_radius/2
        }]}
        onPress={() => {
          if (xo.board[id] === null && !xo.solved && xo.turn !== xo.cpu) {
            const copy = [...xo.board];
            copy[id] = xo.turn;
            xo.board = copy;
            xo.next();
          }
        }}
        android_disableSound
      >
        <Icon id={xo.board[id]} />
      </Pressable>
    </>
  );
};

export const Grid = ({xo, vs_cpu}:{ xo:XOHook; vs_cpu:boolean; }) => {
  const colors = useColors();
  const rendered = useRef(false);

  useEffect(() => {
    rendered.current = true;
  }, [])

  useEffect(() => {
    if (vs_cpu && xo.turn === xo.cpu) {
      setTimeout(() => {
        const move = CPUMove(xo.board, xo.cpu);
        if (xo.board[move] === null && !xo.solved) {
          const copy = [...xo.board];
          copy[move] = xo.turn;
          xo.board = copy;
          xo.next();
        }
      }, 500);
    }
  }, [rendered.current, xo.cpu, xo.turn, vs_cpu]);

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