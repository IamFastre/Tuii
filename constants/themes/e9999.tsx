import defaults from "./defaults";
import { ITheme } from "./interfaces";

export default {
  ...defaults,
  primary: "#9caa55",
  secondary: "#333613",
  tertiary: "#152010",

  accent: "#333613",
  highlight: "#152010",

  hot: "#d71e1e",
  cold: "#2054ff",

  red: "#d71e1e",
  green: "#07882E",
  blue: "#3a7aff",

  cyan: "#27d4ff",
  yellow: "#ffea29",
  magenta: "#eb16c7",
  
  opacity: {
    faint: "45",
    mid: "65",
    most: "d0",
  },

  icon: "game-controller-sharp",
  statusbar: "dark",
  theme: "e9999",

  others: {
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
  }
} as ITheme;
