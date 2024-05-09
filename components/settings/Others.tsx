import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated,  { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { T, C } from "@/components/basics";
import { useColors } from "@/constants/colors";


export const Title = ({ title }:{ title:string; }) => {
  const colors = useColors();

  return (
    <>
      <T style={[styles.titleText, styles.titleTextContainer]}>
        <C.ACCENT>{colors.brackets.left.curly}</C.ACCENT>
        {title}
        <C.ACCENT>{colors.brackets.right.curly}</C.ACCENT>
      </T>
      <T style={[styles.titleSep, { color: colors.accent }]}>
        {title.replaceAll(/./g, '_')}_
      </T>
    </>
  );
};

export const Subtitle = ({ title, children }:{ title:string; children?:React.ReactNode; }) => {
  const colors = useColors();
  const progress = useSharedValue(1); 
  const rotate = useSharedValue("0deg");
  const color  = useSharedValue(colors.secondary);
  const [isSpread, setIsSpread] = useState<boolean>(true);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const handleOnPress = () => {
    rotate.value = withSpring(isSpread ? "90deg" : "0deg", { duration: 1500 });
    progress.value = withTiming(isSpread ? 0 : 1, { duration: 1000 });
    color.value  = withTiming(isSpread ? colors.accent : colors.secondary, { duration: 500 });
    setIsSpread(!isSpread);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height === undefined ? "auto" : height * progress.value
  }));

  return (
    <>
      <Pressable style={[styles.titleTextContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={handleOnPress}>
        <T style={styles.titleText}>
          <C.ACCENT>{colors.brackets.left.square[colors.brackets.left.square.length - 2]} </C.ACCENT>
          {title}
          <C.ACCENT> {colors.brackets.right.square[1]}</C.ACCENT>
        </T>
        <Animated.View style={styles.spreadIndicatorContainer}>
          <Animated.Text style={[styles.spreadIndicator, { color, transform: [{ rotate }] }]}>
            <Ionicons name={"chevron-down"} size={24} />
          </Animated.Text>
        </Animated.View>
      </Pressable>
      <Animated.View
        style={[animatedStyle, { overflow: 'hidden' }]}
        onLayout={e => height === undefined ? setHeight(e.nativeEvent.layout.height) : null}
      >
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  titleTextContainer: {
    marginTop: 15,
    marginBottom: 5,
  },

  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    lineHeight: 25,
  },

  titleSep: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    top: -16,
    lineHeight: 20,
  },

  spreadIndicatorContainer: {
    width: 0,
    height: 0,
    overflow: 'visible',
    alignSelf: 'flex-start',
  },

  spreadIndicator: {
    position: "absolute",
  },
});
