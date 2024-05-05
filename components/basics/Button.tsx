import{ useState } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, GestureResponderEvent, Pressable, ColorValue } from 'react-native';
import { useColors } from '@/constants/colors';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { T } from './T';
import general from '@/constants/general';

export type ButtonIcon = {
  name: string;
  color?: ColorValue;
  size?: number;
  style?: TextStyle;
  pack?: typeof Ionicons | typeof Feather | typeof MaterialCommunityIcons;
};

export interface ButtonProps {
  title?: string;
  color?: ColorValue;
  style?: ViewStyle;
  pressableStyle?: ViewStyle;
  textStyle?: TextStyle;
  left?: string;
  right?: string;
  icon?: ButtonIcon;
  disabled?: boolean;
  opaque?: boolean;
  radiusFactor?: number;
  onPress?: (event:GestureResponderEvent) => void;
  onLongPress?: (event:GestureResponderEvent) => void;
  delayLongPress?: number;
}


export function Button(props: ButtonProps): React.JSX.Element {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  
  const mainColor = props.disabled ? colors.secondary : props.style?.borderColor ? props.style.borderColor : props.color ?? colors.accent;
  const adptColor = isPressed ? colors.secondary : mainColor;

  const self = StyleSheet.create({
    container: {
      height: 40,
      borderWidth: 1,
      borderRadius: colors.others.section_radius * (props.radiusFactor ?? 1),
      borderColor: adptColor,
      overflow: "hidden",
      ...props.style,
    },
    
    button: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: adptColor as string + colors.opacity.translucent,
      ...props.pressableStyle,
    },
    
    text: {
      flex: props.icon ? 1 : undefined,
      fontSize: 15,
      color: isPressed ? colors.tertiary : mainColor,
      textAlign: "center",
      alignSelf: "center",
      ...props.textStyle
    },

    icon: {
      flex: props.title ? undefined : 1,
      height: "100%",
      aspectRatio: props.title ? 1 : undefined,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },

    opaque: {
      display: props.opaque ? "flex" : "none",
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: colors.primary,
    }
  });

  let left  = (props.icon ? "" : "•") + (props.left  ?? "[");
  let right = (props.right ?? "]") + (props.icon ? "" : "•");

  const Icon = props.icon?.pack ?? Ionicons;

  return (
    <View style={self.container}>
      <View style={self.opaque} />
      <Pressable
        style={self.button}
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
                <Icon
                  name={props.icon.name as any}
                  size={(props.icon.size ?? self.text.fontSize - 2 ?? general.text.fontSize) * 1.75}
                  color={isPressed ? colors.secondary : (props.icon.color ?? self.container.borderColor)}
                />
            </View>
          : null
        }
        {
          props.title 
          ? <T style={self.text}>
                {left}
                <T plain style={{ color: isPressed ? mainColor : colors.tertiary }}>
                  {` ${props.title} `}
                </T>
                {right}
            </T>
          : null
        }
      </Pressable>
    </View>
  );
};
