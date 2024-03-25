import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, TextInput, TextInputSubmitEditingEventData, View, ViewStyle } from "react-native";
import { T } from "./T";
import { useColors } from "@/constants/colors";
import { useState } from "react";


export interface TIProps {
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  style?: ViewStyle;
}

export const TI = (props:TIProps) => {
  const colors = useColors();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <View style={[styles.textInputView, props.style, { borderColor: isDeleting ? colors.other_hot : isPressed ? colors.accent : colors.main_2 }]}>
      <T style={{ color: colors.accent, fontFamily: colors.others.fonts.L }}>{'>'}</T>
      <TextInput
        style={[styles.textInput, { color: colors.accent, fontFamily: colors.others.fonts.L }]}
        value={props.value}
        placeholder={`{${props.placeholder ?? "..."}}`}
        placeholderTextColor={colors.main_2}
        onChangeText={props.onChangeText}
        onSubmitEditing={(e) => {
          let color = props.value ? setIsPressed : setIsDeleting;
          color(true)
          setTimeout(() => color(false), 400)
          props.onSubmitEditing && props.value ? props.onSubmitEditing(e) : null
        }}
        cursorColor={colors.accent}
        selectionColor={colors.accent}
        keyboardAppearance="dark"
        keyboardType={props.keyboardType}
        clearButtonMode="while-editing"
        returnKeyType='done'
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Backspace") {
            setIsDeleting(true)
            setTimeout(() => setIsDeleting(false), 100)
          }
          if (e.nativeEvent.key === "Enter") {
            setIsPressed(true)
            setTimeout(() => setIsPressed(false), 400)
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputView: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  textInput: {
    flex: 1,
    paddingHorizontal: 5,
    // width: "100%",
    height: "100%",
  },
});
