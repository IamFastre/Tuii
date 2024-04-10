import { useColors } from "@/constants/colors";
import { ColorValue, View } from "react-native";

export const Sep = ({margin, thickness, color, noThickness}:{margin?:number, thickness?:number, color?:ColorValue, noThickness?:boolean }) => (
  <View
    style={{
      width: "60%",
      alignSelf: 'center',
      borderRadius: 9999,
      height: noThickness ? 0 : (thickness ?? 0.5),
      marginVertical: margin ?? 15,
      backgroundColor: color ?? useColors().accent,
    }}
  />
);
