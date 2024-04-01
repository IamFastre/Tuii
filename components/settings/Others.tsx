import { ColorValue, StyleSheet, View } from "react-native";
import { T, C } from "@/components/basics";
import { useColors } from "@/constants/colors";

export const Title = ({title}:{title:string}) => (
  <>
    <T style={styles.titleText}>
      <C.ACCENT>{'•-{ '}</C.ACCENT>
      {title}
      <C.ACCENT>{' }-•'}</C.ACCENT>
    </T>
    <T style={[styles.titleSep, { color: useColors().accent }]}>
      {title.replaceAll(/./g, '_')}_
    </T>
  </>
);

export const Sep = ({margin, thickness, color, noThickness}:{margin?:number, thickness?:number, color?:ColorValue, noThickness?:boolean }) => (
  <View style={[styles.sep, { borderRadius: 9999, height: noThickness ? 0 : thickness ?? 0.5, marginVertical: margin ?? 15, backgroundColor: color ?? useColors().accent }]}/>
);

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    lineHeight: 25,
    marginTop: 30,
  },

  titleSep: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    top: -10,
    lineHeight: 20,
  },

  sep: {
    width: "60%",
    alignSelf: 'center'
  },
});
