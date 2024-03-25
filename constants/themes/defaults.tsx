import { ITheme } from "./interfaces";

export default {
  main: "#121212",
  main_2: "#575757",
  main_3: "#dddddd",

  accent: "#1ed760",
  accent_2: "#5c14e3",

  other_hot: "#d71e1e",
  other_cold: "#4b7bff",

  red: "#d71e1e",
  green: "#00c43b",
  blue: "#4b7bff",

  cyan: "#27d4ff",
  yellow: "#ffea29",
  magenta: "#eb16c7",

  icon: "moon",
  statusbar: "light",
  mode: "dark",

  others: {
    section_radius: 0,
    fonts: {
      clock: "Seven Segment",
      L: 'Cascadia Code Light',
      R: 'Cascadia Code',
      B: 'Cascadia Code Bold',
      LI: 'Cascadia Code LightItalic',
      I : 'Cascadia Code Italic',
      BI: 'Cascadia Code BoldItalic',
    },
    background: () => null,
  }
} as ITheme;
