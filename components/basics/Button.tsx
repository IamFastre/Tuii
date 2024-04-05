import{ useState } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, GestureResponderEvent, Pressable } from 'react-native';
import { useColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { T } from './T';
import general from '@/constants/general';
import { isHexColor } from '@/src/general/funcs';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const self = StyleSheet.create({
    view: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      backgroundColor: colors.primary,
      borderColor: props.disabled ? colors.secondary : colors.accent,
      borderRadius: 9999,
      ...props.style
    },
  
    text: {
      textAlign: "center",
      textAlignVertical: "center",
      ...props.textStyle
    },

    icon: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      aspectRatio: 1,
    },
  });

  let left  = props.left  ?? ">";
  let right = props.right ?? "<";

  return (
    <Pressable
      style={[
        self.view,
        isPressed ? { borderColor: colors.secondary } :
        isHovered ? { backgroundColor: isHexColor(self.view.borderColor)
                                     ? self.view.borderColor as string + "33"
                                     : colors.secondary }
        : { }
      ]}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      delayLongPress={props.delayLongPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      disabled={props.disabled}
    >
      {
        props.icon
        ? <View style={self.icon}>
              <Ionicons
                name={props.icon.name as any}
                size={(props.icon.size ?? self.text.fontSize ?? general.text.fontSize) * 1.75}
                color={isPressed ? colors.secondary : (props.icon.color ?? self.view.borderColor)}
              />
              {
                props.title
                ? <T
                    style={{
                      fontSize: (props.icon.size ?? self.text.fontSize ?? general.text.fontSize) * 1.5,
                      textAlign: "center",
                      textAlignVertical: "center",
                    }}
                  >
                    :
                  </T>
                : null
              }
          </View>
        : null
      }
      {
        props.title 
        ? <T style={[self.text, isPressed ? { color: self.view.borderColor } : { }]}>
            {
              props.icon
              ? `${props.title}`
              : `${left} ${props.title} ${right}`
            }
          </T>
        : null
      }
    </Pressable>
  );
};
