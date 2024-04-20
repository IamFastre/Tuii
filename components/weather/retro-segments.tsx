import { WeatherIconPack } from "@/src/weather";
import { T } from "@/components/basics";
import { useColors } from "@/constants/colors";

type WeatherLetters = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|" ";

export const getSegment = (id?:WeatherLetters) => {
  
  return ({ size }: { size: number }) => {
    const colors = useColors();
    return (
      <>
        <T style={{ color: colors.accent, fontFamily: "DSEGWeather", fontSize: size*16 }}>
          {id ?? " "}
        </T>
        <T style={{ color: colors.secondary, fontFamily: "DSEGWeather", fontSize: size*16, position: "absolute", top: 0, opacity: 0.1 }}>
          {' '}
        </T>
      </>
    );
  };
}

export const segWeatherIcons:WeatherIconPack = {
  "01d": getSegment("A"),
  "02d": getSegment("J"),
  "03d": getSegment("B"),
  "04d": getSegment("B"),
  "09d": getSegment("E"),
  "10d": getSegment("C"),
  "11d": getSegment("G"),
  "13d": getSegment("F"),
  "50d": getSegment("K"),
  
  "01n": getSegment("a"),
  "02n": getSegment("j"),
  "03n": getSegment("b"),
  "04n": getSegment("b"),
  "09n": getSegment("e"),
  "10n": getSegment("c"),
  "11n": getSegment("g"),
  "13n": getSegment("f"),
  "50n": getSegment("k"),

  "x": getSegment(" ")
};
