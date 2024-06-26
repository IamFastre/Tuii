import { ScrollView, View, StyleSheet, ViewStyle, TextStyle, LayoutChangeEvent, ColorValue } from "react-native";

import { useColors } from "@/constants/colors";
import { T } from "./T";
import { useState } from "react";

export interface SectionProps {
  title?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle ;
  children?: React.ReactNode;
  isCard?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  stickyIndices?: number[];
  bg?: ColorValue;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function Section(props:SectionProps) : React.JSX.Element {
  const colors = useColors();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const Container = props.scrollable ? ScrollView : View;

  const self = StyleSheet.create({
    screen: {
      backgroundColor: colors.primary,
      borderRadius: props.isCard ? colors.others.section_radius : 0,
      ...props.style
    },

    container: {
      flex: 1,
      margin: props.isCard ? 0 : 10,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: isHovered ? colors.accent : colors.secondary,
      borderRadius: colors.others.section_radius,
      ...props.containerStyle
    },

    headerView: {
      position: "absolute",
      top: 0,
      alignSelf: props.centered ? "center" : "flex-start",
      marginTop: props.isCard ? -13 : -2.5,
      marginLeft: props.isCard ? 0 : 30,
      justifyContent: "center",
      alignContent: "center",
      zIndex: 2,
      fontFamily: colors.others.fonts.L,
      fontSize: 20,
      ...props.titleStyle,
    },

    header: {
      justifyContent: "center",
      alignContent: "center",
      fontFamily: colors.others.fonts.L,
      fontSize: 20,
      ...props.titleStyle,
    },
  });

  return (
    <View style={self.screen} onLayout={props.onLayout} onPointerEnter={e => setIsHovered(true)} onPointerLeave={e => setIsHovered(false)}>
      { props.title
      ? <View
          style={{
            ...self.headerView,
            height: self.header.fontSize * 4 / 3,
          }}  
        >
          <View
            style={{
              position: "absolute",
              height: self.container.borderWidth * 2,
              width: "105%",
              left: "-2.5%",
              top: ((self.container.margin as number) - (self.headerView.marginTop as number)) - self.container.borderWidth / 2,
              backgroundColor: props.bg ?? self.screen.backgroundColor,
              zIndex: 1,
            }}
          />
          <T
            style={[self.header, { zIndex: 2, lineHeight: self.header.fontSize * 4 / 3, color: self.header.color ?? self.container.borderColor }]}
            numberOfLines={1}
          >
            {props.title}
          </T>
        </View>
      : null }
      <Container style={self.container} stickyHeaderIndices={props.stickyIndices}>
        {props.children}
      </Container>
    </View>
  );
}
