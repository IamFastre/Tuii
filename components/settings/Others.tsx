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
});
