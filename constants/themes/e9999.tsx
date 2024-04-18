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
      clock: "Seven Segment",
      clock2: "Fourteen Segment",
      L: 'Fourteen Segment Light',
      R: 'Seven Segment',
      B: 'Fourteen Segment Bold',
      LI: 'Fourteen Segment LightItalic',
      I : 'Fourteen Segment Italic',
      BI: 'Fourteen Segment BoldItalic',
    },
    background: () => null,
  }
} as ITheme;
