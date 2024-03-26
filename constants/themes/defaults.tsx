import { ITheme } from "./interfaces";

export default {
  primary: "#121212",
  secondary: "#575757",
  tertiary: "#dddddd",

  accent: "#1ed760",
  highlight: "#5c14e3",

  hot: "#d71e1e",
  cold: "#2054ff",

  red: "#d71e1e",
  green: "#00c43b",
  blue: "#3a7aff",

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
