import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, TextStyle, LayoutChangeEvent, LayoutRectangle, ColorValue } from "react-native";

import { useColors } from "@/constants/colors";
import { T } from "./T";

export interface SectionProps {
  title?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle ;
  children?: React.ReactNode;
  isCard?: boolean;
  centered?: boolean;
  bg?: ColorValue;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function Section(props:SectionProps) : React.JSX.Element {
  const colors = useColors();
  const [titleDim, setTitleDim] = useState<LayoutRectangle | undefined>(undefined);

  const self = StyleSheet.create({
    screen: {
      backgroundColor: colors.main,
      borderRadius: props.isCard ? colors.others.section_radius : 0,
      ...props.style
    },

    container: {
      flex: 1,
      margin: props.isCard ? 0 : 10,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.main_2,
      borderRadius: colors.others.section_radius,
      ...props.containerStyle
    },

    header: {
      position: "absolute",
      alignSelf: props.centered ? "center" : "flex-start",
      marginLeft: 30,
      justifyContent: "center",
      alignContent: "center",
      ...props.titleStyle,
    },
  });

  return (
    <View style={self.screen} onLayout={props.onLayout}>
      <View style={self.container}>
        {props.children}
      </View>
      { props.title
      ? <View
          style={[self.header, { top: self.container.margin as number -(titleDim?.height??0) / 2 }]}
          onLayout={e => setTitleDim(e.nativeEvent.layout)}
        >
          <View
            style={{
              position: "absolute",
              width: "110%",
              left: "-5%",
              height: self.container.borderWidth * 2.5,
              backgroundColor: props.bg ?? self.screen.backgroundColor,
            }}
          />
          <T
            style={{ fontFamily: colors.others.fonts.L, fontSize: 21, color: self.header.color ?? self.container.borderColor }}
            numberOfLines={1}
          >
            {props.title}
          </T>
        </View>
      : null }
    </View>
  );
}
