import { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
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
  const height = useSharedValue(0);
  const progress = useSharedValue(1);
  const rotate = useSharedValue("0deg");
  const color  = useSharedValue(colors.secondary);
  const [isSpread, setIsSpread] = useState<boolean>(true);

  const handleOnPress = () => {
    rotate.value = withSpring(isSpread ? "90deg" : "0deg", { duration: 1500 });
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
      <Container style={[styles.titleTextContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={handleOnPress}>
        <T style={[styles.titleText, { color }]} animated>
          {colors.brackets.left.square[colors.brackets.left.square.length - 2]}
          <C.TERTIARY> {title} </C.TERTIARY>
          {colors.brackets.right.square[1]}
        </T>
        {
          children ? 
          <Animated.View style={styles.spreadIndicatorContainer}>
            <Animated.Text style={[styles.spreadIndicator, { color, transform: [{ rotate }] }]}>
              <Ionicons name={"chevron-down"} size={24} />
            </Animated.Text>
          </Animated.View>
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
