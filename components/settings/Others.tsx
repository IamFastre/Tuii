import { StyleSheet } from "react-native";
import { T, C } from "@/components/basics";
import { useColors } from "@/constants/colors";

export const Title = ({title}:{title:string}) => {
  const colors = useColors();

  return (
    <>
      <T style={styles.titleText}>
        <C.ACCENT>{colors.brackets.left.curly}</C.ACCENT>
        {title}
        <C.ACCENT>{colors.brackets.right.curly}</C.ACCENT>
      </T>
      <T style={[styles.titleSep, { color: colors.accent }]}>
        {title.replaceAll(/./g, '_')}_
      </T>
    </>
);
}

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    lineHeight: 25,
    marginTop: 15,
    marginBottom: 5,
  },

  titleSep: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    top: -16,
    lineHeight: 20,
  },
});
