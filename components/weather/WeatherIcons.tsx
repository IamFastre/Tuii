import { StyleSheet, View } from "react-native";

import { WeatherIP } from "@/src/general/interfaces";
import { WeatherIconID } from "@/src/weather";

import { asciiWeatherIcons } from "./ascii-art";
import { segWeatherIcons } from "./retro-segments";
import { imgWeatherIcons } from "./images";

export const iconPacks = {
 "ascii-art": asciiWeatherIcons,
 segments: segWeatherIcons,
 openweathermap: imgWeatherIcons,
};

export const WeatherIcon = ({id, size, theme, pack}:{ id?:WeatherIconID, size:number, theme:keyof typeof iconPacks, pack:WeatherIP }) => {
  id ??= "x";
  const Icon = (pack === "theme-default"
             ? iconPacks[theme]
             : iconPacks[pack])[id];

  return (
    <View style={styles.icon}>
      <Icon size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    minHeight: 200,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
