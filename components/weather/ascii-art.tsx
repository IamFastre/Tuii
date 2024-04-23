import { WeatherIconPack } from "@/src/weather";
import { T, B, C } from "../basics";
import { useColors } from "@/constants/colors";

export const ASCIIWeatherIcons = {
  None: ({size}:{size:number}) => {
    const colors = useColors();
    return (
      <T style={{ textAlignVertical: "center", fontSize: size * 2.5 }}>
        <B>
          <C.RED>
            {colors.brackets.left.curly}
            <C.TERTIARY>
              ???
            </C.TERTIARY>
            {colors.brackets.right.curly}
          </C.RED>
        </B>
      </T>
    );
  },

  ClearD: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size*0.9 }}>
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
  ),

  ClearN: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size*0.9 }}>
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
  ),

  FewCloudsD: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  FewCloudsN: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  ScatteredClouds: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  BrokenClouds: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  ShowerRain: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  RainD: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  RainN: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  Thunderstorm: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  Snow: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size }}>
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
  ),

  Mist: ({size}:{size:number}) => (
    <T style={{ textAlignVertical: "center", fontSize: size } }>
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
  ),
};

export const asciiWeatherIcons:WeatherIconPack = {
  "01d": ASCIIWeatherIcons.ClearD,
  "02d": ASCIIWeatherIcons.FewCloudsD,
  "03d": ASCIIWeatherIcons.ScatteredClouds,
  "04d": ASCIIWeatherIcons.BrokenClouds,
  "09d": ASCIIWeatherIcons.ShowerRain,
  "10d": ASCIIWeatherIcons.RainD,
  "11d": ASCIIWeatherIcons.Thunderstorm,
  "13d": ASCIIWeatherIcons.Snow,
  "50d": ASCIIWeatherIcons.Mist,

  "01n": ASCIIWeatherIcons.ClearN,
  "02n": ASCIIWeatherIcons.FewCloudsN,
  "03n": ASCIIWeatherIcons.ScatteredClouds,
  "04n": ASCIIWeatherIcons.BrokenClouds,
  "09n": ASCIIWeatherIcons.ShowerRain,
  "10n": ASCIIWeatherIcons.RainN,
  "11n": ASCIIWeatherIcons.Thunderstorm,
  "13n": ASCIIWeatherIcons.Snow,
  "50n": ASCIIWeatherIcons.Mist,

  "x": ASCIIWeatherIcons.None,
};
