import { B, C, T } from "@/components/basics";
import { Themes } from "@/constants/themes/interfaces";
import { WeatherIconID } from "@/src/weather";
import { StyleSheet, View } from "react-native";

export const ArtWeatherIcons = {
  None: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[ styles.text, { fontSize: size * 2.5 }]}>
        <B>
          <C.RED>
            {'•-{ '}
            <C.TERTIARY>
              ???
            </C.TERTIARY>
            {' }-•'}
          </C.RED>
        </B>
      </T>
    </View>
  ),

  ClearD: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[ styles.text, { fontSize: size*0.9 }]}>
        <B>
          <C.YELLOW>
            {"        *       |       *\n"}
            {"                |\n"}
            {"    \\     *     |     *     /\n"}
            {"      \\    _-- ¯¯¯ --_    /\n"}
            {" *       (             )       *\n"}
            {"    *   (               )   *\n"}
            {"       (                 )\n"}
            {"      (                   )\n"}
            {"- - - (                   ) - - -\n"}
            {"      (                   )\n"}
            {"       (                 ) \n"}
            {"    *   (               )   *\n"}
            {" *       (             )       *\n"}
            {"      /    ¯-- ___ --¯    \\\n"}
            {"    /     *     |     *     \\\n"}
            {"                |\n"}
            {"        *       |       *"}
          </C.YELLOW>
        </B>
      </T>
    </View>
  ),

  ClearN: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[ styles.text, { fontSize: size*0.9 }]}>
        <B>
          {"         _--- ¯¯¯ ---_\n"}
          {"       ( ###*  ***  *  )\n"}
          {"     (  ######**   *##   )\n"}
          {"   ( ##***###*      ###    )\n"}
          {"  ( ###*#***##    ####      )\n"}
          {"  ( *###**#**###*           )\n"}
          {" (  ###*****##*              )\n"}
          {" (    ####***###       ##    )\n"}
          {" (  #*****#####    *    ##   )\n"}
          {"  (  ######                 )\n"}
          {"  (    *#####               )\n"}
          {"   (            #     *    )\n"}
          {"     (        *  #       )\n"}
          {"       (               )\n"}
          {"         ¯--- ___ ---¯"}
        </B>
      </T>
    </View>
  ),

  FewCloudsD: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"                  "}<C.YELLOW>########</C.YELLOW>{"\n"}
          {"           __   "}<C.YELLOW>############</C.YELLOW>{"\n"}
          {"         (    )"}<C.YELLOW>###############</C.YELLOW>{"\n"}
          {"       (        )"}<C.YELLOW>##############</C.YELLOW>{"\n"}
          {"      (          )"}<C.YELLOW>##############</C.YELLOW>{"\n"}
          {"    _(            ¯ ¯)"}<C.YELLOW>##########</C.YELLOW>{"\n"}
          {"  (                    )"}<C.YELLOW>########</C.YELLOW>{"\n"}
          {" (                      ¯ )"}<C.YELLOW>####</C.YELLOW>{"\n"}
          {"(                          )"}<C.YELLOW>##</C.YELLOW>{"\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -"}
        </B>
      </T>
    </View>
  ),

  FewCloudsN: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"                   # # # #\n"}
          {"           __   #  ##  #  *#\n"}
          {"         (    )  ######      #\n"}
          {"       (        )########  ##  #\n"}
          {"      (          )#####        #\n"}
          {"    _(            ¯ ¯)##    *  #\n"}
          {"  (                    )  *    #\n"}
          {" (                      ¯ )*  #\n"}
          {"(                          )#\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -"}
        </B>
      </T>
    </View>
  ),

  ScatteredClouds: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"           __\n"}
          {"         (    )\n"}
          {"       (        )\n"}
          {"      (          )\n"}
          {"    _(            ¯ ¯)\n"}
          {"  (                    )\n"}
          {" (                      ¯ )\n"}
          {"(                          )\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -"}
        </B>
      </T>
    </View>
  ),

  BrokenClouds: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"           __   #######\n"}
          {"         (    )##########\n"}
          {"       (        )############\n"}
          {"      (          )############\n"}
          {"    _(            ¯ ¯)###########\n"}
          {"  (                    )##########\n"}
          {" (                      ¯ )#######\n"}
          {"(                          )#####\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -"}
        </B>
      </T>
    </View>
  ),

  ShowerRain: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"           __   #######\n"}
          {"         (    )##########\n"}
          {"       (        )############\n"}
          {"      (          )############\n"}
          {"    _(            ¯ ¯)###########\n"}
          {"  (                    )##########\n"}
          {" (                      ¯ )#######\n"}
          {"(                          )#####\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -\n"}
          {"    "}<C.BLUE>/   /   /   /   /   /</C.BLUE>{"\n"}
          {"     "}<C.BLUE>/   /   /   /   /</C.BLUE>{"\n"}
          {"   "}<C.BLUE>/   /   /   /   /   /</C.BLUE>
        </B>
      </T>
    </View>
  ),

  RainD: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"                  "}<C.YELLOW>########</C.YELLOW>{"\n"}
          {"           __   "}<C.YELLOW>############</C.YELLOW>{"\n"}
          {"         (    )"}<C.YELLOW>###############</C.YELLOW>{"\n"}
          {"       (        )"}<C.YELLOW>##############</C.YELLOW>{"\n"}
          {"      (          )"}<C.YELLOW>##############</C.YELLOW>{"\n"}
          {"    _(            ¯ ¯)"}<C.YELLOW>##########</C.YELLOW>{"\n"}
          {"  (                    )"}<C.YELLOW>########</C.YELLOW>{"\n"}
          {" (                      ¯ )"}<C.YELLOW>####</C.YELLOW>{"\n"}
          {"(                          )"}<C.YELLOW>##</C.YELLOW>{"\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -\n"}
          {"    "}<C.BLUE>/   /   /   /   /   /</C.BLUE>{"\n"}
          {"     "}<C.BLUE>/   /   /   /   /</C.BLUE>{"\n"}
          {"   "}<C.BLUE>/   /   /   /   /   /</C.BLUE>
        </B>
      </T>
    </View>
  ),

  RainN: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"                   # # # #\n"}
          {"           __   #  ##  #  *#\n"}
          {"         (    )  ######      #\n"}
          {"       (        )########  ##  #\n"}
          {"      (          )#####        #\n"}
          {"    _(            ¯ ¯)##    *  #\n"}
          {"  (                    )  *    #\n"}
          {" (                      ¯ )*  #\n"}
          {"(                          )#\n"}
          {"(                           )\n"}
          {" (                         )\n"}
          {"  - - - - - - - - - - - - -\n"}
          {"    "}<C.BLUE>/   /   /   /   /   /</C.BLUE>{"\n"}
          {"     "}<C.BLUE>/   /   /   /   /</C.BLUE>{"\n"}
          {"   "}<C.BLUE>/   /   /   /   /   /</C.BLUE>
        </B>
      </T>
    </View>
  ),

  Thunderstorm: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          {"           __   #######\n"}
          {"         (    )##########\n"}
          {"       (        )############\n"}
          {"      (          )############\n"}
          {"    _(            ¯ ¯)###########\n"}
          {"  (                    )##########\n"}
          {" (                      ¯ )#######\n"}
          {"(                          )#####\n"}
          {"(        "}<C.YELLOW>####</C.YELLOW>{"               )\n"}
          {" (      "}<C.YELLOW>####</C.YELLOW>{"               )\n"}
          {"  - - - "}<C.YELLOW>#######</C.YELLOW>{" - - - - - -\n"}
          {"       "}<C.YELLOW>######</C.YELLOW>{"\n"}
          {"         "}<C.YELLOW>###</C.YELLOW>{"\n"}
          {"        "}<C.YELLOW>##</C.YELLOW>
        </B>
      </T>
    </View>
  ),

  Snow: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[styles.text, { fontSize: size }]}>
        <B>
          <C.CYAN>
            {"      \\  /     \\  /\n"}
            {"    ___\\/ /   \\ \\/___\n"}
            {"     ___\\/     \\/___\n"}
            {"        _\\/   \\/_\n"}
            {"  \\ \\    _\\/ \\/_    / /\n"}
            {"___\\_\\_\\_\\_\\_/_/_/_/_/___\n"}
            {"   / / / /_/ \\_\\ \\ \\ \\\n"}
            {"  / /    _/\\ /\\_    \\ \\\n"}
            {"      ___/\\   /\\___\n"}
            {"     ___/\\     /\\___\n"}
            {"       /\\ \\   / /\\\n"}
            {"      /  \\     /  \\\n"}
          </C.CYAN>
        </B>
      </T>
    </View>
  ),

  Mist: ({size}:{size:number}) => (
    <View style={styles.icon}>
      <T style={[ styles.text, { fontSize: size } ]}>
        <B>
          <C.SECONDARY>
            {"    -__-¯-_-¯-    -_-¯-_-¯-    \n"}
            {"\n"}
            {"¯-_-¯-       -_-¯¯¯-_-¯---\n"}
            {"\n"}
            {"       -__-¯-_-¯-_-¯-     ¯¯¯-_-¯-\n"}
            {"\n"}
            {"      --¯-_-¯-_-¯-_-¯-_-¯-\n"}
            {"\n"}
            {" ¯¯¯-_-¯-    -___-¯-_-¯-__\n"}
            {"\n"}
            {"      ¯-_-¯-_-¯-_-¯--_-_-¯--_-\n"}
          </C.SECONDARY>
        </B>
      </T>
    </View>
  ),
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 200,
    marginVertical: 25,
  },

  text: {
    textAlignVertical: "center",
  },

  segText: {
    fontFamily: "Weather Segment",
    fontSize: 200
  },
});

export const artWeatherIcons:Record<WeatherIconID, ({ size }: { size: number }) => React.JSX.Element> = {
  "01d": ArtWeatherIcons.ClearD,
  "02d": ArtWeatherIcons.FewCloudsD,
  "03d": ArtWeatherIcons.ScatteredClouds,
  "04d": ArtWeatherIcons.BrokenClouds,
  "09d": ArtWeatherIcons.ShowerRain,
  "10d": ArtWeatherIcons.RainD,
  "11d": ArtWeatherIcons.Thunderstorm,
  "13d": ArtWeatherIcons.Snow,
  "50d": ArtWeatherIcons.Mist,

  "01n": ArtWeatherIcons.ClearN,
  "02n": ArtWeatherIcons.FewCloudsN,
  "03n": ArtWeatherIcons.ScatteredClouds,
  "04n": ArtWeatherIcons.BrokenClouds,
  "09n": ArtWeatherIcons.ShowerRain,
  "10n": ArtWeatherIcons.RainN,
  "11n": ArtWeatherIcons.Thunderstorm,
  "13n": ArtWeatherIcons.Snow,
  "50n": ArtWeatherIcons.Mist,

  "x": ArtWeatherIcons.None,
};
type WeatherLetters = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|" ";

export const segWeatherIcons:Record<WeatherIconID, WeatherLetters> = {
  "01d": "A",
  "02d": "J",
  "03d": "B",
  "04d": "B",
  "09d": "E",
  "10d": "C",
  "11d": "G",
  "13d": "F",
  "50d": "K",
  
  "01n": "a",
  "02n": "j",
  "03n": "b",
  "04n": "b",
  "09n": "e",
  "10n": "c",
  "11n": "g",
  "13n": "f",
  "50n": "k",

  "x": " "
};

export const WeatherIcon = ({id, size, theme}:{ id:WeatherIconID | undefined, size:number, theme:Themes }) => {
  if (theme === "e9999")
    return (
      <View style={{ marginVertical: 30 }}>
        <T style={styles.segText}>
          {segWeatherIcons[id ?? "x"]}
        </T>
        <T style={[styles.segText, { position: "absolute", top: 0, opacity: 0.1 }]}>
          {segWeatherIcons["x"]}
        </T>
      </View>
    );

  return artWeatherIcons[id ?? "x"]({ size });
}