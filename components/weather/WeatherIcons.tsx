import { WeatherIconID } from "@/src/weather";
import { StyleSheet, View } from "react-native";
import { asciiWeatherIcons } from "./ascii-art";
import { segWeatherIcons } from "./retro-segments";
import { WeatherIP } from "@/src/general/interfaces";

export const iconPacks = {
 ascii: asciiWeatherIcons,
 segments: segWeatherIcons,
};

export const WeatherIcon = ({id, size, theme, pack}:{ id?:WeatherIconID, size:number, theme:keyof typeof iconPacks, pack:WeatherIP }) => {
  id ??= "x";
  const Icon = (pack === "theme-default"
             ? iconPacks[theme]
             : iconPacks[pack])[id];

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
