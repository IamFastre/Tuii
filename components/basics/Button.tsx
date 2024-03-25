import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, GestureResponderEvent, Pressable } from 'react-native';
import { useColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { T } from './T';
import general from '@/constants/general';

export type ButtonIcon = {
  name: string;
  color?: string;
  size?: number;
  style?: TextStyle;
};

export interface ButtonProps {
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  left?: string;
  right?: string;
  icon?: ButtonIcon;
  disabled?: boolean;
  onPress?: (event:GestureResponderEvent) => void;
  onLongPress?: (event:GestureResponderEvent) => void;
  delayLongPress?: number;
}


export function Button(props: ButtonProps): React.JSX.Element {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const self = StyleSheet.create({
    view: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      backgroundColor: colors.main,
      borderColor: props.disabled ? colors.main_2 : colors.accent,
      borderRadius: 9999,
      padding: 5,
      paddingHorizontal: props.style?.width ? undefined : 20,
      ...props.style
    },
    
    text: {
      textDecorationLine: props.disabled ? "line-through" : "none",
      textAlign: "center",
      textAlignVertical: "center",
      ...props.textStyle
    },

    icon: {
      alignItems: "center",
      justifyContent: "center",
      aspectRatio: 1,
    },
  });

  let left  = props.left  ?? ">";
  let right = props.right ?? "<";

  return (
    <Pressable
      style={[self.view, isPressed ? { borderColor: colors.main_2 } : { }]}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      delayLongPress={props.delayLongPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={props.disabled}
    >
      {
        props.icon
        ? <View style={self.icon}>
              <Ionicons
                name={props.icon.name as any}
                size={(props.icon.size ?? self.text.fontSize ?? general.text.fontSize) * 1.75}
                color={isPressed ? colors.main_2 : (props.icon.color ?? self.view.borderColor)}
              />
          </View>
        : <></>
      }
      <T style={[self.text, isPressed ? { color: self.view.borderColor } : { }]}>
        {
          props.icon
          ? props.title ? (`: ${props.title}`) : ""
          : `${left} ${props.title} ${right}`
        }
      </T>
    </Pressable>
  );
};
