import { WeatherIconID, WeatherIconPack } from "@/src/weather";
import { Image } from "expo-image"
import { StyleSheet } from "react-native";

export const getImage = (id?:WeatherIconID) => () => (
  <Image
    transition={500}
    style={styles.img}
    source={`https://openweathermap.org/img/wn/${id}@4x.png`}
  />
);

export const imgWeatherIcons:WeatherIconPack = {
  "01d": getImage("01d"),
  "02d": getImage("02d"),
  "03d": getImage("03d"),
  "04d": getImage("04d"),
  "09d": getImage("09d"),
  "10d": getImage("10d"),
  "11d": getImage("11d"),
  "13d": getImage("13d"),
  "50d": getImage("50d"),
  
  "01n": getImage("01n"),
  "02n": getImage("02n"),
  "03n": getImage("03n"),
  "04n": getImage("04n"),
  "09n": getImage("09n"),
  "10n": getImage("10n"),
  "11n": getImage("11n"),
  "13n": getImage("13n"),
  "50n": getImage("50n"),

  "x": getImage()
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    aspectRatio: 1,
  }
});
