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
      backgroundColor: props.opaque ? colors.primary : undefined,
      overflow: "hidden",
      ...props.style,
    },
    
    pressable: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: adptColor as string + colors.opacity.translucent,
      ...props.pressableStyle,
    },

    textView: {
      flex: 3,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      ...props.textStyle
    },

    text: {
      fontSize: 15,
      color: isPressed ? colors.tertiary : mainColor,
      textAlign: "center",
    },

    icon: {
      flex: 1,
      height: "100%",
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },

  });

  let left  = (props.icon ? "" : "•") + (props.left  ?? "[");
  let right = (props.right ?? "]") + (props.icon ? "" : "•");

  const Icon = props.icon?.pack ?? Ionicons;

  return (
    <View style={self.container}>
      <Pressable
        style={self.pressable}
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
          ? <View style={self.textView}>
              <T style={self.text}>
                  {left}
                  <T plain style={{ color: isPressed ? mainColor : colors.tertiary }}>
                    {` ${props.title} `}
                  </T>
                  {right}
              </T>
            </View>
          : null
        }
      </Pressable>
    </View>
  );
};
