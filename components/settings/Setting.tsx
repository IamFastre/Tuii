import { View, StyleSheet, KeyboardTypeOptions, Pressable, ViewStyle } from "react-native";
import { B, Button, C, L, T, TI } from "@/components/basics";
import { State } from '@/src/general/types';
import { useColors } from "@/constants/colors";

interface SettingProp {
  title: string;
  description?: string;
  experimental?:boolean;
  onSubmit: Function;
  size?: "small" | "medium" | "large";
}

interface TextInputSettingProps extends SettingProp {
  state: string;
  setState: State<string>;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

interface OptionsSettingProps extends SettingProp {
  icon?: string;
  index: number;
  options: string[];
}

interface BoolSettingProps extends SettingProp {
  current: boolean;
}

const Title = ({title, description, experimental}:{title:string, description:string | undefined, experimental:boolean | undefined}) => (
  <View style={styles.titleContainer}>
    <T>
      <C.ACCENT>
        <B>
          •
        </B>
      </C.ACCENT>
    </T>
    <View style={styles.titleView}>
      <T style={styles.title}>
        <B>{title}</B>
        <C.SECONDARY>
          :
        </C.SECONDARY>
      </T>
      {description ? <C.SECONDARY style={styles.description}>{description}</C.SECONDARY> : null}
      {experimental ? <C.HOT style={styles.description}>{'{{ EXPERIMENTAL }}'}</C.HOT> : null}
    </View>
  </View>
);

export const TextInputSetting = (props:TextInputSettingProps) => {
  return (
    <View style={styles.setting}>
      <Title title={props.title} description={props.description} experimental={props.experimental} />
      <TI
        value={props.state.toString()}
        style={props.size === "small" ? styles.smallInput : props.size === "medium" ? styles.mediumInput : props.size === "large" ? styles.largeInput : styles.input}
        onChangeText={props.setState}
        placeholder={props.placeholder}
        onSubmitEditing={() => {
          props.onSubmit();
          props.setState("");
        }}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export const OptionsSetting = (props:OptionsSettingProps) => {
  return (
    <View style={styles.setting}>
      <Title title={props.title} description={props.description} experimental={props.experimental} />
      <Button
        title={props.options[props.index]}
        style={props.size === "small" ? styles.smallInput : props.size === "medium" ? styles.mediumInput : props.size === "large" ? styles.largeInput : styles.input}
        onPress={() => props.onSubmit()}
        onLongPress={() => props.onSubmit(false)}
        delayLongPress={350}
        icon={props.icon ? { name: props.icon, size: 12 } : undefined}
      />
    </View>
  );
};

export const BoolSetting = (props:BoolSettingProps) => {
  const colors = useColors();

  return (
    <View style={styles.setting}>
      <Title title={props.title} description={props.description} experimental={props.experimental} />
      <Button
        title={props.current ? "true" : "false"}
        style={{...(props.size === "small" ? styles.smallInput : props.size === "medium" ? styles.mediumInput : props.size === "large" ? styles.largeInput : styles.input), borderColor: props.current ? colors.accent : colors.hot}}
        onPress={() => props.onSubmit()}
        icon={{ name: props.current ? "checkmark-circle-outline" : "close-circle-outline", size: 12 }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    // backgroundColor: "red",
  },

  titleContainer: {
    flex: 1.34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  titleView: {
    flex: 1,
    marginLeft: 10
  },
  
  title: {
    width: "100%",
    fontSize: 16,
    textAlignVertical: "center",
    // backgroundColor: 'blue'
  },

  description: {
    fontSize: 10,
    marginRight: 5,
  },

  largeInput: {
    flex: 3,
    height: "100%",
    // backgroundColor: "purple"
  },

  input: {
    flex: 2,
    height: "100%",
    // backgroundColor: "purple"
  },

  mediumInput: {
    flex: 1,
    height: "100%",
    // backgroundColor: "purple"
  },

  smallInput: {
    flex: 0.5,
    height: "100%",
    // backgroundColor: "purple"
  },
});
