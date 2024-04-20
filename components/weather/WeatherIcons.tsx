import { Themes } from "@/constants/themes/interfaces";
import { WeatherIconID } from "@/src/weather";
import { StyleSheet, View } from "react-native";
import { asciiWeatherIcons } from "./ascii-art";
import { segWeatherIcons } from "./retro-segments";


export const WeatherIcon = ({id, size, theme}:{ id?:WeatherIconID, size:number, theme:Themes }) => {
  id ??= "x";
  const Icon = theme === "e9999" ? segWeatherIcons[id] : asciiWeatherIcons[id];

  return (
    <View style={{ marginVertical: 30 }}>
      <Icon size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 200,
    marginVertical: 25,
  },
});
