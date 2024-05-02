import defaults from "./defaults";
import { ITheme } from "./interfaces";

export default {
  ...defaults,
  primary: "#9caa55",
  secondary: "#333613",
  tertiary: "#152010",

  accent: "#333613",
  highlight: "#152010",

  red: "#B10000",
  green: "#056B2C",
  blue: "#1A4DBB",

  icon: "game-controller-sharp",
  statusbar: "dark",
  theme: "e9999",

  others: {
    weather_icon_pack: "segments",
    section_radius: 0,
    fonts: {
      L: 'Digital-7 Light',
      R: 'Digital-7',
      B: 'Digital-7 Bold',
      LI: 'Digital-7 LightItalic',
      I : 'Digital-7 Italic',
      BI: 'Digital-7 BoldItalic',

      S: 'Digital-7',
    },
    background: () => null,
  },

  brackets: {
    left: {
      curly: "{{ ",
      square: "[ ",
      angle: "•-< ",
    },

    right: {
      curly: " }}",
      square: " ]",
      angle: " >-•",
    }
  },
} as ITheme;
