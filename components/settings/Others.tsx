import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import Animated,  { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { T, C } from "@/components/basics";
import { useColors } from "@/constants/colors";


export const Title = ({ title }:{ title:string; }) => {
  const colors = useColors();

  return (
    <>
      <View style={styles.titleTextContainer}>
        <T style={styles.titleText}>
          <C.ACCENT>{colors.brackets.left.curly}</C.ACCENT>
          {title}
          <C.ACCENT>{colors.brackets.right.curly}</C.ACCENT>
        </T>
        <T style={[styles.titleSep, { color: colors.accent }]}>
          {title.replaceAll(/./g, '_')}_
        </T>
      </View>
    </>
  );
};

export const Group = ({ title, children }:{ title:string; children?:React.ReactNode; }) => {
  const colors = useColors();
  const height = useSharedValue(0);
  const progress = useSharedValue(1);
  const rotate = useSharedValue("0deg");
  const color  = useSharedValue(colors.secondary);
  const [isSpread, setIsSpread] = useState<boolean>(true);

  const handleOnPress = () => {
    rotate.value = withSpring(isSpread ? "180deg" : "0deg", { duration: 2500 });
    progress.value = withTiming(isSpread ? 0 : 1, { duration: 1000 });
    color.value  = withTiming(isSpread ? colors.accent : colors.secondary, { duration: 500 });
    setIsSpread(!isSpread);
  };

  const handleOnLayout = (e:LayoutChangeEvent) => {
    height.value = withTiming(e.nativeEvent.layout.height, { duration: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height === undefined ? "auto" : height.value * progress.value
  }));

  const Container = children ? Pressable : View;

  return (
    <>
      <Container style={styles.titleTextContainer} onPress={handleOnPress}>
        <T style={[styles.titleText, { color }]} animated>
          {colors.brackets.left.square[colors.brackets.left.square.length - 2]}
          <C.TERTIARY> {title} </C.TERTIARY>
          {colors.brackets.right.square[1]}
        </T>
        {
          children ? 
            <T style={[styles.spreadIndicator, { color, fontSize: 32, transform: [{ rotate }] }]} animated>{isSpread ? "-" : "+"}</T>
          : null
        }
      </Container>
      {
        children ? 
        <Animated.View style={[animatedStyle, { overflow: 'scroll' }]}>
          <View onLayout={handleOnLayout}>
            {children}
          </View>
        </Animated.View>
        : null
      }
    </>
  );
};

const styles = StyleSheet.create({
  titleTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17.5,
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
    lineHeight: 20,
    top: -10,
  },

  spreadIndicatorContainer: {
    width: 0,
    height: 0,
    overflow: 'visible',
    alignSelf: 'flex-start',
  },

  spreadIndicator: {
    position: "absolute",
    right: 30,
  },
});
