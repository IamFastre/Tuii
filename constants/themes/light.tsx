import { ITheme } from "./interfaces";
import defaults from './defaults';

export default {
  ...defaults,
  primary: "#eeeeee",
  secondary: "#575757",
  tertiary: "#121212",

  accent: "#00c90f",
  highlight: "#4a00ff",

  opacity: {
    translucent: "10",
    faint: "20",
    mid: "45",
    most: "d0",
  },

  theme: "light",
  icon: "sunny-outline",
  statusbar: "dark",
} as ITheme;
