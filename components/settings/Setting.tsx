import { View, StyleSheet, KeyboardTypeOptions, ColorValue } from "react-native";
import { B, Button, ButtonIcon, C, T, TI } from "@/components/basics";
import { State } from '@/src/general/types';
import { useColors } from "@/constants/colors";

interface TitleProps {
  title: string;
  description: string | React.JSX.Element | undefined;
  experimental: boolean | undefined;
  options?: string[];
}

interface SettingProp {
  title: string;
  description?: string | React.JSX.Element;
  experimental?:boolean;
  disabled?:boolean;
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
  color?: ColorValue;
  pack?: ButtonIcon["pack"];
  showOptions?:boolean;
  index: number;
  options?: string[];
}

interface BoolSettingProps extends SettingProp {
  current: boolean;
}

const Title = (props:TitleProps) => (
  <View style={styles.titleContainer}>
    <View style={styles.titleView}>
      <T>
        <C.ACCENT>
          <B>
            {'• '}
          </B>
        </C.ACCENT>
      </T>
      <T style={styles.title}>
        <B>{props.title}</B>
        <C.SECONDARY>
          :
        </C.SECONDARY>
      </T>
    </View>

    { props.description ? <T style={styles.description}><C.SECONDARY>{props.description}</C.SECONDARY></T> : null }
    { props.options
    ? <T style={styles.description}>
        <C.SECONDARY>
          <C.TERTIARY>Options: </C.TERTIARY>
          {props.options.join(", ")}
        </C.SECONDARY>
      </T>
    : null
    }
    { props.experimental ? <T style={styles.description}><C.HOT>{'{{ EXPERIMENTAL }}'}</C.HOT></T> : null }
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
        disabled={props.disabled}
      />
    </View>
  );
};

export const OptionsSetting = (props:OptionsSettingProps) => {
  return (
    <View style={styles.setting}>
      <Title title={props.title} description={props.description} experimental={props.experimental} options={props.showOptions ? props.options : undefined} />
      <Button
        title={props.options ? props.options[props.index] : undefined}
        color={props.color}
        style={{
          ...(props.size === "small" ?
              styles.smallInput :
              props.size === "medium" ?
              styles.mediumInput
              : props.size === "large" ?
              styles.largeInput :
              styles.input)
        }}
        onPress={() => props.onSubmit()}
        onLongPress={() => props.onSubmit(false)}
        delayLongPress={350}
        icon={props.icon ? { name: props.icon, color: props.color, pack: props.pack } : undefined}
        disabled={props.disabled}
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
        color={props.current ? colors.green : colors.red}
        style={{...(props.size === "small" ? styles.smallInput : props.size === "medium" ? styles.mediumInput : props.size === "large" ? styles.largeInput : styles.input) }}
        onPress={() => props.onSubmit()}
        icon={{ name: props.current ? "checkmark-outline" : "close-outline" }}
        disabled={props.disabled}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginRight: 10,
    marginLeft: 20,
    marginVertical: 15,
  },

  titleContainer: {
    flex: 1.34,
  },
  
  titleView: {
    flexDirection: "row",
  },
  
  title: {
    width: "100%",
    fontSize: 16,
    textAlignVertical: "center",
  },

  description: {
    opacity: 0.7,
    fontSize: 10,
    marginRight: 5,
  },

  largeInput: {
    flex: 3,
    height: "100%",
  },

  input: {
    flex: 2,
    height: "100%",
  },

  mediumInput: {
    flex: 1,
    height: "100%",
  },

  smallInput: {
    flex: 0.5,
    height: "100%",
  },
});
