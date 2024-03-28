import { B, C, T } from "@/components/basics";
import { WeatherIconID } from "@/src/weather";
import { StyleSheet, View } from "react-native";

export const WeatherIcons = {
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
  }
});

export const weatherIcons:Record<WeatherIconID, ({ size }: { size: number }) => React.JSX.Element> = {
  "01d": WeatherIcons.ClearD,
  "02d": WeatherIcons.FewCloudsD,
  "03d": WeatherIcons.ScatteredClouds,
  "04d": WeatherIcons.BrokenClouds,
  "09d": WeatherIcons.ShowerRain,
  "10d": WeatherIcons.RainD,
  "11d": WeatherIcons.Thunderstorm,
  "13d": WeatherIcons.Snow,
  "50d": WeatherIcons.Mist,

  "01n": WeatherIcons.ClearN,
  "02n": WeatherIcons.FewCloudsN,
  "03n": WeatherIcons.ScatteredClouds,
  "04n": WeatherIcons.BrokenClouds,
  "09n": WeatherIcons.ShowerRain,
  "10n": WeatherIcons.RainN,
  "11n": WeatherIcons.Thunderstorm,
  "13n": WeatherIcons.Snow,
  "50n": WeatherIcons.Mist,
};

export const WeatherIcon = ({id, size}:{ id:WeatherIconID | undefined, size:number }) => {
  // return <WeatherIcons.None size={size}/>;
  var icon = <WeatherIcons.None size={size}/>;

  if (id !== undefined)
    icon = weatherIcons[id]({ size });

  return icon;
}